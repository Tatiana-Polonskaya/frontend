import { cn } from "@bem-react/classname";

import "./style.scss";

import TimelineGraph from "../../../../../Graphs/Timeline";

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

const cnProgressLine = cn("progress-time-line");

export default function MainDefinition(props: Props) {
    return (
        <div className={cnProgressLine()}>
            <TimelineGraph
                data={props.data}
                startTime={props.startTime}
                endTime={props.endTime}
            />
        </div>
    );
}
