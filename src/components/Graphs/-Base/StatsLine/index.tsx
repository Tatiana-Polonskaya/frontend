import { Fragment, ReactNode } from "react";
import {
    ResponsiveContainer,
    Area,
    AreaChart,
    Tooltip,
    XAxis,
    CartesianGrid,
    YAxis,
    Text,
    LineChart,
    Line,
} from "recharts";
import { cn } from "@bem-react/classname";

import GraphBase from "..";

import "./style.scss";
import { StatsDataItem } from "../../../../models/graph/stats";
import GraphBaseStats from "../Stats";

const CN = cn("stats-line-graph");

type Props = {
    withMedian?: boolean;
    visible?: boolean;
    descriptionX?: string[];
    descriptionY?: string[] | number[];
    background?: ReactNode;
    items: Record<string, number>[];
    colors?: Record<string, string>;
    range?: { min: number; max: number };
    data?: StatsDataItem[];
};

export default function StatsLineGraph({
    descriptionX,
    descriptionY = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1],
    withMedian = true,
    visible = true,
    items,
    colors,
    range,
}: // data,
Props) {
    return (
        // <AreaChart
        //     width={1248}
        //     height={250}
        //     data={data}
        //     margin={{
        //         top: 0,
        //         right: 0,
        //         bottom: 0,
        //         left: 0,
        //     }}
        // >
        //     <defs>
        //         <linearGradient id="colorUv" x1="0" y1="0.6" x2="0" y2="0">
        //             <stop offset="5%" stopColor="#084CA5" stopOpacity={0.8} />
        //             <stop offset="95%" stopColor="#084CA5" stopOpacity={0} />
        //         </linearGradient>
        //     </defs>
        // {/* <XAxis dataKey="date" /> */}
        // {/* <YAxis /> */}
        //
        <GraphBaseStats
            descriptionX={descriptionX}
            descriptionY={descriptionY}
            visible={true}
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
                className={CN("recharts-wrapper")}
            >
                {/* <LineChart data={items} margin={{ right: 60, left: 60 }}> */}
                <LineChart data={items} margin={{ right: 60 }}>
                    {Object.keys(items[0]).map((key) => (
                        <Fragment key={key}>
                            {range && (
                                <YAxis domain={[range.min, range.max]} hide />
                            )}
                            {visible && (
                                <Line
                                    type="linear"
                                    dataKey={key}
                                    // dot={false}
                                    dot={true}
                                    stroke={colors ? colors[key] : "#000"}
                                    strokeWidth={1}
                                    isAnimationActive={false}
                                />
                            )}
                        </Fragment>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </GraphBaseStats>
    );
}
