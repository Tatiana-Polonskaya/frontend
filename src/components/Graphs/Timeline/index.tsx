import { cn } from "@bem-react/classname";

import GraphHelp from "../-Base/-Help";
import GraphColor from "../../../models/graph/_colors";

import "./style.scss";
import { TimelineItem } from "../../../models/graph/timeline";

const CN = cn("timeline-graph");

type Props = {
    startTime?: string;
    endTime?: string;
    data: TimelineItem[];
};

export default function TimelineGraph({
    startTime = "00:00",
    endTime = "00:00",
    data,
}: Props) {
    return (
        <div className={CN()}>
            <div className={CN("time")}>{startTime}</div>
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
            <div className={CN("time")}>{endTime}</div>
        </div>
    );
}
