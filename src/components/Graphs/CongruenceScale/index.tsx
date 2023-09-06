import { useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";

import video from "../EmotionalScale/img/video.svg";
import volume_high from "../EmotionalScale/img/volume-high.svg";
import text from "../EmotionalScale/img/text.svg";
import { CongruenceItem } from "../../../models/graph/congruence";

import SwitchButton from "../SwitchButton";
import CongruenceGraph from "./CongruenceGraph";
import convertDataCongruenceFromBackIntoGraph from "../../../@adapters/Graphs/congruence";

const CN = cn("CongruenceScale");

type Props = {
    A_V: CongruenceItem[];
    A_T: CongruenceItem[];
    V_T: CongruenceItem[];
    endTime: number;
};

export default function CongruenceScale(props: Props) {
    const listItemA_T = props.A_T;
    const listItemA_V = props.A_V;
    const listItemV_T = props.V_T;

    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index: number) => setActiveIndex(index);

    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text")}>
                    <b className="textInfTitle">Конгруэнтность </b> -
                    характеризуется согласованностью эмоций, выражаемых
                    человеком с помощью мимики и речи, а также передаваемых в
                    тексте выступления.
                </div>
                <div className={CN("bocksAll")}>
                    <div className={CN("blockText")}>
                        <div
                            className={CN("block")}
                            style={{ background: "#7C8EB5" }}
                        />
                        <div className={CN("Text")}> нейтральная</div>
                    </div>
                    <div className={CN("blockText")}>
                        <div
                            className={CN("block")}
                            style={{ background: "#24F19B" }}
                        />
                        <div className={CN("Text")}> радость</div>
                    </div>
                    <div className={CN("blockText")}>
                        <div
                            className={CN("block")}
                            style={{ background: "#FE6972" }}
                        />
                        <div className={CN("Text")}> злость</div>
                    </div>
                </div>
            </div>
            <div className={CN("congruenceScaletabs")}>
                <SwitchButton
                    title={"Видео"}
                    icon={video}
                    onClick={() => handleClick(1)}
                    isActive={activeIndex === 1}
                />
                <SwitchButton
                    title={"Аудио"}
                    icon={volume_high}
                    onClick={() => handleClick(2)}
                    isActive={activeIndex === 2}
                />
                <SwitchButton
                    title={"Текст"}
                    icon={text}
                    onClick={() => handleClick(3)}
                    isActive={activeIndex === 3}
                />
            </div>
            <div className={CN("panels")}>
                <div
                    className={CN("panels-panel", {
                        visible: activeIndex === 1,
                    })}
                >
                    <CongruenceGraph
                        elements={convertDataCongruenceFromBackIntoGraph(
                            listItemA_T,
                        )}
                        endTime={props.endTime}
                    />
                </div>
                <div
                    className={CN("panels-panel", {
                        visible: activeIndex === 2,
                    })}
                >
                    <CongruenceGraph
                        elements={convertDataCongruenceFromBackIntoGraph(
                            listItemV_T,
                        )}
                        endTime={props.endTime}
                    />
                </div>
                <div
                    className={CN("panels-panel", {
                        visible: activeIndex === 3,
                    })}
                >
                    <CongruenceGraph
                        elements={convertDataCongruenceFromBackIntoGraph(
                            listItemA_V,
                        )}
                        endTime={props.endTime}
                    />
                </div>
            </div>
        </>
    );
}
