import { cn } from "@bem-react/classname";

import "./style.scss";
import RadioItem from "../../RadioBtnQuestion/RadioItem";
import { Fragment, useEffect, useRef, useState } from "react";
import {
    MAX_MINUTES_FOR_VIDEO,
    MIN_MINUTES_FOR_VIDEO,
} from "../../../constants";

const cnTimerRadioBtn = cn("TimerRadioBtn");

const choices = [
    {
        id: 0,
        title: "Без таймера",
        value: false,
    },
    {
        id: 1,
        title: "Таймер обратного отчета",
        value: true,
    },
];

type Props = {
    setTimerSeconds: Function;
    setTimeIsValid: Function;
};

//MIN_MINUTES_FOR_VIDEO * 60,

export default function TimerRadioBtn(props: Props) {
    const [curentChoice, setCurrentChoice] = useState<number>(0);

    const addAnswers = (idChoice: number) => {
        setCurrentChoice(idChoice);

        if (choices.filter((el) => el.id === idChoice)!.at(0)!.value) {
            props.setTimerSeconds(MIN_MINUTES_FOR_VIDEO * 60);
        } else {
            props.setTimerSeconds(0);
        }
    };

    const minRef = useRef<HTMLInputElement>(null);
    const secRef = useRef<HTMLInputElement>(null);

    const [isValidMin, setIsValidMin] = useState(true);
    const [isValidSec, setIsValidSec] = useState(true);

    const change = () => {
        if (secRef.current && minRef.current) {
            const minNumber = Number(minRef.current.value);
            const secNumber = Number(secRef.current.value);

            if (minNumber === MAX_MINUTES_FOR_VIDEO) {
                setIsValidSec(secNumber === 0 ? true : false);
            } else {
                setIsValidSec(secNumber < 60 && secNumber > -1 ? true : false);
            }
            setIsValidMin(
                minNumber <= MAX_MINUTES_FOR_VIDEO &&
                    minNumber >= MIN_MINUTES_FOR_VIDEO
                    ? true
                    : false,
            );
            props.setTimerSeconds(minNumber * 60 + secNumber);
        }
    };

    useEffect(() => {
        props.setTimeIsValid(isValidMin && isValidSec);
    }, [isValidMin, isValidSec]);

    return (
        <div className={cnTimerRadioBtn()}>
            {choices.map((el, idx) => (
                <Fragment key={el.id}>
                    <RadioItem
                        idItem={el.id}
                        titleItem={el.title}
                        addAnswers={() => addAnswers(idx)}
                        currentIdItem={curentChoice}
                    />
                    {el.value && curentChoice === el.id && (
                        <div className={cnTimerRadioBtn("row")}>
                            <span className={cnTimerRadioBtn("text")}>
                                Установить таймер на
                            </span>
                            <div className={cnTimerRadioBtn("input-block")}>
                                <input
                                    type="number"
                                    className={cnTimerRadioBtn("input-field", {
                                        onblur: !isValidMin,
                                    })}
                                    id="minutes"
                                    name="minutes"
                                    min={MIN_MINUTES_FOR_VIDEO}
                                    max={MAX_MINUTES_FOR_VIDEO}
                                    defaultValue={MIN_MINUTES_FOR_VIDEO}
                                    ref={minRef}
                                    onChange={change}
                                />
                                <span className={cnTimerRadioBtn("text")}>
                                    :
                                </span>
                                <input
                                    type="number"
                                    className={cnTimerRadioBtn("input-field", {
                                        onblur: !isValidSec,
                                    })}
                                    id="seconds"
                                    name="seconds"
                                    min="0"
                                    max="59"
                                    defaultValue={"00"}
                                    ref={secRef}
                                    onChange={change}
                                />
                            </div>

                            <span className={cnTimerRadioBtn("text")}>
                                минут(ы).
                            </span>
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
