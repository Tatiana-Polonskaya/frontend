import { useNavigate } from "react-router-dom";
import RadioBtnQuestion from "../../RadioBtnQuestion";

import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactSVG } from "react-svg";
import note_icon from "./icons/note_icon.svg";
import list_tasks_icon from "./icons/list_tasks_icon.svg";
import setting_icon from "./icons/setting_icon.svg";
import video_time_icon from "./icons/video_time_icon.svg";
import record_start_icon from "./icons/record_start_icon.svg";
import Button from "../../ui-kit/Button";
import TimerRadioBtn from "../TimerRadioBtn";
import ListInput from "../ListInput";
import RoutesEnum from "../../../models/routes";
// type Props = {
//     question: Question;
//     addAnswers: Function;
//     addAnotherAnswers: Function;
// };

// type Question = {
//     id: number;
//     title: string;
//     answers: Answer[];
//     block_another?: boolean;
//     placeholder_another?: string;
//     icons?: boolean;
//     type?: string;
//     type_answer?: string;
// };

export default function RecodingSetup() {
    const navigate = useNavigate();
    const styleSetup = cn("RecodingSetup");

    return (
        <div className={styleSetup()}>
            <div
                className={styleSetup("btn-back")}
                onClick={() => navigate(-1)}
            >
                ◂ Назад
            </div>
            <div className={styleSetup("text-header")}>
                <ReactSVG src={note_icon} className={styleSetup("svg-big")} />
                Сопроводительные материалы
            </div>
            <div className={styleSetup("block")}>
                <div className={styleSetup("text-row")}>
                    <ReactSVG
                        src={list_tasks_icon}
                        className={styleSetup("svg-small")}
                    />
                    Опорный план
                </div>
                <div className={styleSetup("text-grey")}>
                    Вы будете видеть опорный план речи выступления во время
                    репетиции.
                </div>
               <ListInput/>
            </div>

            <div className={styleSetup("text-header")}>
                <ReactSVG
                    src={setting_icon}
                    className={styleSetup("svg-big")}
                />
                Настройки
            </div>
            
            <div className={styleSetup("block")}>
                <div className={styleSetup("text-row")}>
                    <ReactSVG
                        src={video_time_icon}
                        className={styleSetup("svg-small")}
                    />
                    Время выступления
                </div>
                <div className={styleSetup("text-grey")}>
                    Боитесь не уложиться во время? Установите таймер, чтобы
                    понимать, сколько времени на окончание выступления у вас
                    осталось.
                </div>
                <div className={styleSetup("text-blue")}>
                    Обратите внимание, что максимальная длительность репетиции
                    составляет 15 минут.
                </div>
                <TimerRadioBtn />
            </div>

            <div className={styleSetup("btn-block")}>
                <Button className={styleSetup("btn-block-btn")}  onClick={ () => navigate(RoutesEnum.RECODING)}>
                    <ReactSVG
                        src={record_start_icon}
                        className={styleSetup("svg-small")}
                    />
                    Начать запись
                </Button>
            </div>
        </div>
    );
}
