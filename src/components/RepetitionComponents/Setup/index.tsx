import { Link, useNavigate } from "react-router-dom";
import RadioBtnQuestion from "../../RadioBtnQuestion";

import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactSVG } from "react-svg";
import note_icon from "./icons/note_icon.svg";
import list_tasks_icon from "./icons/list_tasks_icon.svg";
import setting_icon from "./icons/setting_icon.svg";
import video_time_icon from "./icons/video_time_icon.svg";
import record_start_icon from "./icons/record_start_icon.svg";
import arrow_left_icon from "./icons/arrowLeft.svg";
import Button from "../../ui-kit/Button";
import TimerRadioBtn from "../TimerRadioBtn";
import ListInput from "../ListInput";
import RoutesEnum from "../../../models/routes";
import { useState } from "react";
import {
    MAX_MINUTES_FOR_VIDEO,
    MIN_MINUTES_FOR_VIDEO,
} from "../../../constants";

export default function RecodingSetup() {
    const navigate = useNavigate();
    const styleSetup = cn("RecodingSetup");

    const [basicPlan, setBasicPlan] = useState<Array<string>>();
    const [timerSeconds, setTimerSecond] = useState<number>(
        0
    );

    const [timeValid, setTimeValid] = useState(true);

    const changeTimeValid = (value: boolean) => {
        setTimeValid(value);
    };

    const saveBasicPlane = (plan: string[]) => {
        setBasicPlan(plan);
    };

    const saveTimer = (value: number) => {
        setTimerSecond(value);
    };

    return (
        <div className={styleSetup()}>
            <div
                className={styleSetup("btn-back")}
                onClick={() => navigate(-1)}
            >
                <ReactSVG src={arrow_left_icon} />
                Назад
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
                <ListInput saveResultPlan={saveBasicPlane} />
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
                    Обратите внимание, что длительность репетиции должна
                    составлять не менее {MIN_MINUTES_FOR_VIDEO} минут и не
                    более {MAX_MINUTES_FOR_VIDEO} минут.
                </div>
                <TimerRadioBtn
                    setTimerSeconds={saveTimer}
                    setTimeIsValid={changeTimeValid}
                />
            </div>

            <div className={styleSetup("btn-block")}>
                <Button
                    className={styleSetup("btn-block-btn", {
                        nonclickable: !timeValid,
                    })}
                    onClick={() => {
                        if (timeValid)
                            navigate(RoutesEnum.RECODING, {
                                state: {
                                    basicPlan,
                                    timerSeconds,
                                },
                            });
                    }}
                >
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
