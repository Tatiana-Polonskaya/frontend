import React from "react";
import "./Informative.css";
import { IScaleDataType } from "../../../models/graph/inteface/scale";
import Scale from "../Scale";
import { cn } from "@bem-react/classname";

const CN = cn("inf");

type Props = {
    informative: number;
    parasite: number;
    sounds: number;
    empty: number;
};

function InformativScale(props: Props) {
    let inf: IScaleDataType = {
        item: [
            {
                title: "Слова-паразиты",
                value: props.parasite < 0 ? 0 : props.parasite,
                color: "#410DAE",
            },
            {
                title: "Неречевые звуки",
                value: props.sounds < 0 ? 0 : props.sounds,
                color: "#FE5D74",
            },
            {
                title: "Пустые паузы",
                value: props.empty < 0 ? 0 : props.empty ,
                color: "#FFB800",
            },
            {
                title: "Информативная часть",
                value: props.informative < 0 ? 0 : props.informative,
                color: "#D4DFF4",
            },
        ],
    };
    return (
        <>
            <div className={CN("inf")}>
                <Scale component={inf} />
            </div>
        </>
    );
}
export default InformativScale;
