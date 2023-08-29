import { cn } from "@bem-react/classname";
import { ConfidenceDataItem } from "../../../models/graph/confidence";

import { convertConfidenceArr } from "../../Analytics/helpers";
import "./style.scss";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";
import { Fragment } from "react";
import { Tooltip } from "react-tooltip";

const CN = cn("confidence-line");

type Props = {
    items: ConfidenceDataItem[];
    startTime: number;
    endTime: number;
};

export default function ConfidenceLineGraph({
    items,
    startTime = 100,
    endTime = 100,
}: Props) {
    const convertStart = convertSecondsIntoTime(startTime);
    const convertEnd = convertSecondsIntoTime(endTime);
    const convertArr = convertConfidenceArr(items);
    return (
        <div className={CN()}>
            <div className={CN("time")}>{convertStart}</div>
            <div className={CN("block")}>
                {convertArr.map((el, ind) => (
                    <Fragment key={ind}>
                        <div
                            className={CN("element")}
                            style={{
                                width: `${(el.width / items.length) * 100}%`,
                            }}
                        >
                            <div
                                className={CN("element-position")}
                                style={{
                                    backgroundColor: el.color,
                                    top: el.position,
                                }}
                                data-tooltip-id={"confidence-brick-" + ind}
                            >
                                {/* <div
                                className={CN("help-content")}
                                style={{
                                    top: "20px",
                                    left: "0px",
                                }}
                            >
                                <div
                                    style={{
                                        borderColor: el.color,
                                    }}
                                >
                                    {el.desc}
                                </div>
                            </div> */}
                            </div>
                            {el.desc && (
                                <Tooltip
                                    id={"confidence-brick-" + ind}
                                    place={"bottom"}
                                    noArrow={true}
                                    className={CN("tooltip")}
                                    style={
                                        {
                                            "--color_border": el.color,
                                        } as React.CSSProperties
                                    }
                                >
                                    {el.desc}
                                </Tooltip>
                            )}
                        </div>
                    </Fragment>
                ))}
            </div>
            <div className={CN("time")}>{convertEnd}</div>
        </div>
    );
}
