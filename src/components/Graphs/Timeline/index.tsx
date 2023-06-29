import { cn } from "@bem-react/classname";
import GraphHelp from "../-Base/-Help";
import GraphColor from "../../../models/graph/_colors";

import "./style.scss";
import { convertTime } from "../../Analytics/helpers";
// import { TimelineItem } from "../../../models/graph/timeline";

const CN = cn("timeline-graph");

type Props = {
    startTime?: number;
    endTime?: number;
    data: TimelineItem[];
};

type TimelineItem = {
    id?: number;
    text?: string;
    time?: number;
    color?: string;
};
export default function TimelineGraph({
    startTime = 0,
    endTime = 0,
    data,
}: Props) {
    const convertStart = convertTime(startTime);
    const convertEnd = convertTime(endTime);
    return (
        <div className={CN()}>
            <div className={CN("time")}>{convertStart}</div>
            <div className={CN("body")}>
                {data.map((el) => (
                    <div
                        key={el.id}
                        style={{ backgroundColor: el.color || GraphColor.GRAY }}
                        className={CN("element")}
                    >
                        <GraphHelp
                            content={
                                <div>
                                    <span
                                        className={CN("help", {
                                            time: true,
                                        })}
                                    >
                                        {el.time}
                                    </span>
                                    <span>{el.text}</span>
                                </div>
                            }
                            color={el.color}
                        />
                    </div>
                ))}
            </div>
            <div className={CN("time")}>{convertEnd}</div>
        </div>
    );
}
