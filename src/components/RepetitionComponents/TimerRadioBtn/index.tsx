import { cn } from "@bem-react/classname";

import "./style.scss";
import RadioItem from "../../RadioBtnQuestion/RadioItem";
import { Fragment, useEffect, useRef, useState } from "react";

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
};

export default function TimerRadioBtn(props: Props) {
    const [curentChoice, setCurrentChoice] = useState<number>(0);

    const addAnswers = (idChoice: number) => {
        setCurrentChoice(idChoice);
    };

    const minRef = useRef<HTMLInputElement>(null);
    const secRef = useRef<HTMLInputElement>(null);

    const [isValidMin, setIsValidMin] = useState(true);
    const [isValidSec, setIsValidSec] = useState(true);

    const change = () => {
        if (secRef.current && minRef.current) {
            const minNumber = Number(minRef.current.value);
            const secNumber = Number(secRef.current.value);
            if (minNumber === 1) {
                setIsValidSec(secNumber < 60 && secNumber > 29 ? true : false);
            } else if (minNumber === 15) {
                setIsValidSec(secNumber === 0 ? true : false);
            } else {
                setIsValidSec(secNumber < 60 && secNumber > -1 ? true : false);
            }
            setIsValidMin(minNumber < 16 && minNumber > -1 ? true : false);
            
            props.setTimerSeconds(minNumber * 60 + secNumber);
        }
    };

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
                                    min="1"
                                    max="15"
                                    defaultValue={15}
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
