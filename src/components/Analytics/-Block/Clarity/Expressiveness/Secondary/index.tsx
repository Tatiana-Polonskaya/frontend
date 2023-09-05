import { cn } from "@bem-react/classname";

import "./style.scss";

import {
    ExpressivenessDataItem,
    ExpressivenessType,
} from "../../../../../../models/graph/expressiveness";
import ExpressivenessGraph from "../../../../../Graphs/Expressiveness";
import { useEffect, useState } from "react";

type Props = {
    data: ExpressivenessDataItem[];
    state: string;
    graphs: string[];
};

interface IExpressiveness {
    type: string;
    color: string;
}

const cnExpressiveness = cn("expressiveness");

type propsExpressiveness = {
    typeExpressiveness: IExpressiveness[];
};
let expressiveness: propsExpressiveness = {
    typeExpressiveness: [
        {
            type: "нейтральная",
            color: "#ADB9D4",
        },
        {
            type: "радость",
            color: "linear-gradient(32.08deg, #24F19B 0%, #51F976 100%)",
        },
        {
            type: "злость",
            color: "linear-gradient(78.41deg, #FE6972 0%, #FF4E78 100%)",
        },
    ],
};

export default function SecondaryExpressiveness(props: Props) {
    // 0 - ExpressivenessType.ANGER
    // 1 - ExpressivenessType.HAPPINESS
    // 2 - ExpressivenessType.NEUTRAL + ANGER
    // any > 2 - ExpressivenessType.NEUTRAL + HAPPINESS
    const [graph, setGraph] = useState(2);
    const [choosedEmotion, setChoosedEmotion] = useState(0); // 0 - ANGER or 1 - HAPPINESS
    const [onNeutral, setOnNeutral] = useState(false);

    useEffect(() => {
        if (choosedEmotion % 2 === 0) {
            setGraph(onNeutral ? 2 : 0);
        } else setGraph(onNeutral ? 3 : 1);
    }, [choosedEmotion, onNeutral]);

    return (
        <>
            {/* <ConnectivityGraph items={[]} /> */}
            <div className={cnExpressiveness()}>
                <p className={cnExpressiveness("descript")}>
                    <span>
                        <b className={cnExpressiveness("descript-bold")}>
                            {"Экспрессивность"}
                        </b>{" "}
                        {
                            "- придание средства аудиовизуальной речи эмоциональной (как положительной, так и отрицательной) окраски произносимым словам."
                        }
                    </span>
                </p>
                <div className={cnExpressiveness("list")}>
                    {expressiveness.typeExpressiveness.map((el, index) => (
                        <div key={index} className={cnExpressiveness("marker")}>
                            <div style={{ background: el.color }}></div>
                            <div className={cnExpressiveness("title")}>
                                {el.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cnExpressiveness("analysis")}>
                <span className={cnExpressiveness("set")}>Параметры:</span>
                <ul className={cnExpressiveness("menu")}>
                    {props.graphs.map((el, ind) => (
                        <li
                            key={ind}
                            className={cnExpressiveness("item", {
                                choised: ind === choosedEmotion,
                            })}
                        >
                            <div
                                className={cnExpressiveness("link")}
                                onClick={() => {
                                    setChoosedEmotion(ind);
                                }}
                            >
                                {el}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={cnExpressiveness("analysis-open")}>
                    <span className={cnExpressiveness("set")}>
                        Нейтральная эмоция в текстовом канале:
                    </span>
                    <ul className={cnExpressiveness("menu")}>
                        <li
                            className={cnExpressiveness("item-open", {
                                choised: onNeutral,
                            })}
                        >
                            <div
                                className={cnExpressiveness("link")}
                                onClick={() => {
                                    setOnNeutral((prev) => !prev);
                                }}
                            >
                                {onNeutral ? "Вкл" : "Выкл"}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cnExpressiveness("graph")}>
                <ExpressivenessGraph
                    data={props.data}
                    param={
                        graph === 0
                            ? ExpressivenessType.ANGER
                            : graph === 1
                            ? ExpressivenessType.HAPPINESS
                            : graph === 2
                            ? [
                                  ExpressivenessType.NEUTRAL,
                                  ExpressivenessType.ANGER,
                              ]
                            : [
                                  ExpressivenessType.NEUTRAL,
                                  ExpressivenessType.HAPPINESS,
                              ]
                    }
                />
            </div>
        </>
    );
}
