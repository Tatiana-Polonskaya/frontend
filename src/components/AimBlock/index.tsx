import React, { useEffect, useState } from "react";

import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
import { cn } from "@bem-react/classname";

import { ReactSVG } from "react-svg";

import addIcon from "./icons/add-square.svg";
import gpsIcon from "./icons/gps.svg";

import AimItem from "./AimItem";
import ModalWindow from "../ModalWindow/ModalWindow";
import CheckboxQuestion, { IQuestion } from "../CheckboxQuestion";
import { UUID } from "crypto";
import Button from "../ui-kit/Button";
import CheckBoxItem from "../CheckboxQuestion/CheckboxItem";

type Props = {
    textPlan: string[];
};

// передавать в пропсы данные цели для вывода в блок AimItem

export default function AimBlock() {
    const cnAimBlock = cn("AimBlock");

    const [choosenAim, setChoosenAim] = useState(0);
    const [isModal, setIsModal] = useState(false);

    const count_aims = new Array(3).fill(1).map((e, i) => e + i);

    const closeModal = () => {
        setIsModal(false);
    };

    const showModal = () => {
        setIsModal(true);
    };

    // ---------------------------- TEST START

    const choicesAim = [
        {
            id: "1",
            title: "Повысить уверенность в себе и в своих навыках публичного выступления",
            icon: "",
            another: false,
        },
        {
            id: "2",
            title: "Улучшить качество презентаций в рамках учебных и профессиональных мероприятий",
            icon: "",
            another: false,
        },
        {
            id: "3",
            title: "Подготовиться к важному профессиональному или личному мероприятию, такому как конференция, выставка, презентация проекта",
            icon: "",
            another: false,
        },
        {
            id: "4",
            title: "Опишите цель использования сервиса",
            icon: "",
            another: true,
        },
    ];

    const questionAim = {
        id: "dvdvd-dvdvd-dvvdv-dvdvd-dvdvd" as UUID,
        title: "",
        type: "checkbox",
        icons: false,
        type_choice: "block-answers",
        choices: choicesAim,
    } as IQuestion;

    // ---------------------------- TEST END

    return (
        <div className={cnAimBlock()}>
            <div className={cnAimBlock("row")}>
                <div className={cnAimBlock("title")}>
                    <ReactSVG src={gpsIcon} />
                    Цели
                </div>
                <div className={cnAimBlock("aims-count")}>
                    {count_aims.map((el) => (
                        <div
                            className={cnAimBlock("aims-count-circle", {
                                active: choosenAim === el - 1,
                            })}
                            onClick={() => setChoosenAim(el - 1)}
                        >
                            {el}
                        </div>
                    ))}
                </div>
                <div className={cnAimBlock("grow")}></div>
                <div className={cnAimBlock("btn")} onClick={showModal}>
                    <ReactSVG src={addIcon} />
                    Добавить цель
                </div>
            </div>
            {count_aims.map((el) => (
                <>{el - 1 === choosenAim ? <AimItem key={el} /> : null}</>
            ))}
            <ModalWindow
                title="Выберите цель или введите собственную"
                icon={gpsIcon}
                isVisible={isModal}
                onClose={() => closeModal()}
            >
                <div className={cnAimBlock("modal")}>
                    <CheckboxQuestion
                        question={questionAim}
                        addAnotherAnswers={() => {}}
                        addAnswers={() => {}}
                    />
                    <Button className={cnAimBlock("modal-btn")}>
                        <ReactSVG src={addIcon} />
                        <span className={cnAimBlock("modal-btn-text")}>
                            Добавить цель
                        </span>
                    </Button>
                </div>
            </ModalWindow>
            {/* <CheckBoxItem id={0} value="sss" name="vdvdv" checked={false} handleOnChange={()=>{}}>
                <span style={{color:"red"}}>FGGFGF </span>
            </CheckBoxItem>  */}
        </div>
    );
}
