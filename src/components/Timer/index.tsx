import React, { useEffect, useState } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { TIMER_STATUS } from "../../pages/RecodingPage";

type Props = {
    minutes: number;
    seconds: number;
    isStart: boolean;
    setIsStart:Function;
    timerOver:Function;
};

export default function Timer(props: Props) {
    const cnTimer = cn("Timer");
    

    const [minutes, setMinutes] = useState(props.minutes);
    const [seconds, setSeconds] = useState(props.seconds);


    const updateStatus = (value: boolean) => {
        props.setIsStart(value)
    }

    useEffect(() => {
        if(props.isStart){
            let myInterval = setInterval(
                () => {
                    if (seconds > 0) {
                        setSeconds(seconds - 1);
                    }
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(myInterval);
                            props.timerOver();
                        } else {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                        }
                    }
                },
                1000
            );
            return () => {
                clearInterval(myInterval);
            };
        }else{
            setMinutes(props.minutes);
            setSeconds(props.seconds);
        }
    });

    return (
        <div className={cnTimer()} onDoubleClick={()=>updateStatus(TIMER_STATUS.START)}>
            <h1 className={cnTimer("text")}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
        </div>
    );
}
