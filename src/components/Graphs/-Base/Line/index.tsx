import { Fragment, ReactNode } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { cn } from "@bem-react/classname";

import GraphMedian from "../-Median";
import GraphBase from "..";

import "./style.scss";

const CN = cn("line-graph");

type Props = {
    withMedian?: boolean;
    descriptionX?: string[];
    descriptionY?: string[] | number[];
    background?: ReactNode;
    items: Record<string, number>[];
    colors?: Record<string, string>;
    range?: { min: number; max: number };
};

export default function LineGraph({
    descriptionX,
    descriptionY = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1],
    withMedian = true,
    items,
    colors,
    background,
    range,
}: Props) {
    return (
        <GraphBase descriptionX={descriptionX} descriptionY={descriptionY}>
            {withMedian && <GraphMedian top="50%" />}
            <div className={CN("background")}>{background}</div>
            <ResponsiveContainer
                width="100%"
                height="100%"
                className={CN("recharts-wrapper")}
            >
                <LineChart data={items} margin={{ right: 60 }}>
                    {Object.keys(items[0]).map((key) => (
                        <Fragment key={key}>
                            {range && (
                                <YAxis domain={[range.min, range.max]} hide />
                            )}
                            <Line
                                type="linear"
                                dataKey={key}
                                // dot={false}
                                dot={true}
                                stroke={colors ? colors[key] : "#000"}
                                strokeWidth={1}
                                isAnimationActive={false}
                            />
                        </Fragment>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </GraphBase>
    );
}
