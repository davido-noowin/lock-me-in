import DarkLightModeSwitch from "./DarkLightModeSwitch";
import lightModeLogo from "../assets/images/man-studying-with-a-laptop.svg";
import darkModeLogo from "../assets/images/man-studying-with-a-laptop-white.svg";
import "../styles/components/Header.css";

type ThemeMode = "light" | "dark";

interface HeaderProps {
  mode: ThemeMode;
  setMode: (value: ThemeMode) => void;
}

export default function Header(props: HeaderProps) {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img
            src={props.mode === "light" ? lightModeLogo : darkModeLogo}
            alt="Lock Me In Logo"
            className="logo"
          />
          <div className="title-container">
            <h1 className="title">Lock Me In</h1>
            <p className="description">Lock in. Stop scrolling. Seriously.</p>
          </div>
        </div>

        <DarkLightModeSwitch mode={props.mode} setMode={props.setMode} />
      </div>
    </>
  );
}
