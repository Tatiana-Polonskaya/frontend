import { cn } from "@bem-react/classname";
import { ReactNode, useState } from "react";

import "./style.scss";
import { ValueTime } from "../helpers";

type Props = {
    name?: string;
    block?: ReactNode;
};
const cnBlock = cn("analitics-block");

const ValueTimeProvider = ({ children }: any) => {
    const [currentTime, setCurrentTime] = useState(0);
    const updateTime = (v: any) => {
        setCurrentTime(v);
    };
    return (
        <ValueTime.Provider
            value={{
                currentTime,
                updateTime,
                setCurrentTime,
            }}
        >
            {children}
        </ValueTime.Provider>
    );
};
export default function AnalyticsBlock(props: Props) {
    return (
        // прокидывать колбеком
        <div className={`${cnBlock()}`}>
            <ValueTimeProvider>{props.block}</ValueTimeProvider>
        </div>
    );
}
