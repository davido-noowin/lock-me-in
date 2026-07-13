import { type Dispatch, type SetStateAction } from "react";
import { BLOCKABLE_SITES } from "../SiteConfig";
import "../styles/components/CommonBlockingSites.css";

type SiteConfig = {
  enabled: boolean;
  redirectUrl: string;
};

type Sites = Record<string, SiteConfig>;

type CommonBlockingSitesProps = {
  isRunning: boolean;
  sites: Sites;
  setSites: Dispatch<SetStateAction<Sites>>;
};

export default function CommonBlockingSites(props: CommonBlockingSitesProps) {
  async function toggleSite(key: string) {
    const updated: Sites = {
      ...props.sites,
      [key]: {
        ...props.sites[key],
        enabled: !props.sites[key]?.enabled,
        redirectUrl: props.sites[key]?.redirectUrl ?? "https://www.google.com/",
      },
    };
    props.setSites(updated);
    await chrome.storage.local.set({ sites: updated });
  }

  async function updateRedirectUrl(key: string, url: string) {
    const updated: Sites = {
      ...props.sites,
      [key]: {
        ...props.sites[key],
        enabled: !props.sites[key]?.enabled,
        redirectUrl: url,
      },
    };
    props.setSites(updated);
    await chrome.storage.local.set({ sites: updated });
  }

  return (
    <div className="common-blocking-sites-container">
      <span className="blocked-sites-label">Blocked Sites</span>
      {Object.entries(BLOCKABLE_SITES).map(([key, meta]) => (
        <div key={key} className="site-config-container">
          <label className="switch">
            <input
              disabled={props.isRunning}
              type="checkbox"
              checked={props.sites[key]?.enabled || false}
              onChange={() => toggleSite(key)}
            />
            <span className="slider round"></span>
          </label>
          <span className="site-config-label">{meta.label}</span>
          <div className="redirect-url-container">
            <p className="redirect-url-label">Custom Redirect URL</p>
            <select
              id={key}
              value={props.sites[key]?.redirectUrl ?? "https://www.google.com/"}
              className="redirect-url-select"
              disabled={props.isRunning}
              onChange={(e) => updateRedirectUrl(key, e.target.value)}
            >
              <option className="redirect-url-input" value={"https://www.google.com"}>Google</option>
              <option className="redirect-url-input" value={"https://www.leetcode.com/"}>LeetCode</option>
              <option className="redirect-url-input" value={"https://www.indeed.com/"}>Indeed</option>
              <option className="redirect-url-input" value={"https://www.ziprecruiter.com/"}>
                ZipRecruiter
              </option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
