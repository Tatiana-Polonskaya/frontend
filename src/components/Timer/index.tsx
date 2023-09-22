import { useEffect } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../Stopwatch";

type Props = {
    seconds: number;
    isStart: boolean;
    setResultSeconds: Function;
    timerOver: Function;
};

export default function Timer(props: Props) {
    const cnTimer = cn("Timer");

    const { timer, isPaused, handleStart, handlePause, handleReset } = useTimer(
        props.seconds
    );

    useEffect(() => {
        if (timer === 0) {
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
        if (isPaused && timer !== props.seconds)
            props.setResultSeconds(props.seconds - timer);
    }, [isPaused]);

    return (
        <div className={cnTimer()}>
            <h1 className={cnTimer("text")}>{formatTime(timer)}</h1>
        </div>
    );
}
