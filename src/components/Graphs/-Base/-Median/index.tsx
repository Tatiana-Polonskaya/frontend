import { cn } from "@bem-react/classname";

import "./style.scss";
import { Fragment } from "react";
import { Tooltip } from "react-tooltip";

const CN = cn("graph-median");

type Props = { top?: string; tooltip?: boolean; average?: number };

// export default function GraphMedian({ top, tooltip = true }: Props) {
export default function GraphMedian({ top, average, tooltip = false }: Props) {
    return tooltip ? (
        <Fragment>
            <div
                className={CN()}
                style={{ top }}
                data-tooltip-id="average-tooltip"
            />
            <Tooltip
                id={"average-tooltip"}
                place={"top-start"}
                noArrow={true}
                className={CN("tooltip")}
            >
                {"Среднее значение уверенности: "}
                <span className={CN("tooltip-bold")}>
                    {((100 - average!) / 100).toFixed(2)}
                </span>
            </Tooltip>
        </Fragment>
    ) : (
        <div
            className={CN()}
            style={{ top }}
            onMouseEnter={() => console.log("focus")}
        />
    );
}
