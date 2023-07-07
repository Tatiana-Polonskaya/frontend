import { Fragment, ReactNode } from "react";
import {
    ResponsiveContainer,
    Area,
    XAxis,
    CartesianGrid,
    YAxis,
    ComposedChart,
    LabelList,
    Label,
} from "recharts";
import { cn } from "@bem-react/classname";

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
    const size = [0, 1];
    console.log(items);
    return (
        <div className={CN()}>
            <GraphBaseStats
                items={items}
                descriptionX={descriptionX}
                descriptionY={descriptionY}
                visible={visible}
            >
                <ResponsiveContainer
                    width="100%"
                    height={230}
                    className={CN("recharts-wrapper")}
                >
                    {/* <AreaChart */}
                    <ComposedChart
                        style={{ outline: "none", background: "#F7FAFF" }}
                        data={items}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#2477F4"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#2477F4"
                                    stopOpacity={1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 3" />
                        <XAxis
                            type="number"
                            dataKey="name"
                            domain={[1, 8]}
                            padding={{ left: -50 }}
                            tickCount={9}
                            height={0}
                        />
                        <YAxis
                            allowDataOverflow={true}
                            type="number"
                            domain={[...size]}
                            padding={{ bottom: 40, top: 20 }}
                            tickCount={6}
                            width={0}
                        />
                        {/*  добавить в area label={<CustomizedLabel />} */}
                        {!visible && (
                            <Area
                                dataKey="value"
                                stroke="#084CA5"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                        )}
                        {!visible && (
                            <Area
                                dataKey="vv"
                                stroke="#084CA5"
                                fillOpacity={1}
                                fill="#2477F4"
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </GraphBaseStats>
        </div>
    );
}
