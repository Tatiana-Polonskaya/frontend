import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@bem-react/classname";
import { GraphContext, _1SEC_PX } from "./helpers";

import BaseGraphXDescription from "./../-XDescription";
import BaseGraphBackground from "./../-Background";

import "./style.scss";
import Good from "./icons/good.svg";
import Bad from "./icons/bad.svg";
import Perfect from "./icons/perfect.svg";
import Terrible from "./icons/terrible.svg";
import Average from "./icons/average.svg";
import Ellipse from "./icons/Ellipse50.svg";

import { ReactSVG } from "react-svg";

const cnStrangeGraph = cn("strange-graph-stats");

type Props = {
    descriptionX?: string[] | number[];
    descriptionY?: string[] | number[];
    items: Record<string, number>[];
    selectedX?: number;
    visible?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function GraphBaseStats({
    className,
    items,
    descriptionX,
    descriptionY,
    selectedX,
    visible = true,
    ...props
}: Props) {
    // console.log(items);
    const frameArr = [Terrible, Bad, Average, Good, Perfect, Ellipse];

    const frameHelper = (value: number) => {
        if (value === -1) {
            return frameArr[5];
        } else if (value === 1) {
            return frameArr[4];
        } else return frameArr[Math.floor((value * 100) / 20)];
    };
    return (
        <div className={cnStrangeGraph()} {...props}>
            {visible && (
                <div className={cnStrangeGraph("description")}>
                    <p className={cnStrangeGraph("title")}>
                        {"Статистика еще не доступна!"}
                    </p>
                    <p className={cnStrangeGraph("subtitle")}>
                        {
                            "Начните загружать видео, учитывать их в статистике и уже через неделю здесь появятся первые результаты!"
                        }
                    </p>
                </div>
            )}
            <div className={cnStrangeGraph("wrapper")}>
                <div>
                    {items.map((el, ind) =>
                        ind !== 0 ? (
                            <div
                                key={ind}
                                className={cnStrangeGraph("frame")}
                                style={{
                                    top: `${
                                        190 - (34 * (el.value * 100)) / 20
                                    }px`,

                                    right: `calc(${12.5 * (8 - ind)}% +  ${
                                        (50 / 8) * (8 - ind)
                                    }px)`,
                                    transform: "translate(50%, -50%)",
                                }}
                            >
                                <ReactSVG src={frameHelper(el.prev)} />
                            </div>
                        ) : (
                            undefined
                        )
                    )}
                </div>
                {props.children}
                <div className={cnStrangeGraph("description-y")}>
                    <BaseGraphXDescription
                        data={descriptionX}
                        selected={descriptionX!.length - 2}
                        stats={"st"}
                    />
                </div>
            </div>
        </div>
    );
}
