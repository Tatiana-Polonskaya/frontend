import React from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";

type Props = {
    bgcolor?: string;
    completed: number;
    maxValue?: number;
};

export default function ProgressBar({
    bgcolor = "rgb(36, 119, 244)",
    completed,
    maxValue = 100,
}: Props) {
    const cnProgressBar = cn("ProgressBar");

    return (
        <div className={cnProgressBar()}>
            <div
                className={cnProgressBar("line")}
                style={
                    {
                        "--value_line":
                            completed >= maxValue
                                ? "100%"
                                : (completed * 100) / maxValue + "%",
                        "--color_line": bgcolor,
                        "--border_radius": "50px 0 0 50px",
                    } as React.CSSProperties
                }
            ></div>
        </div>
    );
}
