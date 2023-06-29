import { cn } from "@bem-react/classname";

import "./style.scss";

import { IComponents } from "../../../../../Analytics/-Block/models/IComponents";
import { useEffect, useState, useContext } from "react";

import { ValueTime } from "../../../../helpers";
import data from "../../../../../../plugs/non-monotony.json";

type Props = {
    info: IComponents;
    value?: number;
};

const cnProgressCircle = cn("circle");
const cnCircleLeft = cn("circle-ls");
const cnCircleRight = cn("circle-rs");

export default function ProgressCircle(props: Props) {
    const [value, setValue] = useState(0);
    const [result, setResult] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const { currentTime } = useContext(ValueTime);
    // currentTime берем и сравниваем навенрное цикл сюда? бежим пока не встретим time_start меньше

    useEffect(() => {
        // возможно вот эту шляпу надо заменить
        // мысль, возможно вычислять то секундам положение и менять бегунок на всем диапазоне
        if (props.info.title === "Темп речи") {
            // красиво работает только для 10, для всего остального думать перебор
            setValue(data.data.values[Math.floor(currentTime / 10)].rate * 100);

            //  100% = 250 слов . 100-140-250 = 40-56-100
            if (value < 40) {
                setResult("Низкий");
                setSubtitle("слишком размеренно, к Вам могут потерять интерес");
            } else if (value >= 40 && value <= 56) {
                setResult("Норма");
                setSubtitle("средний, ровный и без пауз");
            } else if (value > 56) {
                setResult("Высокий");
                setSubtitle("трудно уследить за Вашими мыслями");
            }
        } else if (props.info.title === "Громкость голоса") {
            // красиво работает только для 10, для всего остального думать перебор
            setValue(
                data.data.values[Math.floor(currentTime / 10)].volume * 100
            );

            //  0% = 20 дБ 100% = 120 дБ . 40-60-120 = 40-60-100
            if (value + 20 < 40) {
                setResult("слишком тихо");
                setSubtitle("может быть Вы не уверены в том, что говорите?");
            } else if (value + 20 >= 40 && value <= 60) {
                setResult("норма");
                setSubtitle("оптимальна для выступающего");
            } else if (value + 20 > 60) {
                setResult("слишком громко");
                setSubtitle("выглядит так, как будто Вы проявляете агрессию");
            }
        } else if (props.info.title === "Диапазон изменения тона") {
            // красиво работает только для 10, для всего остального думать перебор
            setValue(data.data.values[Math.floor(currentTime / 10)].tone * 100);
            //  100% = 100% . 34-66-100
            if (value < 34) {
                setResult("маленький");
                setSubtitle("однообразие звучания притупляет восприятие");
            } else if (value >= 34 && value <= 66) {
                setResult("норма");
                setSubtitle("Вас приятно слушать");
            } else if (value > 66) {
                setResult("большой");
                setSubtitle(
                    "так Вы оказываете сильное воздействие на аудиторию"
                );
            }
        }
        //нужно ли тут за всеми следить. мне нужно только по value отрабатывать хук
    }, [currentTime, value]);

    const k: number = 23 / 18;
    const r: number = 139;
    const x: number = +Math.cos((Math.PI * k * value) / 100).toFixed(5);
    const y: number = +Math.sin((Math.PI * k * value) / 100).toFixed(5);

    return (
        <div className={cnProgressCircle("item", cnProgressCircle("border"))}>
            <div className={cnProgressCircle("left-side")}>
                <div className={cnCircleLeft("result")}>
                    <span style={{ color: props.info.fill }}>{result}</span>
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
                                r={0.1}
                                style={{
                                    stroke: `#ADB9D4`,
                                    zIndex: 1000,
                                }}
                            ></circle>
                            <circle
                                cx={80}
                                cy={75}
                                r={61}
                                style={{
                                    stroke: `${props.info.fill}`,
                                    strokeDasharray: 440,
                                    strokeDashoffset:
                                        440 - ((440 - 56 - r) * value) / 100,
                                    filter: `drop-shadow(${props.info.shadow})`,
                                }}
                            ></circle>
                            <circle
                                cx={19 + 61 + 61 * x}
                                cy={14 + 61 + 61 * y}
                                r={2.5}
                                style={{
                                    stroke: `${props.info.fill}`,
                                    zIndex: 1000,
                                    filter: `drop-shadow(${props.info.shadow})`,
                                }}
                            ></circle>
                            <circle
                                cx={141}
                                cy={75}
                                r={0.1}
                                style={{
                                    stroke: `${props.info.fill}`,
                                    zIndex: 1000,
                                    filter: `drop-shadow(${props.info.shadow})`,
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
                    <span className={cnCircleRight("text")}>{subtitle}</span>
                </div>
            </div>
        </div>
    );
}
