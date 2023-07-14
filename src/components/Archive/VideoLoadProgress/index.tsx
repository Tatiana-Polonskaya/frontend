import { cn } from "@bem-react/classname";
import "./style.scss";

type Props = {
    citation?: string;
    advice?: string;
    percent?: number;
};

export default function VideoLoadProgress({
    citation = "Идет анализ видео...",
    advice = "Какие-то советики",
    percent = 33,
}: Props) {
    const cnVideoLoadProgress = cn("load-progress");

    return (
        <div className={cnVideoLoadProgress()}>
            <div className={cnVideoLoadProgress("title")}>{citation}</div>
            <div className={cnVideoLoadProgress("subtitle")}>{advice}</div>
            <div className={cnVideoLoadProgress("bar")}>
                <div
                    className={cnVideoLoadProgress("bar-fill")}
                    style={{ width: `${percent}%` }}
                ></div>
                {"Прогресс панелька"}
            </div>
        </div>
    );
}
