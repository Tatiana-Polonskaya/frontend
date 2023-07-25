import { cn } from "@bem-react/classname";

import { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";

import "./style.scss";
import { BaseReactPlayerProps, OnProgressProps } from "react-player/base";
import { VideoTimeContext } from "../Report";

interface VideoPlayerProps extends BaseReactPlayerProps {
    title?: string;
}

type Props = {
    url: string;
    controls?: boolean;
};

/**
 * Function returns pretty data time accoding to rules projects(N hours ago or 30.05.2023)
 * @param {timestring} props Datatime from server lise 2023-05-20 18:08:40:372738273
 */
export function getPrettyDataTime(timestring: string) {
    // TO DO: create dict with options for hour, days (1 час назад, 3 часА назад)
    const current = new Date(timestring);
    const now = new Date();

    // Calculating the time difference between two dates
    const diffInTime = now.getTime() - current.getTime();

    // One minute, hour, day in milliseconds
    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    if (diffInDays > 0 && diffInDays < 7) {
        return `${diffInDays} дней назад`;
    } else if (diffInDays === 0) {
        const diffInHours = Math.round(diffInTime / oneHour);
        return diffInHours > 0
            ? `${diffInHours} часов назад`
            : `${Math.round(diffInTime / oneMinute)} минут назад`;
    }
    const month = current.getMonth();
    return `${current.getDate()}.${
        month < 10 ? "0" + month : month
    }.${current.getFullYear()}`;
}

// TO DO: ADD STYLES AND SOME CONTROLS COMPONENT

export default function VideoPlayer({
    title = "",
    ...props
}: VideoPlayerProps) {
    const cnVideoPlayer = cn("VideoPlayer");
    const videoRef = useRef<HTMLVideoElement | any>();

    const [onReady, setOnReady] = useState(false);

    // state for video playing
    const {setCurrentTime}= useContext(VideoTimeContext);

    const changeCurrentTime = (e: OnProgressProps) => {
        setCurrentTime(Math.floor(e.playedSeconds));
    };

    return (
        <div className={cnVideoPlayer()}>
            <ReactPlayer
                {...(props as VideoPlayerProps)}
                width="720"
                height="480"
                ref={videoRef}
                muted={true}
                onStart={() => {
                    console.log("onStart");
                }}
                onReady={() => setOnReady(true)}
                onProgress={changeCurrentTime}
            />
        </div>
    );
}
