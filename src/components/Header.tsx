import DarkLightModeSwitch from "./DarkLightModeSwitch";
import type { Dispatch, SetStateAction } from "react";
import lightModeLogo from "../assets/images/man-studying-with-a-laptop.svg";
import darkModeLogo from "../assets/images/man-studying-with-a-laptop-white.svg";
import "../styles/components/Header.css";

interface HeaderProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
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
