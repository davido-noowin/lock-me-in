import "../styles/components/Timer.css";
import playLightMode from "../assets/images/playLightMode.png";
import playDarkMode from "../assets/images/playDarkMode.png";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import AlertModal from "./AlertModal";

type TimerProps = {
  mode: string;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  onStartTimer: () => void | Promise<void>;
};

export default function Timer(props: TimerProps) {
  const [time, setTime] = useState(0); // Time in seconds
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      handleTimerCompletion();
    }
  }, [props.isRunning, time]);

  function handleTimerCompletion() {
    props.setIsRunning(false);
    setTime(0);
  }

  function handlePlayButtonClick() {
    console.log("Play button clicked");
    if (time <= 0 ) {
      return;
    }
    setIsOpen(true);
  }

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function changeTime(amount: number) {
    setTime((prevTime) => Math.max(prevTime + amount, 0));
  }

  return (
    <div className="timer-container">
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsRunning={(props.setIsRunning)}
          onStartTimer={props.onStartTimer}
          mode={props.mode}
        />
      )}
      <div className="timer-display">
        <span className="timer-value">{formatTime(time)}</span>
      </div>
      <div className="timer-controls">
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-5 * 60)}
        >
          - 5 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-1 * 60)}
        >
          - 1 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(1 * 60)}
        >
          + 1 min
        </button>
        <button
          disabled={props.isRunning}
          className="timer-control-button"
          onClick={() => changeTime(5 * 60)}
        >
          + 5 min
        </button>
      </div>
      <button disabled={props.isRunning} className="timer-play-button" onClick={handlePlayButtonClick}>
        <img
          src={props.mode === "light" ? playLightMode : playDarkMode}
          alt="Play Button"
        />
      </button>
    </div>
  );
}
