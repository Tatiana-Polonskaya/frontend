import { useState, useRef } from "react";

const useStopwatch = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef<any>(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    return {
        timer,
        isActive,
        isPaused,
        handleStart,
        handlePause,
        handleResume,
        handleReset,
    };
};

export default useStopwatch;
