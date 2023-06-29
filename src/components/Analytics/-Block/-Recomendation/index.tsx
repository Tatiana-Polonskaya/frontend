import React, { useState } from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import LampCharge from "./icons/lamp-charge.svg";

import "./style.scss";

type Props = {
    recomendation?: string;
};

const cnRecomendation = cn("recomendation");

export default function Recomendation(props: Props) {
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
                <div className={cnRecomendation("title")}>Рекомендации</div>
                <div onClick={unfold} className={cnRecomendation("link")}>
                    Развернуть
                </div>
            </div>
            <div className={cnRecomendation("content")}>
                <p className={`${active}`}>
                    {/* убрать заглушку и передавать текст если будет меняться */}
                    Cпособность представления информации в организованном и
                    логически связанном виде, который облегчает ее понимание и
                    запоминание и другие... Lorem ipsum dolor sit amet
                    consecteturblanditiis facilis sunt laudantium earum beatae,
                    in nesciunt. Sed placeat fugit vel repellat!
                    {props.recomendation}
                </p>
            </div>
        </div>
    );
}
