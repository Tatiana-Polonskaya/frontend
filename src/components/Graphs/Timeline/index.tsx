import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";

import "./style.scss";

import { useEffect, useRef, useState } from "react";
import { getWindowWidth } from "../../../tools/window";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";
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
    const convertStart = convertSecondsIntoTime(startTime);
    const convertEnd = convertSecondsIntoTime(endTime);

    const [, setIsOpened] = useState(false);
    const [, setIndOpened] = useState<number>();

    const [helpWidth, setHelpWidth] = useState(0);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const helpRef = useRef<HTMLDivElement>(null);
    const CN = cn("timeline-graph");
    const cnGraphHelp = cn("graph-help-line");

    const [, setRight] = useState("");

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
                        ></div>
                    </div>
                ))}
            </div>
            <div className={CN("time")}>{convertEnd}</div>
        </div>
    );
}
