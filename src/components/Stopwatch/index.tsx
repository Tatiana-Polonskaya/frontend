import { cn } from "@bem-react/classname";

import "./style.scss";

import useStopwatch from "../../hooks/useStopwatch";
import { useEffect } from "react";

const CN = cn("Stopwatch");

export const formatTime = (timer: number) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    //${getHours} :
    return `${getMinutes} : ${getSeconds}`;
};

type Props = {
    seconds: number;
    isStart: boolean;
    setResultSeconds: Function;
    timerOver: Function;
};

export default function Stopwatch(props: Props) {
    const { timer, isActive, isPaused, handleStart, handlePause, handleReset } =
        useStopwatch(0);

    useEffect(() => {
        if (timer === props.seconds) {
            handlePause();
            props.timerOver();
        }
    }, [timer]);

    useEffect(() => {
        if (props.isStart) {
            handleReset();
            handleStart();
        } else {
            handlePause();
        }
    }, [props.isStart]);

    useEffect(() => {
        if (isPaused && timer > 0) props.setResultSeconds(timer);
    }, [isPaused]);

    return (
        <div className={CN()}>
            <h1 className={CN("text")}>{formatTime(timer)}</h1>
        </div>
    );
}
