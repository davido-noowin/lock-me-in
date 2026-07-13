import "../styles/components/Timer.css";
import playLightMode from "../assets/images/playLightMode.png";
import playDarkMode from "../assets/images/playDarkMode.png";
import { useState } from "react";
import AlertModal from "./AlertModal";

type TimerProps = {
  mode: string;
  isRunning: boolean;
  time: number;
  onStartTimer: () => void | Promise<void>;
};

export default function Timer(props: TimerProps) {
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function handlePlayButtonClick() {
    console.log("Play button clicked");
    if (duration <= 0) {
      return;
    }
    setIsOpen(true);
  }

  function formatTime(miliseconds: number): string {
    const seconds = Math.floor(miliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  async function changeTime(amount: number) {
    setDuration((prevTime) => Math.max(prevTime + amount, 0));
  }

  return (
    <div className="timer-container">
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onStartTimer={props.onStartTimer}
          mode={props.mode}
          duration={duration}
        />
      )}
      <div className="timer-display">
        <span className="timer-value">
          {props.isRunning ? formatTime(props.time) : formatTime(duration)}
        </span>
      </div>
      <div className="timer-controls">
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-5 * 60 * 1000)}
        >
          - 5 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-1 * 60 * 1000)}
        >
          - 1 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(1 * 60 * 1000)}
        >
          + 1 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(5 * 60 * 1000)}
        >
          + 5 min
        </button>
      </div>
      <button
        disabled={props.isRunning}
        className="timer-play-button"
        onClick={handlePlayButtonClick}
      >
        <img
          src={props.mode === "light" ? playLightMode : playDarkMode}
          alt="Play Button"
        />
      </button>
    </div>
  );
}
