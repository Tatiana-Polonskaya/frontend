import React from "react";
import "./style.css";
import { ISimel } from "../../../models/graph/inteface/ISimel";
import Smiley from "../SmileBlock/index";
import okImg from "./img/ok.svg";
import happyImg from "./img/happy.svg";
import angryImg from "./img/angry.svg";

type Props = {
    total: {
        neutral: number;
        happiness: number;
        anger: number;
    };
};

function Emotionality(props: Props) {
    let inf: ISimel = {
        items: [
            {
                id: 1,
                title: "Злость",
                procent: props.total.anger,
                colorProcent: "#FF4E78",
                icon: angryImg,
            },
            {
                id: 2,
                title: "Без эмоций",
                procent: props.total.neutral,
                colorProcent: "#7C8EB5",
                icon: okImg,
            },
            {
                id: 3,
                title: "Радость",
                procent: props.total.happiness,
                colorProcent: "#10CE7E",
                icon: happyImg,
            },
        ],
    };

    return (
        <>
            <div className="allEmotionality">
                <div className="imgAllEmotionality">
                    <Smiley component={inf} />
                </div>
            </div>
        </>
    );
}

export default Emotionality;
