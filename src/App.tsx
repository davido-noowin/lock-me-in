import "./styles/style.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function App() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const persistMode = async (nextMode: ThemeMode) => {
    setMode(nextMode);

    if (
      typeof chrome === "undefined" ||
      typeof chrome.storage?.local?.set !== "function"
    ) {
      return;
    }

    await chrome.storage.local.set({ themeMode: nextMode });
  };

  useEffect(() => {
    const loadSavedMode = async () => {
      if (
        typeof chrome === "undefined" ||
        typeof chrome.storage?.local?.get !== "function"
      ) {
        return;
      }

      const result = await chrome.storage.local.get(["themeMode"]);
      const savedMode = result.themeMode;

      if (savedMode === "light" || savedMode === "dark") {
        setMode(savedMode);
      }
    };

    loadSavedMode();

    if (
      typeof chrome === "undefined" ||
      typeof chrome.storage?.onChanged?.addListener !== "function"
    ) {
      return;
    }

    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      area: string,
    ) => {
      if (area === "local" && changes.themeMode?.newValue) {
        const nextMode = changes.themeMode.newValue;

        if (nextMode === "light" || nextMode === "dark") {
          setMode(nextMode);
        }
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  // manual font injection for Chrome extension: if we are in
  // dev mode or if the chrome.runtime API is not available, we skip this step
  useEffect(() => {
    const hasChromeRuntime =
      typeof chrome !== "undefined" &&
      typeof chrome.runtime?.getURL === "function";

    if (import.meta.env.DEV || !hasChromeRuntime) return;

    const fontUrl = chrome.runtime.getURL(
      "fonts/EncodeSansExpanded-Regular.ttf",
    );
    const fontStyle = document.createElement("style");
    fontStyle.textContent = `
      @font-face {
        font-family: 'Encode Sans Expanded';
        src: url('${fontUrl}') format('truetype');
      }
    `;
    document.head.appendChild(fontStyle);
  }, []);

  return (
    <div
      style={{ fontFamily: "Encode Sans Expanded" }}
      className={"app" + (mode === "dark" ? " darkmode" : "")}
    >
      <Header mode={mode} setMode={persistMode} />
      <Body mode={mode} />
      <Footer />
    </div>
  );
}

export default App;
