import { useState, useEffect } from "react";

export default function CommonBlockingSites() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        chrome.storage.local.get({ redirectEnabled: false }, (result) => {
            setEnabled(Boolean(result.redirectEnabled));
        });

        const handleStorageChange = ( 
            changes: { [key: string]: chrome.storage.StorageChange },
            area: string
        ) => {
            if (area === "local" && changes.redirectEnabled) {
                setEnabled(Boolean(changes.redirectEnabled.newValue));
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    function toggleRedirect() {
        chrome.storage.local.set({ redirectEnabled: !enabled });
    }

    return (
        <div>
            Suggested Sites to Block
            <button onClick={toggleRedirect}>
                {enabled ? "Enable YouTube Shorts" : "Disable YouTube Shorts" }
            </button>

        </div>
    )
}