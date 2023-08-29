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
import { GraphContext, _1SEC_PX } from "./helpers";

import BaseGraphYDescription from "./-YDescription";
import BaseGraphXDescription from "./-XDescription";
import BaseGraphBackground from "./-Background";
import GraphPointer from "./-Pointer";

import "./style.scss";
import { VideoTimeContext } from "../../Context/helpers";

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
    // если ставить обычный useState а не кастомный то цепляет график
    const { currentTime, setCurrentTime } = useContext(VideoTimeContext);
    // const [currentTime, setCurrentTime] = useState(0);
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
            /// currentTime changes from external context
            setPointerX(currentTime * _1SEC_PX);
        }
    }, [currentTime]);
    useEffect(() => {
        if (isPointerMoving) {
            /// isPointerMoving changes inside of the component
            // console.log(currentTime);
            const time = Math.floor(pointerX / _1SEC_PX);
            setCurrentTime(time);
            updateTime(time);
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
            {/* тут устанавливается положение и время в поинтер */}
            {/* надо подогнать _1SEC_PX*/}
            <GraphPointer
                offset={18}
                left={pointerX}
                text={new Date(currentTime * 1000)
                    .toISOString()
                    .substring(14, 19)}
            />
            <div className={cnStrangeGraph("description-y")}>
                {/* снизу выбор текущего времени */}
                <BaseGraphXDescription
                    data={descriptionX}
                    selected={Math.floor(currentTime / 10)}
                    stats={""}
                />
            </div>
        </div>
    );
}
