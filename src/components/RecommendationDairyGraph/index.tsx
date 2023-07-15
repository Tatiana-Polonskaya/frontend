import React, { useState } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { ReactSVG } from "react-svg";

type Props = {
    icon?: string;
    text?:string;
};
export default function RecommendationDairyGraph(props:Props) {
    const cnRec = cn("Recommend");
    const stateBtn = ["Свернуть", "Развернуть"];
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={cnRec()}>
            <div className={cnRec("header")}>
                <div className={cnRec("nameIcon")}>
                    {props.icon && <ReactSVG src={props.icon} className={cnRec("icon")}/>}
                    <span className={cnRec("title")}>Рекомендации</span>
                </div>
                <span onClick={()=>setIsShow(prev=>!prev)} className={cnRec("btn")}>{isShow ? stateBtn[0] : stateBtn[1]}</span>
            </div>
            {isShow && <div className={cnRec("content")}>
                <div className={cnRec("text")}>
                За рассматриваемый период Ваш общий результат подготовки к публичному выступлению улучшился на 10 процентов!..
                </div>
                <div className={cnRec("text1")}>
                    Этому способствовало повышение ясности и динамичности выступления. Между тем, наблюдаются низкая информативность и аргументированность выступления.
                    Отмечается не значительная динамика убедительности выступления.
                    Здесь следует обратить внимание на согласованность эмоций, выражаемых по различным коммуникативным каналам.
                </div>
                <div className={cnRec("text1")}>
                    Вам следует внимательнее отнестись к <b className={cnRec("textDark")}>нашим рекомендациям</b> по улучшению <b className={cnRec("textBlue")}>связности выступления</b> и <b className={cnRec("textBlue")}>соблюдению коммуникативных норм</b>.
                </div>
                </div>
            }
        </div>
    );
}