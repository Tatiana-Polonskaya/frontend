import "./style.scss";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import { IDescriptionScale } from "../../../models/graph/inteface/IDescriptionScale";
import convertSecondsIntoTime from "../../../@adapters/Time/convertSeconds";
import GraphSecondPointer from "../-Base/-SecondPointer";
import { useContext, useState, useRef, useEffect } from "react";
import { ValueTime } from "../../Analytics/helpers";
import { VideoTimeContext } from "../../Context/helpers";
import { convertTime } from "../../Archive/helpers";

const CN = cn("Scale");
interface IComponentProps {
    fractions: IDescriptionScale[];
    endTime?: number;
    hasPointer?: boolean;
}

export default function Scale({
    fractions,
    endTime,
    hasPointer = false,
}: IComponentProps) {
    
    const timeEnd = endTime;

    const { currentTime, setCurrentTime } = useContext(VideoTimeContext);
    const [isPointerMoving, setPointerMoving] = useState(false);
    const { updateTime } = useContext(ValueTime);

    const sliderRef = useRef<HTMLDivElement>(null);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (sliderRef.current) {
                const sliderWidth = sliderRef.current.offsetWidth;
                const offsetX =
                    event.pageX - sliderRef.current.offsetLeft - 176;
                const newValue = (offsetX / sliderWidth) * 100;
                setSliderValue(newValue);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        if (sliderRef.current) {
            const currentSliderRef = sliderRef.current;

            currentSliderRef.addEventListener("mousedown", () => {
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            });

            return () => {
                currentSliderRef.removeEventListener("mousedown", () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                });
            };
        }
    }, []);

    // время

    const choiseBlock = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataValue = +event.currentTarget.dataset.time! as number;

        if (dataValue || dataValue === 0) {
            setCurrentTime(dataValue);
        }
    };

    useEffect(() => {
        if (isPointerMoving) {
            const time = Math.round((timeEnd! * sliderValue) / 100);
            setCurrentTime(time);
            updateTime(time);
        }
    }, [sliderValue]);

    useEffect(() => {
        if (!isPointerMoving) {
            setSliderValue((currentTime / timeEnd!) * 100);
            console.log("setSliderValue", (currentTime / timeEnd!) * 100);
        }
    }, [currentTime]);

    return (
        <div
            className={CN()}
            ref={sliderRef}
            onMouseDown={() => setPointerMoving(true)}
            onMouseUp={() => setPointerMoving(false)}
            onMouseLeave={() => setPointerMoving(false)}
        >
            {hasPointer && (
                <GraphSecondPointer
                    offsetX={-25}
                    offsetY={-24}
                    left={
                        sliderValue > 100
                            ? 100
                            : sliderValue <= 0
                            ? 0
                            : sliderValue
                    }
                    // переделать получение времени
                    text={convertTime(currentTime)}
                />
            )}
            <div className={CN("wrapper")}>
                {fractions.map((number, idx) => (
                    <div
                        key={idx}
                        className={CN("content")}
                        style={{
                            backgroundColor: number.color,
                            color:
                                number.color === GraphColor.GRAY
                                    ? "#7C8EB5"
                                    : GraphColor.WHITE,
                            width: number.value + "%",
                        }}
                    >
                        <div
                            className={CN("text", {
                                unvisible: number.value < 15,
                            })}
                        >
                            {number.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
