import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../Utils/contex";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const { charactersFound } = useContext(AppContext);
  useEffect(() => {
    if (
      charactersFound[0] === true &&
      charactersFound[1] === true &&
      charactersFound[2] == true
    ) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [charactersFound]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };
  return <div className="text-2xl "> Score: {formatTime(seconds)}</div>;
};

export default Timer;
