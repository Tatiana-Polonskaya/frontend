import React from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import Speaker from "./img/оратор.svg";
import Chrysostom from "./img/слиток.svg";
import Talker from "./img/говорун.svg";
import Thorough from "./img/облако.svg";
import Eloquent from "./img/облако (1).svg";
import Serial from "./img/следы.svg";

const CN = cn("blockGeneralAnalytics");

type Props = {
    N: number;
    rank: string;
    text: string;
};

function checkRank(rank: string) {
    if (
        rank == `Последовательный` ||
        rank == `Информативный` ||
        rank == `Закономерный`
    ) {
        return <ReactSVG src={Serial} />;
    } else if (
        rank == `оригинальный` ||
        rank == `обоснованный` ||
        rank == `логичный`
    ) {
        return <ReactSVG src={Thorough} />;
    } else if (
        rank == `доходчивый` ||
        rank == `продуманный` ||
        rank == `уверенный`
    ) {
        return <ReactSVG src={Eloquent} />;
    } else {
        return <div></div>;
    }
}

export default function BlockGeneralAnalytics(props: Props) {
    let degree: string = "";
    let image: string = "";
    if (props.N > 8) {
        degree = "Говорун";
        image = Talker;
        image = Talker;
    } else if (props.N > 6 || props.N <= 8) {
        degree = "Златоуст";
        image = Chrysostom;
        image = Chrysostom;
    } else if (props.N || props.N <= 6) {
        degree = "Оратор";
        image = Speaker;
    } else if (props.N > 2 || props.N <= 4) {
        degree = "Спикер";
    } else if (props.N >= 2) {
        degree = "Выступающий";
    } else if (props.N <= 1) {
        degree = "В режиме ожидания ";
    } else if (props.N > -1) {
        degree = "Неизвестный новичок";
    }

    return (
        <>
            <div className={CN()}>
                <div className={CN("text")}>
                    <div className={CN("rank")}>Текущее звание</div>
                    <div className={CN("degree")}>
                        {props.rank} {degree}
                    </div>
                    <div className={CN("previous")}>
                        Предыдущее: последовательный {degree}
                    </div>
                    <div className={"tagline"}>{props.text}</div>
                </div>
                <div className={CN("img")}>
                    {checkRank(props.rank)}
                    <ReactSVG src={image} />
                </div>
            </div>
        </>
    );
}
