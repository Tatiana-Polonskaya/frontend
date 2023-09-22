import {
    DetailedHTMLProps,
    HTMLAttributes,
    MouseEventHandler,
    useContext,
    useEffect,
    useState,
} from "react";

import { ValueTime } from "../../Analytics/helpers";
import { cn } from "@bem-react/classname";
import { _1SEC_PX } from "./helpers";

import BaseGraphYDescription from "./-YDescription";
import BaseGraphXDescription from "./-XDescription";
import BaseGraphBackground from "./-Background";
import GraphPointer from "./-Pointer";

import "./style.scss";
import { VideoTimeContext } from "../../Context/helpers";
import { convertTime } from "../../Archive/helpers";

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
    const { currentTime, setCurrentTime } = useContext(VideoTimeContext);
    const [isPointerMoving, setPointerMoving] = useState(false);
    const [pointerX, setPointerX] = useState(0);
    const { updateTime } = useContext(ValueTime);

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
            setPointerX(currentTime * _1SEC_PX);
        }
    }, [currentTime, isPointerMoving]);
    useEffect(() => {
        if (isPointerMoving) {
            const time = Math.floor(pointerX / _1SEC_PX);
            setCurrentTime(time);
            updateTime(time);
        }
    }, [isPointerMoving, pointerX, setCurrentTime, updateTime]);
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
                        width: `${(descriptionX?.length || 0) * 62}px`,
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
                offset={40}
                left={pointerX}
                text={convertTime(currentTime)}
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
