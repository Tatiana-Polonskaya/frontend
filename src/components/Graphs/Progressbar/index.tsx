import React from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";

type Props = {
    bgcolor: string;
    completed: number;
};

export default function ProgressBar(props: Props) {

    const cnProgressBar = cn("ProgressBar");

    const { bgcolor, completed } = props;

    return (
        <div className={cnProgressBar()}>
            <div
                className={cnProgressBar("line")}
                style={
                    {
                        "--value_line": (completed+"%"),
                        "--color_line": bgcolor,
                    } as React.CSSProperties
                }
            >
            </div>
        </div>
    );
}
