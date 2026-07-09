import "./styles/style.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState("light");

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
      <Header mode={mode} setMode={setMode} />
      <Body mode={mode} />
      <Footer />
    </div>
  );
}

export default App;
