import { useState, useEffect } from "react";
import { BLOCKABLE_SITES } from "../SiteConfig";

type SiteConfig = {
  enabled: boolean;
  redirectUrl: string;
};

type Sites = Record<string, SiteConfig>;

export default function CommonBlockingSites() {
  const [sites, setSites] = useState<Sites>({});

  useEffect(() => {
    const loadSites = async () => {
      const result = await chrome.storage.local.get({ sites: {} });
      setSites(result.sites as Sites);
    };
    loadSites();
  }, []);

  async function toggleSite(key: string) {
    const updated: Sites = {
      ...sites,
      [key]: {
        ...sites[key],
        enabled: !sites[key]?.enabled,
        redirectUrl: sites[key]?.redirectUrl ?? "https://www.google.com/",
      },
    };
    setSites(updated);
    await chrome.storage.local.set({ sites: updated });
  }

  async function updateRedirectUrl(key: string, url: string) {
    const updated: Sites = {
      ...sites,
      [key]: {
        ...sites[key],
        enabled: !sites[key]?.enabled,
        redirectUrl: url,
      },
    };
    setSites(updated);
    await chrome.storage.local.set({ sites: updated });
  }

  return (
    <div>
      {Object.entries(BLOCKABLE_SITES).map(
        ([key, meta]) => (
          <div key={key}>
            <label>
              {sites[key]?.enabled ? "enabled" : "disabled"}
              <input
                type="checkbox"
                checked={sites[key]?.enabled || false}
                onChange={() => toggleSite(key)}
              />
              {meta.label}
            </label>
            <input
              type="text"
              placeholder="Redirect URL"
              value={sites[key]?.redirectUrl || ""}
              onChange={(e) => updateRedirectUrl(key, e.target.value)}
            />
          </div>
        ),
      )}
    </div>
  );
}
