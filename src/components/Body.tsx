import { useEffect, useState } from "react";
import CommonBlockingSites from "./CommonBlockingSites";
import Timer from "./Timer";
import '../styles/components/Body.css'

type SiteConfig = {
  enabled: boolean;
  redirectUrl: string;
};

type Sites = Record<string, SiteConfig>;

export default function Body(props: { mode: string }) {
    const [isRunning, setIsRunning] = useState(false);
    const [sites, setSites] = useState<Sites>({});
    
      useEffect(() => {
        const loadSites = async () => {
          const result = await chrome.storage.local.get({ sites: {} });
          setSites(result.sites as Sites);
        };
        loadSites();
      }, []);
    
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
        await chrome.storage.local.set({ sites: updated })
      }
      
    return (
        <div className="body-container">
            <Timer 
                mode={props.mode} 
                isRunning={isRunning} 
                setIsRunning={setIsRunning}
                onStartTimer={blockAllSites}
                />
            <CommonBlockingSites 
                isRunning={isRunning} 
                sites={sites}
                setSites={setSites}
                />
        </div>
    )
}