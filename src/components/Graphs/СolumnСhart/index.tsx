import "./style.scss";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import { CongruenceItem } from "../../../models/graph/congruence";
import {
    Fragment,
    MouseEventHandler,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { Tooltip } from "react-tooltip";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";
import { _1SEC_PX } from "../-Base/helpers";
import { ValueTime } from "../../Analytics/helpers";
import { VideoTimeContext } from "../../Context/helpers";
import GraphSecondPointer from "../-Base/-SecondPointer";

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

    const { currentTime, setCurrentTime } = useContext(VideoTimeContext);
    const [isPointerMoving, setPointerMoving] = useState(false);
    const [pointerX, setPointerX] = useState(0);
    const { updateTime } = useContext(ValueTime);

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isPointerMoving) {
            setPointerX((prev) => {
                const value = prev + e.movementX;
                return value > 0 ? value : 0;
            });
        }
    };
    useEffect(() => {
        if (!isPointerMoving) {
            setPointerX(currentTime * _1SEC_PX);
            // setPointerX(currentTime * secondarySecond);
        }
    }, [currentTime]);

    useEffect(() => {
        if (isPointerMoving) {
            const time = Math.floor(pointerX / _1SEC_PX);
            setCurrentTime(time);
            updateTime(time);
        }
    }, [pointerX]);

    // ширина родителя

    const parentRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (parentRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            setWidthLineGraph(parentWidth);
            console.log(parentWidth);
        }
    };

    const [widthLineGraph, setWidthLineGraph] = useState<number>();

    const [secondarySecond, setSecondarySet] = useState<number>();

    useEffect(() => {
        if (widthLineGraph) {
            // const secondPX = Math.floor(widthLineGraph / last_time_end);
            const secondPX = widthLineGraph / last_time_end;
            setSecondarySet(secondPX);
        }
    }, [widthLineGraph]);

    useEffect(() => {
        if (secondarySecond) {
            console.log("secondarySecond", secondarySecond);
        }
    }, [secondarySecond]);

    return (
        <div
            className={CN()}
            style={{
                cursor: isPointerMoving ? "col-resize" : "auto",
                // height: "100%",
            }}
            onMouseDown={() => setPointerMoving(true)}
            onMouseUp={() => setPointerMoving(false)}
            onMouseLeave={() => setPointerMoving(false)}
            onMouseMove={onMouseMove}
            onMouseEnter={handleClick}
            ref={parentRef}
        >
            <GraphSecondPointer
                offsetX={-25}
                left={pointerX}
                text={new Date(currentTime * 1000)
                    .toISOString()
                    .substring(14, 19)}
            />
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
