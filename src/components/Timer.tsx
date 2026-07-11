import "../styles/components/Timer.css";
import playLightMode from "../assets/images/playLightMode.png";
import playDarkMode from "../assets/images/playDarkMode.png";
import { useState, useEffect } from "react";
import AlertModal from "./AlertModal";

export default function Timer(props: { mode: string }) {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      handleTimerCompletion();
    }
  }, [isRunning, time]);

  function handleTimerCompletion() {
    setIsRunning(false);
    setTime(0);
    // enable the switches again
    // enable the play button
  }

  function handlePlayButtonClick() {
    console.log("Play button clicked");
    if (time <= 0 ) {
      return;
    }
    // create a modal that warns the user they cant cancel the timer + it disables the switches
    // disable the play button
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
          setIsRunning={setIsRunning}
          mode={props.mode}
        />
      )}
      <div className="timer-display">
        <span className="timer-value">{formatTime(time)}</span>
      </div>
      <div className="timer-controls">
        <button
          disabled={isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-5 * 60)}
        >
          - 5 min
        </button>
        <button
          disabled={isRunning}
          className="timer-control-button"
          onClick={() => changeTime(-1 * 60)}
        >
          - 1 min
        </button>
        <button
          disabled={isRunning}
          className="timer-control-button"
          onClick={() => changeTime(1 * 60)}
        >
          + 1 min
        </button>
        <button
          disabled={isRunning}
          className="timer-control-button"
          onClick={() => changeTime(5 * 60)}
        >
          + 5 min
        </button>
      </div>
      <button disabled={isRunning} className="timer-play-button" onClick={handlePlayButtonClick}>
        <img
          src={props.mode === "light" ? playLightMode : playDarkMode}
          alt="Play Button"
        />
      </button>
    </div>
  );
}
