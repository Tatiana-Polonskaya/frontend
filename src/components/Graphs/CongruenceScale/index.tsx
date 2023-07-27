import React, { Fragment, useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import { ReactSVG } from "react-svg";
import video from "../EmotionalScale/img/video.svg";
import volume_high from "../EmotionalScale/img/volume-high.svg";
import text from "../EmotionalScale/img/text.svg";

const CN = cn("congruenceScale");

type item = {
    time_start: number;
    value: number;
    type: string;
    time_end: number;
};
type Props = {
    A_V: item[];
    A_T: item[];
    V_T: item[];
};
function ListItemAVT(difAVT: item[]) {
    let time_now = 0;
    let last = -1;
    let last_time_end = difAVT[difAVT.length - 1].time_end
    let gray;

    for (let i = 0; i < difAVT.length; i++) {
        if (difAVT[i].type === "angry" || difAVT[i].type === "happiness" && difAVT[i].type != "neutral"){
            last = i;
        }
    }

    if (last === -1) {
        gray = (
            <div
                style={{
                    backgroundColor: GraphColor.GRAY,
                    height: "20%",
                    width: 100 + "%",
                }}
            ></div>
        );
        return (
            <Fragment key={0}>
                {" "}
                {gray}{" "}
            </Fragment>
        );
    }

    return difAVT.map((item, idx) => {
        let block;
        let buffer;
        let ending;
        let height = item.value < 0.2 ? 0.2 : item.value < 0.65 ? 0.5 : 0.8;
        let color = item.type === "angry" ? GraphColor.RED : item.type === "happiness" ? GraphColor.GREEN : GraphColor.GRAY;
        if (item.type != "neutral") {
            if (item.time_start > time_now) {
                buffer = (
                    <div
                        style={{
                            marginLeft: "2px",
                            backgroundColor: GraphColor.GRAY,
                            height: "20%",
                            width: ((item.time_start - time_now) * 100 / last_time_end) + "%",
                        }}
                    ></div>
                );
            }
            block = (
                <div
                    style={{
                        marginLeft: "2px",
                        backgroundColor: color,
                        height: (height * 100) + "%",
                        width: ((item.time_end - item.time_start) * 100 / last_time_end) + "%",
                    }}
                ></div>
            );
            time_now = item.time_end;
            if (idx === last && item.time_end < last_time_end) {
                ending = (
                    <div
                        style={{
                            marginLeft: "2px",
                            backgroundColor: GraphColor.GRAY,
                            height: "20%",
                            width: ((100 - item.time_end) * 100 / last_time_end) + "%",
                        }}
                    ></div>
                );
            }
        }

        return (
            <Fragment key={idx}>
                {" "}
                {buffer} {block} {ending}{" "}
            </Fragment>
        );
    });
}

export default function CongruenceScale(props: Props) {
    let listItemA_T = ListItemAVT(props.A_T);
    let listItemA_V = ListItemAVT(props.A_V);
    let listItemV_T = ListItemAVT(props.V_T);

    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index: any) => setActiveIndex(index);
    const checkActive = (index: any, className: any) =>
        activeIndex === index ? className : "";
    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text")}>
                    <b className="textInfTitle">Конгруэнтность </b> -
                    согласованность эмоций, выражаемых в разных коммуникативных
                    каналах (видео, аудио и текст из речи).
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
            <div className="congruenceScaletabs">
                <button
                    className={`congruenceScaletab ${checkActive(
                        1,
                        "congruenceScaleactive"
                    )}`}
                    onClick={() => handleClick(1)}
                >
                    <ReactSVG src={video} />
                    Видео
                </button>
                <button
                    className={`congruenceScaletab ${checkActive(
                        2,
                        "congruenceScaleactive"
                    )}`}
                    onClick={() => handleClick(2)}
                >
                    <ReactSVG src={volume_high} />
                    Аудио
                </button>
                <button
                    className={`congruenceScaletab ${checkActive(
                        3,
                        "congruenceScaleactive"
                    )}`}
                    onClick={() => handleClick(3)}
                >
                    <ReactSVG src={text} />
                    Текст
                </button>
            </div>
            <div className="panels">
                <div
                    className={`panel ${checkActive(
                        1,
                        "congruenceScaleactive"
                    )}`}
                >
                    <div className="content">{listItemA_T}</div>
                </div>
                <div
                    className={`panel ${checkActive(
                        2,
                        "congruenceScaleactive"
                    )}`}
                >
                   <div className="content">{listItemV_T}</div>
                </div>
                <div
                    className={`panel ${checkActive(
                        3,
                        "congruenceScaleactive"
                    )}`}>
                    <div className="content">{listItemA_V}</div>
                </div>
            </div>
        </>
    );
}
