import { cn } from "@bem-react/classname";

import GraphHelp from "../../-Help";

import "./style.scss";

import { Tooltip } from "react-tooltip";

type Props = {
    id?: number;
    top?: string;
    left?: string;
    type?: "thin" | "solid" | "line";
    width?: string;
    color?: string;
    text?: string;
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
}: Props) {
    return (
        <>
            <div
                style={{ top, width, left, backgroundColor }}
                className={CN({ [type]: true })}
                data-tooltip-id={"brick-" + id}
            >
                {/* <GraphHelp content={text} relative color={backgroundColor} /> */}
            </div>
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
