import {
    DetailedHTMLProps,
    HTMLAttributes,
    MouseEventHandler,
    useContext,
    useEffect,
    useState,
} from "react";

import { cn } from "@bem-react/classname";
import { GraphContext, _1SEC_PX } from "./helpers";

import BaseGraphYDescription from "./-YDescription";
import BaseGraphXDescription from "./-XDescription";
import BaseGraphBackground from "./-Background";
import GraphPointer from "./-Pointer";

import "./style.scss";

const cnStrangeGraph = cn("strange-graph");

type Props = {
    descriptionX?: string[] | number[];
    descriptionY?: string[] | number[];
    selectedX?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function GraphBase({
    className,
    descriptionX,
    descriptionY,
    selectedX,
    ...props
}: Props) {
    const { currentTime, setCurrentTime } = useContext(GraphContext);
    const [isPointerMoving, setPointerMoving] = useState(false);
    const [pointerX, setPointerX] = useState(0);
    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isPointerMoving) {
            setPointerX((prev) => {
                const value = prev + e.movementX;
                return value > 0 ? value : 0;
            });
        }
    };
    useEffect(() => {
        if (!isPointerMoving) {
            /// currentTime changes from external context
            setPointerX(currentTime * _1SEC_PX);
        }
    }, [currentTime]);
    useEffect(() => {
        if (isPointerMoving) {
            /// isPointerMoving changes inside of the component
            const time = Math.floor(pointerX / _1SEC_PX);
            setCurrentTime(time);
        }
    }, [pointerX]);
    return (
        <div
            className={cnStrangeGraph()}
            style={{ cursor: isPointerMoving ? "col-resize" : "auto" }}
            onMouseDown={() => setPointerMoving(true)}
            onMouseUp={() => setPointerMoving(false)}
            onMouseLeave={() => setPointerMoving(false)}
            onMouseMove={onMouseMove}
            {...props}
        >
            <div className={cnStrangeGraph("wrapper")}>
                <BaseGraphYDescription data={descriptionY} />
                <div
                    className={cnStrangeGraph("graph", {
                        bordered: !!(descriptionX && descriptionY),
                    })}
                    style={{
                        width: `${(descriptionX?.length || 0) * 61.5}px`,
                    }}
                >
                    <BaseGraphBackground
                        sectionsVert={descriptionX?.length}
                        sectionsHorz={descriptionY?.length}
                        stats={""}
                    />
                    {props.children}
                </div>
            </div>
            <GraphPointer
                offset={17}
                left={pointerX}
                text={new Date(currentTime * 1000)
                    .toISOString()
                    .substring(14, 19)}
            />
            <div className={cnStrangeGraph("description-y")}>
                <BaseGraphXDescription
                    data={descriptionX}
                    selected={Math.floor(currentTime / 10)}
                    stats={""}
                />
            </div>
        </div>
    );
}
