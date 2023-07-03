import { cn } from "@bem-react/classname";

import "./style.scss";

import {
    ExpressivenessDataItem,
    ExpressivenessType,
} from "../../../../../../models/graph/expressiveness";
import ExpressivenessGraph from "../../../../../Graphs/Expressiveness";
import { useState } from "react";

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
    const choiseLinks = (ind: number) => {
        const linkEl = document.querySelectorAll(".expressiveness-item");
        linkEl.forEach((el) => el.classList.remove("expressiveness-choise"));
        linkEl[ind].classList.add("expressiveness-choise");
        ind === 1 && graph === 3
            ? setGraph(4)
            : ind === 1 && graph === 0
            ? setGraph(2)
            : ind === 0 && graph === 4
            ? setGraph(3)
            : setGraph(0);
        return;
    };
    console.log(props)
    const openMiddle = (ind: number) => {
        const openEl = document.querySelector(".expressiveness-item-open");
        openEl!.classList.toggle("expressiveness-choise");

        graph === 3
            ? setGraph(0)
            : graph === 4
            ? setGraph(2)
            : graph === 0
            ? setGraph(3)
            : setGraph(4);
        return;
    };

    const [graph, setGraph] = useState(3);
    return (
        <>
            {/* <ConnectivityGraph items={[]} /> */}
            <div className={cnExpressiveness()}>
                <p className={cnExpressiveness("descript")}>
                    <span>
                        <b className={cnExpressiveness("descript-bold")}>
                            {"Последовательность"}
                        </b>{" "}
                        {
                            "- упорядоченное представление аргументов, при котором выступление плавно переходит от одной идеи к другой с предъявлением конкретных фактов и примеров."
                        }
                    </span>
                    <br />
                    <span>
                        {
                            "Под когнитивными искажениями понимаются систематические ошибки в мышлении или шаблонные отклонения."
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
                            className={
                                ind === 0
                                    ? cnExpressiveness(
                                          "item",
                                          cnExpressiveness("choise")
                                      )
                                    : cnExpressiveness("item")
                            }
                        >
                            <div
                                className={cnExpressiveness("link")}
                                onClick={() => {
                                    choiseLinks(ind);
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
                            key={1}
                            className={cnExpressiveness(
                                "item-open",
                                cnExpressiveness("choise")
                            )}
                        >
                            <div
                                className={cnExpressiveness("link")}
                                onClick={() => {
                                    openMiddle(0);
                                }}
                            >
                                {"Вкл"}
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
                            : graph === 2
                            ? ExpressivenessType.HAPPINESS
                            : graph === 3
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
