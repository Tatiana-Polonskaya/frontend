import { cn } from "@bem-react/classname";

import GraphHelp from "../../-Help";

import "./style.scss";

type Props = {
    top?: string;
    left?: string;
    type?: "thin" | "solid" | "line";
    width?: string;
    color?: string;
    text?: string;
};

const CN = cn("bricked-graph-brick");

export default function SecondBrick({
    top,
    left,
    color: backgroundColor,
    type = "solid",
    width = "50px",
    text,
}: Props) {
    return (
        <div
            style={{ top, width, left, backgroundColor }}
            className={CN({ [type]: true })}
        >
            <GraphHelp content={text} relative color={backgroundColor} />
        </div>
    );
}
