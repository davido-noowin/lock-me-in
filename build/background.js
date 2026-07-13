import { BLOCKABLE_SITES } from "./siteConfig.js";

function startTimer(durationInMS) {
  const timerState = {
    startTime: Date.now(),
    duration: durationInMS,
    running: true
  };

  chrome.storage.local.set({timer: timerState});

  chrome.alarms.create("timerComplete", { when: Date.now() + durationInMS });
}

function stopTimer() {
  chrome.storage.local.set({
    timer: { startTime: 0, duration: 0, running: false }
  });
  chrome.alarms.clear("timerComplete");
}

function buildRules(sitesConfig) {
  const rules = [];
  for (const key in sitesConfig) {
    const site = sitesConfig[key];
    const meta = BLOCKABLE_SITES[key];
    if (!meta || !site.enabled) continue;

    rules.push({
      id: meta.ruleId,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: site.redirectUrl || "https://www.google.com/" }
      },
      condition: {
        urlFilter: meta.urlFilter,
        resourceTypes: ["main_frame"]
      }
    });
  }
  return rules;
}

async function applyAllRules(sitesConfig) {
  const allRuleIds = Object.values(BLOCKABLE_SITES).map(s => s.ruleId);
  const newRules = buildRules(sitesConfig);

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: allRuleIds, // clear everything first
    addRules: newRules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to update rules:", chrome.runtime.lastError);
    }
  });
}

function getEnabledSiteMeta(sitesConfig) {
  return Object.keys(sitesConfig)
    .filter(key => sitesConfig[key].enabled)
    .map(key => ({ ...BLOCKABLE_SITES[key], redirectUrl: sitesConfig[key].redirectUrl }))
    .filter(Boolean);
}

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.storage.local.get({ sites: {} }, ({ sites }) => {
    const enabledSites = getEnabledSiteMeta(sites);
    const match = enabledSites.find(site => site.historyMatch(details.url));
    if (match) {
      chrome.tabs.update(details.tabId, { url: match.redirectUrl || "https://www.google.com/" });
    }
  });
}, {
  url: Object.values(BLOCKABLE_SITES).map(site => ({ hostContains: site.hostContains }))
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ sites: null }, ({ sites }) => {
    if (!sites) {
      const defaultSites = {};
      for (const key in BLOCKABLE_SITES) {
        defaultSites[key] = { enabled: false, redirectUrl: "https://www.google.com/" };
      }
      chrome.storage.local.set({ sites: defaultSites }, () => applyAllRules(defaultSites));
    } else {
      applyAllRules(sites);
    }
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({ sites: {} }, ({ sites }) => applyAllRules(sites));
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.sites) {
    applyAllRules(changes.sites.newValue);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timerComplete") {
    chrome.storage.local.set({
      timer: { startTime: 0, duration: 0, running: false }
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_TIMER") {
    startTimer(message.durationMs);
    sendResponse({ ok: true})
  }
  else if (message.type === "STOP_TIMER") {
    stopTimer();
    sendResponse({ ok: true });
  }
  return true;
});
