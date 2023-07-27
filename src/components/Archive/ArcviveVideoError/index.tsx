import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactSVG } from "react-svg";
import Close from "./icon/close-square.svg";

type Props = {
    citation?: string;
    advice?: string;
    text?: string;
    tariff?: boolean;
};

export default function ArchiveVideoError({
    citation = "Ошибка!",
    advice = "Пожалуйста, повторите данную репетицию заново.",
    text = "Обращаем внимание, что эта попытка не будет списана с вашего счета.",
    tariff = true,
}: Props) {
    const cnArchiveVideoError = cn("video-error");

    return (
        <div className={cnArchiveVideoError()}>
            <div className={cnArchiveVideoError("title")}>
                <ReactSVG src={Close} />
                <span>{citation}</span>
            </div>
            <div className={cnArchiveVideoError("subtitle")}>{advice}</div>
            {tariff && (
                <div className={cnArchiveVideoError("text")}>{text}</div>
            )}
        </div>
    );
}
