import { useState } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { ReactSVG } from "react-svg";

type Props = {
    icon?: string;
    text?: string;
};
export default function RecommendationDairyGraph(props: Props) {
    const cnRec = cn("Recommend");
    const stateBtn = ["Свернуть", "Развернуть"];
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={cnRec()}>
            <div className={cnRec("header")}>
                <div className={cnRec("nameIcon")}>
                    {props.icon && (
                        <ReactSVG src={props.icon} className={cnRec("icon")} />
                    )}
                    <span className={cnRec("title")}>Рекомендации</span>
                </div>
                <span
                    onClick={() => setIsShow((prev) => !prev)}
                    className={cnRec("btn")}
                >
                    {isShow ? stateBtn[0] : stateBtn[1]}
                </span>
            </div>
            {isShow && (
                <div className={cnRec("content")}>
                    {/* сюда надо вставить от БЕ возврат когда будет */}
                    <div className={cnRec("text")}>
                        {
                            "За рассматриваемый период Ваш общий результат подготовки к публичному выступлению не изменился. "
                        }
                    </div>
                    {/* сюда надо вставить от БЕ возврат когда будет */}
                    <div className={cnRec("text1")}>
                        {
                            "Возможно это связано с отсутствием репетиций (Возможно это связано с отсутствием статистики по Вашим репетициям)."
                        }
                    </div>
                    {/* сюда надо вставить от БЕ возврат когда будет */}
                </div>
            )}
        </div>
    );
}
