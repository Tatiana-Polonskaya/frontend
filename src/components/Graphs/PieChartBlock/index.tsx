import React from "react";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { IPieChart } from "../../../models/graph/inteface/IPieChart";
import art from "./img/artColor.svg";
import scientific from "./img/scientificColor.svg";
import officialBusiness from "./img/officialBusinessInColor.svg";
import journalistic from "./img/journalisticColor.svg";
import colloquial from "./img/colloquialColor.svg";
interface IComponentProps {
    component: IPieChart;
}
function paint(item: (string | number)[], img: string) {
    let precen = Math.round(Number(item[0]));

    let procent;
    if (precen > 9 && precen < 99) {
        procent = precen.toString();
    } else if (precen === 0) {
        procent = "000";
    } else if (precen <= 5) {
        procent = "0";
    } else if (precen >= 100) {
        procent = "10";
    } else {
        procent = "00";
    }
    return (
        <div className="PieChart">
            <div className="imgPieChartScintific">
                <ReactSVG className={"imkPie" + procent} src={img} />
            </div>
            <p className="textPieChart">{item[1]}</p>
            <p className="precentPieChart">{Math.round(Number(item[0]))}%</p>
        </div>
    );
}
export default function PieChartBlock(props: IComponentProps) {
    let artInf = [props.component.artistic.valueOf(), "художественный"];
    let colloquialInf = [props.component.colloquial.valueOf(), "разговорный"];
    let journalisticInf = [
        props.component.official.valueOf(),
        "официально-деловой",
    ];
    let scientificInf = [props.component.scientific.valueOf(), "научный"];
    let officialBusinessInf = [
        props.component.publicistic.valueOf(),
        "публицистический",
    ];
    return (
        <>
            <div className="textPieChartBlock">
                Использование определенного набора слов и выражений для
                достижения заданных коммуникативных целей выступления определяет
                его
                <b className="textInfTitle"> стилевое единство.</b>
            </div>

            <div className="allPieChart">
                {paint(scientificInf, scientific)}
                {paint(officialBusinessInf, officialBusiness)}
                {paint(journalisticInf, journalistic)}
                {paint(colloquialInf, colloquial)}
                {paint(artInf, art)}
            </div>
        </>
    );
}
