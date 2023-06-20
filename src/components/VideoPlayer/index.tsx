import { cn } from "@bem-react/classname";
import "./style.scss";

import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";
import ReactPlayer from "react-player";

type Props = {
    videoFile: File
}

export default function VideoPlayer(props: Props) {
    const cnVideoPlayer = cn("VideoPlayer");

    const videoRef = useRef<HTMLVideoElement | any>();

    // const videoData  = useGetVideoQuery("feb81d20-2bb0-4622-b41a-3c6d50c6b3f8");

    return (
        <div className={cnVideoPlayer()}>
            <div className={cnVideoPlayer("video-block")}>
                <ReactPlayer
                    width={"100%"}
                    height="100%"
                    ref={videoRef}
                    url={URL.createObjectURL(props.videoFile)}
                    muted={true}
                    controls={true}
                />
                {/* <video id="myVideo" 
                            controls
                        />
                        <video src={URL.createObjectURL(currentFile)} /> */}
            </div>
        </div>
    );
}
