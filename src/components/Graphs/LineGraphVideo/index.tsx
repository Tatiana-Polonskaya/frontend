import "./style.scss";
import { cn } from "@bem-react/classname";
// import GraphColor from "../../../models/graph/_colors";
import { CongruenceItem } from "../../../models/graph/congruence";
import {
    Fragment,
    // MouseEventHandler,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import { Tooltip } from "react-tooltip";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";
// import { _1SEC_PX } from "../-Base/helpers";
import { ValueTime } from "../../Analytics/helpers";
import { VideoTimeContext } from "../../Context/helpers";
import GraphSecondPointer from "../-Base/-SecondPointer";
import { EMOTION, getColorByEmotion, getHeightByValue } from "./helper";
import { convertTime } from "../../Archive/helpers";

type Props = {
    elements: CongruenceItem[];
    endTime: number;
};

const CN = cn("ColumnChart");

export default function ColumnChart2(props: Props) {
    const last_time_end = props.elements.at(-1)!.time_end;
    const timeEnd = props.endTime;

    const { currentTime, setCurrentTime } = useContext(VideoTimeContext);
    const [isPointerMoving, setPointerMoving] = useState(false);
    // const [pointerX, setPointerX] = useState(0);
    const { updateTime } = useContext(ValueTime);

    const sliderRef = useRef<HTMLDivElement>(null);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (sliderRef.current) {
                const sliderWidth = sliderRef.current.offsetWidth;
                const offsetX =
                    event.pageX - sliderRef.current.offsetLeft - 176;
                // const newValue = Math.round((offsetX / sliderWidth) * 100);
                const newValue = (offsetX / sliderWidth) * 100;
                setSliderValue(newValue);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        if (sliderRef.current) {
            const currentSliderRef = sliderRef.current;

            currentSliderRef.addEventListener("mousedown", () => {
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            });

            return () => {
                currentSliderRef.removeEventListener("mousedown", () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                });
            };
        }
    }, []);

    // время
    // const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    //     // if (isPointerMoving) {
    //     //     setPointerX((prev) => {
    //     //         const value = prev + e.movementX;
    //     //         return value > 0 ? value : 0;
    //     //     });
    //     // }
    // };

    const choiseBlock = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataValue = +event.currentTarget.dataset.time! as number;

        if (dataValue || dataValue === 0) {
            setCurrentTime(dataValue);
        }
    };

    useEffect(() => {
        if (isPointerMoving) {
            const time = Math.round((timeEnd * sliderValue) / 100);
            setCurrentTime(time);
            updateTime(time);
        }
    }, [isPointerMoving, setCurrentTime, sliderValue, timeEnd, updateTime]);

    useEffect(() => {
        if (!isPointerMoving) {
            setSliderValue((currentTime / timeEnd) * 100);
        }
    }, [currentTime, isPointerMoving, timeEnd]);

    // --------------- было в предыдущей версии --------------

    // const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    //     if (isPointerMoving) {
    //         setPointerX((prev) => {
    //             const value = prev + e.movementX;
    //             return value > 0 ? value : 0;
    //         });
    //     }
    // };
    // useEffect(() => {
    //     if (!isPointerMoving) {
    //         setPointerX(currentTime * _1SEC_PX);
    //     }
    // }, [currentTime]);

    // useEffect(() => {
    //     if (isPointerMoving) {
    //         const time = Math.floor(pointerX / _1SEC_PX);
    //         setCurrentTime(time);
    //         updateTime(time);
    //     }
    // }, [pointerX]);

    return (
        <div
            className={CN()}
            ref={sliderRef}
            onMouseDown={() => setPointerMoving(true)}
            onMouseUp={() => setPointerMoving(false)}
            onMouseLeave={() => setPointerMoving(false)}
            // onMouseMove={onMouseMove}

            // --------------- было в предыдущей версии --------------
            // style={
            //     {
            //         cursor: isPointerMoving ? "col-resize" : "auto",
            //         height: "100%",
            //     }
            // }
            // onMouseDown={() => setPointerMoving(true)}
            // onMouseUp={() => setPointerMoving(false)}
            // onMouseLeave={() => setPointerMoving(false)}
            // onMouseMove={onMouseMove}
        >
            <GraphSecondPointer
                offsetX={-25}
                left={
                    sliderValue > 100 ? 100 : sliderValue <= 0 ? 0 : sliderValue
                }
                // --------------- было в предыдущей версии --------------
                // left={pointerX}
                text={convertTime(currentTime)}
                // text={new Date(currentTime * 1000)
                //     .toISOString()
                //     .substring(14, 19)}
            />
            {props.elements.map((el, i) => (
                <Fragment key={i}>
                    <div
                        className={CN("brick")}
                        data-tooltip-id={"col-brick-" + i}
                        onDoubleClick={choiseBlock}
                        data-time={el.time_start}
                        style={{
                            backgroundColor: getColorByEmotion(
                                el.type as EMOTION
                            ),
                            height: getHeightByValue(el.value) + "%",
                            width:
                                ((el.time_end - el.time_start) * 100) /
                                    last_time_end +
                                // props.endTime +
                                "%",
                        }}
                    ></div>
                    {el.type !== EMOTION.EMPTY &&
                        el.type !== EMOTION.NEUTRAL && (
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
