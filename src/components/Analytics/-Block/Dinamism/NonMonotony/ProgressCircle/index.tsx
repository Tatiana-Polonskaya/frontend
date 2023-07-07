import { cn } from "@bem-react/classname";

import "./style.scss";

import { IComponents } from "../../../../../Analytics/-Block/models/IComponents";
// import { useEffect, useState, useContext } from "react";

// import { ValueTime } from "../../../../helpers";

type Props = {
    info: IComponents;
};

const cnProgressCircle = cn("circle");
const cnCircleLeft = cn("circle-ls");
const cnCircleRight = cn("circle-rs");

export default function ProgressCircle({ info }: Props) {
    const k: number = 23 / 18;
    const r: number = 139;
    const x: number = +Math.cos((Math.PI * k * info.value) / 100).toFixed(5);
    const y: number = +Math.sin((Math.PI * k * info.value) / 100).toFixed(5);

    return (
        <div className={cnProgressCircle("item", cnProgressCircle("border"))}>
            <div className={cnProgressCircle("left-side")}>
                <div className={cnCircleLeft("result")}>
                    <span style={{ color: info.fill }}>{info.result}</span>
                </div>
                <div className={cnCircleLeft("circle")}>
                    <div className={cnCircleLeft("percent")} style={{}}>
                        <svg viewBox="0 0 160 160">
                            <circle
                                cx={80}
                                cy={75}
                                r={61}
                                style={{
                                    stroke: `#ADB9D4`,
                                    strokeDasharray: 440,
                                    strokeDashoffset: 440 - 440 + r + 56,
                                }}
                            ></circle>
                            <circle
                                cx={
                                    19 +
                                    61 +
                                    61 * +Math.cos(Math.PI * k).toFixed(5)
                                }
                                cy={
                                    14 +
                                    61 +
                                    61 * +Math.sin(Math.PI * k).toFixed(5)
                                }
                                r={4.3}
                                style={{
                                    stroke: `#ADB9D4`,
                                    strokeWidth: 0.1,
                                    fill: `#ADB9D4`,
                                    zIndex: 1000,
                                }}
                            ></circle>
                            <circle
                                cx={80}
                                cy={75}
                                r={61}
                                style={{
                                    stroke: `${info.fill}`,
                                    strokeDasharray: 440,
                                    strokeDashoffset:
                                        440 -
                                        ((440 - 56 - r) * info.value) / 100,
                                    filter: `drop-shadow(${info.shadow})`,
                                }}
                            ></circle>
                            <circle
                                cx={19 + 61 + 61 * x}
                                cy={14 + 61 + 61 * y}
                                r={2.5}
                                style={{
                                    stroke: `${info.fill}`,
                                    zIndex: 1000,
                                    fill: `${info.fill}`,
                                    filter: `drop-shadow(${info.shadow})`,
                                }}
                            ></circle>
                            <circle
                                cx={141}
                                cy={75}
                                r={4.3}
                                style={{
                                    stroke: `${info.fill}`,
                                    strokeWidth: 0.1,
                                    zIndex: 1000,
                                    fill: `${info.fill}`,
                                    filter: `drop-shadow(${info.shadow})`,
                                }}
                            ></circle>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={cnCircleRight()}>
                <div className={cnCircleRight("content")}>
                    <div className={cnCircleRight("title")}>{info.title}</div>
                    <span className={cnCircleRight("text")}>
                        {info.subtitle}
                    </span>
                </div>
            </div>
        </div>
    );
}
