import { cn } from "@bem-react/classname";
import "./style.scss";

const CN = cn("graph-pointer");

type Props = {
    left?: number;
    text?: string;
    offsetX?: number;
    offsetY?: number;
};

export default function GraphPointer({
    offsetY = 0,

    left = 0,
    text = "00:00",
}: Props) {
    return (
        <div
            className={CN()}
            style={{
                left: `${left}%`,
                height: "calc(100% + 25px",
                top: `${offsetY}px`,
            }}

            // --------------- было в предыдущей версии --------------
            // style={{ left: `${left + offset}px`, height: "calc(100% + 25px" }}
        >
            {/* <div className={CN()} style={{ left: `0px` }}> */}
            <div className={CN("stick")}>
                <div className={CN("title")}>{text}</div>
            </div>
        </div>
    );
}
