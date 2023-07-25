/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { VideoTimeContext } from "../Report";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { useGetTranscriptionByIdQuery } from "../../store/api/report";
import { TranscriptionValue } from "../../models/report/transcription";
import { useGetTranscriptionByIdTestQuery } from "../../store/api/reportTest";

type Props = {
    idVideo: string;
};

export function getPrettyTimeBySeconds(seconds: number) {
    if (seconds < 60) {
        return `00:${seconds < 10 ? "0" + seconds : seconds.toFixed(0)}`;
    } else {
        const minutes = ~~(seconds / 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds % 60 < 10
                ? "0" + (seconds % 60).toFixed(0)
                : (seconds % 60).toFixed(0)
        }`;
    }
}

// TO DO: CHANGE ACCODING VIDEO PLAYING CURRENT TIME AND ACTIVE CLASS ----------------------------

export default function SpeechTranscription(props: Props) {
    const { currentTime } = useContext(VideoTimeContext);

    const [transcriptionData, setTranscriptionData] =
        useState<TranscriptionValue[]>();

    // all queries
    const TranscriptionDataFromBack = useGetTranscriptionByIdTestQuery(
        props.idVideo
    );

    useEffect(() => {
        if (TranscriptionDataFromBack && TranscriptionDataFromBack.data) {
            console.log(
                "TranscriptionDataFromBack",
                TranscriptionDataFromBack.data.data!.values
            );
            setTranscriptionData(TranscriptionDataFromBack.data.data!.values);
        }
    }, [TranscriptionDataFromBack]);

    const cnTranscription = cn("SpeechTranscription");
    return (
        <div className={cnTranscription()}>
            {transcriptionData &&
                transcriptionData.map((el, idx) => (
                    <div className={cnTranscription("row")} key={idx}>
                        <div
                            className={cnTranscription("time", {
                                active:
                                    currentTime >= el.time_start &&
                                    ((idx < transcriptionData.length-1 &&
                                        transcriptionData[idx + 1].time_start >
                                            currentTime) ||
                                        idx === transcriptionData.length-1),
                            })}
                        >
                            {getPrettyTimeBySeconds(el.time_start)}
                        </div>
                        <div className={cnTranscription("buble")}>
                            <div
                                className={cnTranscription("buble-text", {
                                    active:
                                    currentTime >= el.time_start &&
                                    ((idx < transcriptionData.length-1 &&
                                        transcriptionData[idx + 1].time_start >
                                            currentTime) ||
                                        idx === transcriptionData.length-1),
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
