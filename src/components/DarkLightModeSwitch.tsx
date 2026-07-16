import moon from "../assets/images/moon.png";
import sun from "../assets/images/sun.png";
import "../styles/components/DarkLightModeSwitch.css";

type ThemeMode = "light" | "dark";

interface HeaderProps {
  mode: ThemeMode;
  setMode: (value: ThemeMode) => void;
}

export default function DarkLightModeSwitch(props: HeaderProps) {
  return (
    <button
      className="mode-switch"
      onClick={() =>
        props.setMode(props.mode === "light" ? "dark" : "light")
      }
    >
      <img
        className="mode-switch-icon"
        src={props.mode === "light" ? moon : sun}
        alt="Toggle Dark/Light Mode"
      />
    </button>
  );
}