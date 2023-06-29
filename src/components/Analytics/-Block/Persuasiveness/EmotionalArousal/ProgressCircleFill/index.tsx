import { cn } from "@bem-react/classname";

import "./style.scss";

import { IEmotionalArousal } from "../../../models/IEmotionalArousal";

type Props = {
    info: IEmotionalArousal;
    id: number;
    value?: number;
};

const cnProgressCircle = cn("circleFill");
const cnCircleLeft = cn("circleFill-ls");
const cnCircleRight = cn("circleFill-rs");

export default function ProgressCircleFill(props: Props) {
    const fill =
        props.id !== 2 ? ["#F35B60", "#36ED53"] : ["#36ED53", "#F35B60"];
    const k: number = 23 / 18;
    const r: number = 139;
    const x: number = +Math.cos(
        (Math.PI * k * props.info.result * 100) / 100
    ).toFixed(5);
    const y: number = +Math.sin(
        (Math.PI * k * props.info.result * 100) / 100
    ).toFixed(5);

    return (
        <div className={cnProgressCircle("item", cnProgressCircle("border"))}>
            <div className={cnProgressCircle("left-side")}>
                <div className={cnCircleLeft("result")}>
                    <span>{props.info.result?.toFixed(2)}</span>
                </div>
                <div className={cnCircleLeft("circle")}>
                    <div className={cnCircleLeft("percent")} style={{}}>
                        <svg viewBox="0 0 160 160">
                            <circle
                                className="sector"
                                cx={80}
                                cy={75}
                                r={30}
                                style={{
                                    stroke: `${props.info.fill[1]}`,
                                    strokeDasharray: 440,
                                    strokeDashoffset: 440 - 440 + r * 1.89 + 56,
                                    zIndex: 10,
                                }}
                            ></circle>
                            <circle
                                className="sector"
                                cx={80}
                                cy={75}
                                r={30}
                                style={{
                                    stroke: `${props.info.fill[0]}`,
                                    strokeDasharray: 440,
                                    strokeDashoffset:
                                        440 -
                                        ((440 - 56 - r * 1.89) *
                                            props.info.limit *
                                            100) /
                                            100,
                                    zIndex: 20,
                                }}
                            ></circle>
                            {/* серая полоса прогресса */}
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
                            {/* серый шарик в конце */}
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
                                r={0.1}
                                style={{
                                    stroke: `#ADB9D4`,
                                    zIndex: 1000,
                                }}
                            ></circle>
                            {/* линия заливки */}
                            <circle
                                cx={80}
                                cy={75}
                                r={61}
                                style={{
                                    stroke: `${
                                        props.info.result < props.info.limit
                                            ? fill[0]
                                            : fill[1]
                                    }`,
                                    strokeDasharray: 440,
                                    strokeDashoffset:
                                        440 -
                                        ((440 - 56 - r) *
                                            props.info.result *
                                            100) /
                                            100,
                                    zIndex: 1000,
                                }}
                            ></circle>
                            {/* шарик заливки */}
                            <circle
                                cx={19 + 61 + 61 * x}
                                cy={14 + 61 + 61 * y}
                                r={2.5}
                                style={{
                                    stroke: `${
                                        props.info.result < props.info.limit
                                            ? fill[0]
                                            : fill[1]
                                    }`,
                                    zIndex: 1000,
                                }}
                            ></circle>
                            {/* шарик заливки крайний */}
                            <circle
                                cx={141}
                                cy={75}
                                r={0.1}
                                style={{
                                    stroke: `${
                                        props.info.result < props.info.limit
                                            ? fill[0]
                                            : fill[1]
                                    }`,
                                    zIndex: 1000,
                                }}
                            ></circle>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={cnCircleRight()}>
                <div className={cnCircleRight("content")}>
                    <div className={cnCircleRight("title")}>
                        {props.info.title}
                    </div>
                    <span className={cnCircleRight("text")}>
                        {props.info.subtitle}
                    </span>
                </div>
            </div>
        </div>
    );
}
