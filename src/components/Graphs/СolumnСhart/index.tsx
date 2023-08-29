import "./style.scss";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import { CongruenceItem } from "../../../models/graph/congruence";
import { Fragment } from "react";
import { Tooltip } from "react-tooltip";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";

enum EMOTION {
    ANGRY = "angry",
    HAPPINESS = "happiness",
    NEUTRAL = "neutral",
}

function getColorByEmotion(emotion: EMOTION) {
    switch (emotion) {
        case EMOTION.ANGRY:
            return GraphColor.RED;
        case EMOTION.HAPPINESS:
            return GraphColor.GREEN;
        default:
            return GraphColor.GRAY;
    }
}

const MIN_HEIGHT = 20;

function getHeightByValue(value: number) {
    value *= 100;
    if (value < MIN_HEIGHT) return MIN_HEIGHT;
    else if (value < 60) return 50;
    else return value;
}

type Props = {
    elements: CongruenceItem[];
};

const CN = cn("ColumnChart");

export default function ColumnChart(props: Props) {
    const last_time_end = props.elements.at(-1)!.time_end;

    return (
        <div className={CN()}>
            {props.elements.map((el, i) => (
                <Fragment key={i}>
                    <div
                        className={CN("brick")}
                        data-tooltip-id={"col-brick-" + i}
                        style={{
                            backgroundColor: getColorByEmotion(
                                el.type as EMOTION,
                            ),
                            height: getHeightByValue(el.value) + "%",
                            width:
                                ((el.time_end - el.time_start) * 100) /
                                    last_time_end +
                                "%",
                        }}
                    ></div>
                    {el.type !== EMOTION.NEUTRAL && (
                        <Tooltip
                            id={"col-brick-" + i}
                            place={"top-start"}
                            noArrow={true}
                            className={CN("tooltip")}
                        >
                            {"Рассогласование "}
                            {el.type === EMOTION.HAPPINESS ? (
                                <span className={CN("tooltip-happiness")}>
                                    радости
                                </span>
                            ) : (
                                <span className={CN("tooltip-anger")}>
                                    злости
                                </span>
                            )}
                            {" на "}
                            {convertSecondsIntoTime(el.time_start)}.
                        </Tooltip>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
