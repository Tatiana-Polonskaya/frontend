import React from "react";
import { ISimel } from "../../../models/graph/inteface/ISimel";
import angryImg from "./img/angry.svg";
import cognitiveDistortionsImg from "./img/CognitiveDistortions.svg";
import parasiteWordsImg from "./img/ParasiteWords.svg";
import Smiley from "../SmileBlock";
import "./style.scss";

type Props = {
    filler_words: number;
    cognitive_distortion: number;
    aggression: number;
};

function CommunicativeNorm(props: Props) {
    let inf: ISimel = {
        items: [
            {
                id: 1,
                title: "Слова-паразиты",
                procent: props.filler_words,
                colorProcent: "#2477F4",
                icon: parasiteWordsImg,
            },
            {
                id: 2,
                title: "Когнитивныe искажения",
                procent: props.cognitive_distortion,
                colorProcent: "#FFB800",
                icon: cognitiveDistortionsImg,
            },
            {
                id: 3,
                title: "Агрессивность",
                procent: props.aggression,
                colorProcent: "#E23339",
                icon: angryImg,
            },
        ],
    };
    return (
        <>
            <div className="CommunicativeNormBloc">
                <Smiley component={inf} />
            </div>
        </>
    );
}
export default CommunicativeNorm;
