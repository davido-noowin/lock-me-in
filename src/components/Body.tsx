import { useEffect, useRef, useState } from "react";
import CommonBlockingSites from "./CommonBlockingSites";
import Timer from "./Timer";
import "../styles/components/Body.css";

type SiteConfig = {
  enabled: boolean;
  redirectUrl: string;
};

type TimerState = {
  startTime: number;
  duration: number;
  running: boolean;
};

type Sites = Record<string, SiteConfig>;

export default function Body(props: { mode: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [sites, setSites] = useState<Sites>({});
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const loadSites = async () => {
      const result = await chrome.storage.local.get({ sites: {} });
      setSites(result.sites as Sites);
    };
    loadSites();

    synchFromStorage();
    intervalRef.current = window.setInterval(synchFromStorage, 1000);

    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      area: string,
    ) => {
      if (area === "local" && changes.timer) {
        synchFromStorage();
      }
    };
    chrome.storage.onChanged.addListener(listener);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  function computeRemainingtime(state: TimerState): number {
    if (!state.running) {
      return 0;
    }
    const elapsed = Date.now() - state.startTime;
    console.log("TIME STATE:", time);
    console.log(
      "duration - elapsed:",
      Math.max(0, state.duration - elapsed) * 1000,
    );
    return Math.max(0, state.duration - elapsed); // time in ms
  }

  async function synchFromStorage() {
    const result = await chrome.storage.local.get({
      timer: { startTime: 0, duration: 0, running: false },
    });
    if (result) {
      const state = result.timer as TimerState;
      setIsRunning(state.running);
      setTime(computeRemainingtime(state));
    }
  }

  async function blockAllSites() {
    const updated = Object.fromEntries(
      Object.entries(sites).map(([key, site]) => [
        key,
        {
          ...site,
          enabled: true,
          redirectUrl: site.redirectUrl ?? "https://www.google.com/",
        },
      ]),
    ) as Sites;

    setSites(updated);
    await chrome.storage.local.set({ sites: updated });
  }

  return (
    <div className="body-container">
      <Timer
        mode={props.mode}
        time={time}
        isRunning={isRunning}
        onStartTimer={blockAllSites}
      />
      <CommonBlockingSites
        isRunning={isRunning}
        sites={sites}
        setSites={setSites}
      />
    </div>
  );
}
