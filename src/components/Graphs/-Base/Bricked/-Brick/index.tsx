import { cn } from "@bem-react/classname";
import { useContext } from "react";

import GraphHelp from "../../-Help";

import "./style.scss";

import { Tooltip } from "react-tooltip";
import { VideoTimeContext } from "../../../../Context/helpers";

type Props = {
    id?: number;
    top?: string;
    left?: string;
    type?: "thin" | "solid" | "line";
    width?: string;
    color?: string;
    text?: string;
    time?: number;
};

const CN = cn("bricked-graph-brick");

export default function SecondBrick({
    id = 0,
    top,
    left,
    color: backgroundColor,
    type = "solid",
    width = "50px",
    text,
    time,
}: Props) {
    const { setCurrentTime } = useContext(VideoTimeContext);

    const choiseBlock = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataValue = +event.currentTarget.dataset.time! as number;

        if (dataValue || dataValue === 0) {
            setCurrentTime(dataValue);
        }
    };

    return (
        <>
            <div
                style={{ top, width, left, backgroundColor }}
                className={CN({ [type]: true })}
                data-tooltip-id={"brick-" + id}
                onDoubleClick={choiseBlock}
                data-time={time}
            ></div>
            <Tooltip
                id={"brick-" + id}
                place={"bottom-end"}
                noArrow={true}
                className={CN("tooltip")}
                style={{ borderColor: backgroundColor }}
            >
                <span className={CN("tooltip-text")}>{text}</span>
            </Tooltip>
        </>
    );
}
