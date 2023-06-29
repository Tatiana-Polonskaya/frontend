import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@bem-react/classname";
import { GraphContext, _1SEC_PX } from "./helpers";

import BaseGraphXDescription from "./../-XDescription";
import BaseGraphBackground from "./../-Background";

import "./style.scss";

const cnStrangeGraph = cn("strange-graph-stats");

type Props = {
    descriptionX?: string[] | number[];
    descriptionY?: string[] | number[];
    selectedX?: number;
    visible?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function GraphBaseStats({
    className,
    descriptionX,
    descriptionY,
    selectedX,
    visible = true,
    ...props
}: Props) {
    return (
        <div className={cnStrangeGraph()} {...props}>
            {visible && (
                <div className={cnStrangeGraph("description")}>
                    <p className={cnStrangeGraph("title")}>
                        {"Статистика еще не доступна!"}
                    </p>
                    <p className={cnStrangeGraph("subtitle")}>
                        {
                            "Начните загружать видео на сервис и уже через неделю здесь появятся первые результаты!"
                        }
                    </p>
                </div>
            )}
            <div className={cnStrangeGraph("wrapper")}>
                <div
                    className={cnStrangeGraph("graph", {})}
                    style={{
                        width: `${(descriptionX?.length || 0) * 71.9}px`,
                    }}
                >
                    {/* херня с  сеткой */}
                    <BaseGraphBackground
                        sectionsVert={descriptionX?.length}
                        sectionsHorz={descriptionY?.length}
                        stats={"st"}
                    />
                    {props.children}
                </div>
            </div>
            <div className={cnStrangeGraph("description-y")}>
                <BaseGraphXDescription
                    data={descriptionX}
                    // selected={Math.floor(currentTime / 10)}
                    selected={descriptionX!.length - 1}
                    stats={"st"}
                />
            </div>
        </div>
    );
}
