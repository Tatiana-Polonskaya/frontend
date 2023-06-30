import React, { useContext, useEffect, useState } from "react";
import { VideoTimeContext } from "../Report";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { useGetTranscriptionByIdQuery } from "../../store/api/report";
import { TranscriptionValue } from "../../models/report/transcription";

type Props = {
    idVideo: string;
};

export function getPrettyTimeBySeconds(seconds:number){
    if (seconds< 60){
        return `00:${seconds<10? "0"+seconds: seconds}`
    }else{
        const minutes = ~~(seconds/60);
        return `${minutes<10? "0"+minutes: minutes}:${seconds%60===0? "00": seconds%60}`
    }
}

// TO DO: CHANGE ACCODING VIDEO PLAYING CURRENT TIME AND ACTIVE CLASS ----------------------------

export default function SpeechTranscription(props: Props) {
    const { currentTime } = useContext(VideoTimeContext);

    const [transcriptionData, setTranscriptionData] = useState<TranscriptionValue[]>();

    // all queries
    const TranscriptionDataFromBack = useGetTranscriptionByIdQuery(props.idVideo);

    useEffect(() => {
        if (TranscriptionDataFromBack && TranscriptionDataFromBack.data)
            setTranscriptionData(TranscriptionDataFromBack.data.data!.values);
    }, [TranscriptionDataFromBack]);

    const cnTranscription = cn("SpeechTranscription");
    return (
        <div className={cnTranscription()}>
            {transcriptionData && transcriptionData.map((el, idx) => (
                <div className={cnTranscription("row")} key={idx}>
                    <div
                        className={cnTranscription("time", {
                            active: currentTime === ""+el.time_start,
                        })}
                    >
                        {getPrettyTimeBySeconds(el.time_start)}
                    </div>
                    <div className={cnTranscription("buble")}>
                        <div
                            className={cnTranscription("buble-text", {
                                active: currentTime === ""+el.time_start,
                            })}
                        >
                            {el.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
