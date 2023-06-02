import { cn } from "@bem-react/classname";
import "./style.scss";

const CN = cn("graph-pointer");

type Props = { left?: number; text?: string; offset?: number };

export default function GraphPointer({
    offset = 0,
    left = 0,
    text = "00:00",
}: Props) {
    return (
        <div className={CN()} style={{ left: `${left + offset}px` }}>
            <div className={CN("title")}>{text}</div>
            <div className={CN("stick")}></div>
        </div>
    );
}
