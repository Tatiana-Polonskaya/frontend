import React, { useState } from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import LampCharge from "./icons/lamp-charge.svg";

import "./style.scss";

type Props = {
    recomendation?: string;
};

const cnRecomendation = cn("recomendation");

export default function Recomendation({ recomendation }: Props) {
    const [active, setActive] = useState("");

    const unfold = () => {
        if (active) {
            setActive("");
        } else {
            setActive("active");
        }
    };
    return (
        <div className={cnRecomendation()}>
            <div className={cnRecomendation("header")}>
                <ReactSVG
                    className={cnRecomendation("icon")}
                    src={LampCharge}
                />
                <div className={cnRecomendation("title")}>{"Рекомендации"}</div>
                <div onClick={unfold} className={cnRecomendation("link")}>
                    {"Развернуть"}
                </div>
            </div>
            <div className={cnRecomendation("content")}>
                <p className={`${active}`}>{recomendation}</p>
            </div>
        </div>
    );
}
