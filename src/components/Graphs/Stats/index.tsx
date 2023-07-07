import { cn } from "@bem-react/classname";

import StatsLineGraph from "../-Base/StatsLine";
import GraphColor from "../../../models/graph/_colors";

import { createXDescriptionFromData } from "../-Base/helpers";
import { StatsDataItem } from "../../../models/graph/stats";

import "./style.scss";
import LineGraph from "../-Base/Line";

const CN = cn("stats-graph");

type Props = { data: StatsDataItem[] };

const X = "value";
const pX = "prev";
export default function StatsGraph({ data }: Props) {
    const restruction = () => {
        const arr: number[] = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].value !== null) {
                const cur = data[i].value as number;
                arr.push(cur);
            } else if (data[i - 1].value !== null) {
                const cur = data[i - 1].value as number;
                arr.push(cur);
            } else {
                const cur = 0;
                arr.push(cur);
            }
        }
        return arr;
    };
    return (
        <StatsLineGraph
            items={restruction().map((x, ind) => ({
                name: ind,
                [X]: x,
                [pX]:
                    data[ind].value === null ? -1 : (data[ind].value as number),
                vv: -0.3,
            }))}
            colors={{ [X]: GraphColor.BLUE }}
            descriptionX={createXDescriptionFromData(data)}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            withMedian={false}
            visible={restruction().length > 0 ? false : true}
            // data={data}
        />
    );
}
