import { useState, useEffect } from "react";

type BlockedSite = {
    id: number;
    name: string;
    link: string;
    image?: string;
}

const blockedSites: BlockedSite[] = [
        {id: 1, name: 'TikTok', link: 'https://www.tiktok.com/'},
        {id: 2, name: 'Instagram', link: 'https://www.instagram.com/'},
        {id: 3, name: 'YouTube Shorts', link: 'https://www.youtube.com/shorts/'},
    ]

export default function CommonBlockingSites() {
    const [currentURL, setCurrentURL] = useState<string>("");

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url) {
                setCurrentURL(tabs[0].url);
                console.log(blockedSites);

                // more code here
            }
        })
    }, [currentURL])

    return (
        <div>
            Suggested Sites to Block
            {currentURL}

        </div>
    )
}