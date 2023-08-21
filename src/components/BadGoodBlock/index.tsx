import React from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import "./style.scss";
import okImg from "./img/ок.svg";
import badImg from "./img/bad.svg";
import goodImg from "./img/good.svg";

const CN = cn("BadGoodBlock");

export enum TYPE_ACHIEVEMENTS {
    improvements = "improvements",
    deterioration = "deterioration",
}

function checkType(type: TYPE_ACHIEVEMENTS) {
    if (type === "improvements") {
        return goodImg;
    } else {
        return badImg;
    }
}
function checkTypeColor(type: TYPE_ACHIEVEMENTS) {
    if (type === "improvements") {
        return "#16BF3B";
    } else {
        return "#F35B60";
    }
}
function checkTypeTitle(type: TYPE_ACHIEVEMENTS) {
    if (type === "improvements") {
        return "Улучшения";
    } else {
        return "Ухудшения";
    }
}

function paintList(a: string[], type: TYPE_ACHIEVEMENTS) {
    if (a.length === 0) {
        return (
            <div className={CN("all")}>
                <div className={CN("image")}>
                    <ReactSVG src={okImg} />
                </div>
                <div className={CN("list")}>
                    <div className={CN("title")}>
                        {type === TYPE_ACHIEVEMENTS.improvements
                            ? "Никаких значительных улучшений"
                            : "Ухудшений нет!"}
                    </div>
                    <div className={CN("text")}>
                        {type === TYPE_ACHIEVEMENTS.improvements
                            ? "Продолжай тренироваться и y тебя точно все получится!"
                            : "Так держать! По крайней мере ты не катишься вниз..."}
                    </div>
                </div>
            </div>
        );
    } else
        return (
            <div className={CN("all")}>
                <div className={CN("image")}>
                    <ReactSVG src={checkType(type)} />
                </div>
                <div className={CN()}>
                    <div className={CN("title")}>{checkTypeTitle(type)}</div>
                    <ul className={CN("listUl")}>
                        {a.map((elem, idx) => (
                            <li className={CN("allLi")} key={idx}>
                                <div
                                    className={CN("ellipse")}
                                    style={{ background: checkTypeColor(type) }}
                                ></div>
                                <div className={CN("elem")}>{elem}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
}

type Props = {
    type: TYPE_ACHIEVEMENTS;
    text: string[];
};

export default function BadGoodBlock(props: Props) {
    return <>{paintList(props.text, props.type)}</>;
}
