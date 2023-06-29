import React, { useContext } from "react";
import { VideoTimeContext } from "../Report";
import { cn } from "@bem-react/classname";
import "./style.scss";

type Props = {
    items?: TexttoTime[];
};

type TexttoTime = {
    time: "";
    text: string;
};

export default function SpeechTranscription(props: Props) {
    const { currentTime } = useContext(VideoTimeContext);

    const texts = [
        {
            time: "00:00",
            text: "Причины возникновения конфликтов могут быть самыми разными.",
        },
        {
            time: "00:10",
            text: "Иногда родительские требования слишком далеки от представлений ребенка о том, что ему “положено” по возрасту.",
        },
        {
            time: "00:30",
            text: "Например, во сколько возвращаться домой, на что тратить карманные деньги.",
        },
        {
            time: "00:50",
            text: "texИногда родителям просто не удается донести свои взгляды до ребенка в той форме, которая не заденет его чувства.t4",
        },
        {
            time: "01:00",
            text: "texИногда родителям просто не удается донести свои взгляды до ребенка в той форме, которая не заденет его чувства.t4",
        },
        {
            time: "01:10",
            text: "texИногда родителям просто не удается донести свои взгляды до ребенка в той форме, которая не заденет его чувства.t4",
        },
        {
            time: "01:20",
            text: "texИногда родителям просто не удается донести свои взгляды до ребенка в той форме, которая не заденет его чувства.t4",
        },
        {
            time: "01:30",
            text: "texИногда родителям просто не удается донести свои взгляды до ребенка в той форме, которая не заденет его чувства.t4",
        },
    ];

    const cnTranscription = cn("SpeechTranscription");
    return (
        <div className={cnTranscription()}>
            {texts.map((el, idx) => (
                <div className={cnTranscription("row")} key={idx}>
                    <div
                        className={cnTranscription("time", {
                            active: currentTime == el.time,
                        })}
                    >
                        {el.time}
                    </div>
                    <div className={cnTranscription("buble")}>
                        <div
                            className={cnTranscription("buble-text", {
                                active: currentTime === el.time,
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
