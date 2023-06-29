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
export default function StatsGraph({ data }: Props) {
    return (
        <StatsLineGraph
            items={data.map((x) => ({ [X]: x.value }))}
            colors={{ [X]: GraphColor.BLUE }}
            descriptionX={createXDescriptionFromData(data)}
            descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            range={{ min: 0, max: 1 }}
            withMedian={false}
            visible={false}
            // data={data}
        />
    );
}
