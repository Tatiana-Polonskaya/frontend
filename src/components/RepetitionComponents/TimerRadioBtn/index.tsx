import { cn } from "@bem-react/classname";

import "./style.scss";
import RadioItem from "../../RadioBtnQuestion/RadioItem";
import { useState } from "react";

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
    setIsTimer:Function;
}

export default function TimerRadioBtn(props: Props) {
    const [curentChoice, setCurrentChoice] = useState<number>(0);

    const addAnswers = (idChoice: number) => {
        setCurrentChoice(idChoice);
        props.setIsTimer(choices.filter(el=>el.id===idChoice)[0].value)
    };

    return (
        <div className={cnTimerRadioBtn()}>
            {choices.map((el, idx) => (
                <RadioItem
                    key={el.id}
                    idItem={el.id}
                    titleItem={el.title}
                    addAnswers={() => addAnswers(idx)}
                    currentIdItem={curentChoice}
                />
            ))}
        </div>
    );
}
