import { cn } from "@bem-react/classname";
import { ConfidenceDataItem } from "../../../models/graph/confidence";

import { convertConfidenceArr, convertTime } from "../../Analytics/helpers";
import "./style.scss";

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
    const convertStart = convertTime(startTime);
    const convertEnd = convertTime(endTime);
    const convertArr = convertConfidenceArr(items);
    return (
        <div className={CN()}>
            <div className={CN("time")}>{convertStart}</div>
            <div className={CN("block")}>
                {convertArr.map((el, ind) => (
                    <div
                        key={ind}
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
                    </div>
                ))}
            </div>
            <div className={CN("time")}>{convertEnd}</div>
        </div>
    );
}
