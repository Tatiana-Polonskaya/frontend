import { cn } from "@bem-react/classname";

import "./style.scss";

const CN = cn("graph-median");

type Props = { top?: string };

export default function GraphMedian({ top }: Props) {
    return <div className={CN()} style={{ top }} />;
}
