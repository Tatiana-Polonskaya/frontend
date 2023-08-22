import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";

import "./style.scss";
import { convertTime } from "../../Analytics/helpers";
import { useContext, useEffect, useRef, useState } from "react";
import { getWindowWidth } from "../../../tools/window";
// import { Tooltip } from "react-tooltip";
// import { VideoTimeContext } from "../../Context/helpers";

type Props = {
    startTime?: number;
    endTime?: number;
    data: TimelineItem[];
};

type TimelineItem = {
    id?: number;
    text?: string;
    time: number;
    color?: string;
};
export default function TimelineGraph({
    startTime = 0,
    endTime = 0,
    data,
}: Props) {
    const convertStart = convertTime(startTime);
    const convertEnd = convertTime(endTime);

    const [isOpened, setIsOpened] = useState(false);
    const [indOpened, setIndOpened] = useState<number>();

    const [helpWidth, setHelpWidth] = useState(0);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const helpRef = useRef<HTMLDivElement>(null);
    const CN = cn("timeline-graph");
    const cnGraphHelp = cn("graph-help-line");

    const [right, setRight] = useState("");

    const handleMousePosition: React.MouseEventHandler<HTMLDivElement> = (
        e
    ) => {
        const windowWidth = getWindowWidth();
        if (windowWidth * 0.95 > e.clientX + helpWidth) {
            setRight("auto");
        } else {
            setRight("10px");
        }
    };

    useEffect(() => {
        if (helpRef.current) {
            setHelpWidth(helpRef.current.getBoundingClientRect().width);
        }
    }, [helpRef.current]);

    // const { setCurrentTime } = useContext(VideoTimeContext);

    // const choiseBlock = (event: React.MouseEvent<HTMLDivElement>) => {
    //     const dataValue = +event.currentTarget.dataset.time! as number;
    //     if (dataValue) {
    //         setCurrentTime(dataValue);
    //     }
    // };

    return (
        <div className={CN()}>
            <div className={CN("time")}>{convertStart}</div>
            <div className={CN("body")}>
                {data.map((el) => (
                    <div
                        key={el.id}
                        style={{
                            backgroundColor:
                                el.color === GraphColor.DARKGRAY
                                    ? GraphColor.GRAY
                                    : el.color || GraphColor.GRAY,
                        }}
                        className={CN("element")}
                        // onClick={choiseBlock}
                        // data-time={el.time}
                    >
                        <div
                            onMouseMove={handleMousePosition}
                            onMouseEnter={() => {
                                setIndOpened(el.id);
                                setIsOpened(true);
                            }}
                            onMouseLeave={() => setIsOpened(false)}
                            className={cnGraphHelp()}
                            ref={wrapperRef}
                            // data-tooltip-id={"line-brick-" + el.id}
                        ></div>
                        {/* <Tooltip
                            id={"line-brick-" + el.id}
                            place={"bottom-end"}
                            noArrow={true}
                            className={CN("tooltip")}
                            style={{ borderColor: el.color }}
                        >
                            <span className={CN("tooltip-text")}>
                                {convertTime(el.time)} {el.text}
                            </span>
                        </Tooltip> */}
                    </div>
                ))}
            </div>
            <div className={CN("time")}>{convertEnd}</div>
        </div>
    );
}
