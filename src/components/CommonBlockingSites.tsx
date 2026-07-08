import { useState, useEffect } from "react";
import { BLOCKABLE_SITES } from "../SiteConfig";
import "../styles/components/CommonBlockingSites.css";

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
    <div className="common-blocking-sites-container">
      <span className="blocked-sites-label">Blocked Sites</span>
      {Object.entries(BLOCKABLE_SITES).map(
        ([key, meta]) => (
          <div key={key} className="site-config-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={sites[key]?.enabled || false}
                onChange={() => toggleSite(key)}
              />
              <span className="slider round"></span>
            </label>
            <span className="site-config-label">
              {meta.label}
            </span>
            <div className="redirect-url-container">
              <p className="redirect-url-label">Custom Redirect URL</p>
              <input
              id={key}
              className="redirect-url-input"
              type="text"
              placeholder="Default: google.com"
              value={sites[key]?.redirectUrl || ""}
              onChange={(e) => updateRedirectUrl(key, e.target.value)}
            />
            </div>
          </div>
        ),
      )}
    </div>
  );
}
