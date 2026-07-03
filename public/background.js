const RULE_ID = 1;

const redirectRule = {
    id: RULE_ID,
    priority: 1,
    action: {
        type: "redirect",
        redirect: { url: "https://www.google.com/"}
    },
    condition: {
        urlFilter: "||youtube.com/shorts",
        resourceTypes: ["main_frame"],
    }
};

function enableRule() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [redirectRule],
    removeRuleIds: [RULE_ID]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("DeclarativeNetRequest failed:", chrome.runtime.lastError);
    }
  });
}

function disableRule() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [],
    removeRuleIds: [RULE_ID]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to disable rule:", chrome.runtime.lastError);
    }
  });
}

function applyRule(enabled) {
  if (enabled) {
    enableRule();
  } else {
    disableRule();
  }
}

// function init() {
//     chrome.storage.local.get({ redirectEnabled: false}, ({ redirectEnabled }) => {
//         applyRule(Boolean(redirectEnabled));
//         console.log("redirect enabled:", redirectEnabled);
//         console.log("applying rule");
//     });
// }

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ redirectEnabled: true }), () => {
    applyRule(true);
    console.log("fresh install - redirect enabled");
  };
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.redirectEnabled) {
        applyRule(Boolean(changes.redirectEnabled.newValue));
        console.log("redirect enabled:", changes.redirectEnabled.newValue);
    }
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get({ redirectEnabled: false }, ({ redirectEnabled }) => {
        applyRule(Boolean(redirectEnabled));
        console.log("redirect enabled:", redirectEnabled);
    });
});
