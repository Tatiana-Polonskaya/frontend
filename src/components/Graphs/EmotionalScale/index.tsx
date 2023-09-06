import { useState } from "react";
import Scale from "../Scale";
import "./style.scss";
import text from "./img/text.svg";
import video from "./img/video.svg";
import volume_high from "./img/volume-high.svg";
import { ReactSVG } from "react-svg";
import GraphColor from "../../../models/graph/_colors";
import { cn } from "@bem-react/classname";
import {
    ChannelItem,
    EmotionalityDataItem,
} from "../../../models/graph/emotionality";
import { IDescriptionScale } from "../../../models/graph/inteface/IDescriptionScale";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";

type Props = {
    values: EmotionalityDataItem[];
    endTime?: number;
};
const CN = cn("EmotionalScale");

function covertvaluesData(data: ChannelItem[]) {
    let result: IDescriptionScale[] = [];

    data.forEach((el: any) => {
        let tempMax = 0;
        let emotion = "";

        Object.entries(el).forEach((item: any) => {
            if (item[1] > tempMax) {
                tempMax = item[1];
                emotion = item[0];
            }
        });

        result.push({
            title: "",
            value: tempMax * 100,
            color:
                emotion === "anger"
                    ? GraphColor.RED
                    : emotion === "happiness"
                    ? GraphColor.GREEN
                    : GraphColor.GRAY,
        });
    });

    return result;
}

export default function EmotionalScale(props: Props) {
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index: any) => setActiveIndex(index);
    const checkActive = (index: any, className: any) =>
        activeIndex === index ? className : "";

    let infVideo: IDescriptionScale[] = covertvaluesData(
        props.values.map((n) => n.video),
    );
    let infText: IDescriptionScale[] = covertvaluesData(
        props.values.map((n) => n.text),
    );
    let infAudio: IDescriptionScale[] = covertvaluesData(
        props.values.map((n) => n.audio),
    );

    // ___________________ время ________________

    const timeEnd = props.endTime!;

    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text1")}>
                    <b className="textInfTitle1"> Эмоциональность</b> -
                    характеризуется долей и распределением базовых эмоций в
                    выступлении.
                </div>
                <div className={CN("blocksAll")}>
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
            <div className="EmotionalScaletabs">
                <button
                    className={`EmotionalScaletab ${checkActive(
                        1,
                        "EmotionalScaleactive",
                    )}`}
                    onClick={() => handleClick(1)}
                >
                    <ReactSVG src={video} />
                    Видео
                </button>
                <button
                    className={`EmotionalScaletab ${checkActive(
                        2,
                        "EmotionalScaleactive",
                    )}`}
                    onClick={() => handleClick(2)}
                >
                    <ReactSVG src={volume_high} />
                    Аудио
                </button>
                <button
                    className={`EmotionalScaletab ${checkActive(
                        3,
                        "EmotionalScaleactive",
                    )}`}
                    onClick={() => handleClick(3)}
                >
                    <ReactSVG src={text} />
                    Текст
                </button>
            </div>
            <div className={CN("panels")}>
                {props.endTime ? (
                    <span className={CN("text")}>
                        {convertSecondsIntoTime(0)}
                    </span>
                ) : (
                    <></>
                )}
                <div
                    className={`panel ${checkActive(
                        1,
                        "EmotionalScaleactive",
                    )}`}
                >
                    <Scale
                        fractions={infVideo}
                        hasPointer={true}
                        endTime={props.endTime}
                    />
                </div>
                <div
                    className={`panel ${checkActive(
                        2,
                        "EmotionalScaleactive",
                    )}`}
                >
                    <Scale
                        fractions={infAudio}
                        hasPointer={true}
                        endTime={props.endTime}
                    />
                </div>
                <div
                    className={`panel ${checkActive(
                        3,
                        "EmotionalScaleactive",
                    )}`}
                >
                    <Scale
                        fractions={infText}
                        hasPointer={true}
                        endTime={props.endTime}
                    />
                </div>
                {props.endTime ? (
                    <span className={CN("text")}>
                        {convertSecondsIntoTime(timeEnd)}
                    </span>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
