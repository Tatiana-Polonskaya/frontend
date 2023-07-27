import React from "react";
import "./style.scss";
import { IScaleDataType } from "../../../models/graph/inteface/scale";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";

const CN = cn("Scale");
interface IComponentProps {
    component: IScaleDataType;
}

function checkSize(n: number) {
    return n < 15 ? "0px" : "18px";
}

export default function Scale({ component }: IComponentProps) {
    return (
        <div className={CN()}>
            {component.item.map((number, idx) => (
                <div
                    key={idx}
                    className={CN("content")}
                    style={{
                        backgroundColor: number.color,
                        color:
                            number.color === GraphColor.GRAY
                                ? "#7C8EB5"
                                : GraphColor.WHITE,
                        width: number.value + "%",
                    }}
                >
                    <div
                        className={CN("text")}
                        style={{ fontSize: checkSize(number.value) }}
                    >
                        {number.title}
                    </div>
                </div>
            ))}
        </div>
    );
}
