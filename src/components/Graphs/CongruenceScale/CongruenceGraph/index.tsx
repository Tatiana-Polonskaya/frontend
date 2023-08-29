import { MouseEventHandler, useContext, useEffect, useState } from "react";
import GraphPointer from "../../-Base/-Pointer";
import { CongruenceItem } from "../../../../models/graph/congruence";
import ColumnChart from "../../СolumnСhart";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { VideoTimeContext } from "../../../Context/helpers";
import { ValueTime } from "../../../Analytics/helpers";
import { _1SEC_PX } from "../../-Base/helpers";
import convertSecondsIntoTime from "../../../../@adapters/Time/convertSeconds";

const CN = cn("CongruenceGraph");

type Props = {
    elements: CongruenceItem[];
};

// TODO TO DO: подумать, что сделать с ползунком времени, т.к. время должно быстрее меняться

export default function CongruenceGraph(props: Props) {
    const startTime = props.elements.at(0)!.time_start;
    const endTime = props.elements.at(-1)!.time_end;

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
    }, [currentTime]);

    useEffect(() => {
        if (isPointerMoving) {
            const time = Math.floor(pointerX / _1SEC_PX);
            setCurrentTime(time);
            updateTime(time);
        }
    }, [pointerX]);

    return (
        <div className={CN()} style={{
            cursor: isPointerMoving ? "col-resize" : "auto",
            height: "100%",
        }}
        onMouseDown={() => setPointerMoving(true)}
        onMouseUp={() => setPointerMoving(false)}
        onMouseLeave={() => setPointerMoving(false)}
        onMouseMove={onMouseMove}>
            <span className={CN("text")}>
                {convertSecondsIntoTime(startTime)}
            </span>
    
                <GraphPointer
                    offset={40}
                    left={pointerX}
                    text={new Date(currentTime * 1000)
                        .toISOString()
                        .substring(14, 19)}
                />
            

            <ColumnChart elements={props.elements} />
            <span className={CN("text")}>
                {convertSecondsIntoTime(endTime)}
            </span>
        </div>
    );
}
