import { useEffect, useState } from "react";

import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
import { cn } from "@bem-react/classname";

import { ReactSVG } from "react-svg";
import EnergyLine from "../../Graphs/EnergyLine";
import arrowThin from "../icons/chevron-down.svg";
import arrowNorm from "../icons/arrow-down.svg";
import worningIcon from "../icons/danger.svg";
import tickIcon from "../icons/more-circle.svg";
import tickDone from "../icons/tick-circle.svg";
import Button from "../../ui-kit/Button";

type Props = {
    textPlan: string[];
};

export default function AimItem() {
    const cnAimItem = cn("AimItem");

    const statusAim = "в процессе";
    const typeAim = "личная цель";
    const messageAim = "выберите параметры для оценки цели";

    const titleAim = "Избавиться от слов-паразитов";
    const phraseAim = "Мотивирующая фраза, зависящая от прогресса!";
    const count_steps: number = 2;
    const all_steps = new Array(count_steps).fill(1).map((_, i) => i + 1);
    const tasks = [
        "Уменьшить эмоцию “агрессия” в течении выступления на 0.1 ",
        "Увеличить показатель параметра ясность на 0.2",
        "Увеличить показатель параметра аргументированность на 0.1",
    ];
    const params = new Array(18)
        .fill("Последовательность")
        .map((el, i) => el + "" + i);
    const choosedStep = 1;

    const [isShowTasks, setIsShowTasks] = useState(false);
    const titleForBtn = isShowTasks ? "Свернуть" : "Развернуть цель";

    const [canSave, setCanSave] = useState(true);

    const [isShowParams, setIsShowParams] = useState(true);

    const [checkedParams, setCheckedParams] = useState<Array<string>>([]);

    const changeCheckedState = (el: string) => {
        const indexParam = checkedParams.findIndex((item) => item === el);
        if (indexParam !== -1) {
            const updatedCheckedState = [
                ...checkedParams.slice(0, indexParam),
                ...checkedParams.slice(indexParam + 1),
            ];
            setCheckedParams(updatedCheckedState);
        } else {
            if (checkedParams.length < 5) {
                setCheckedParams([...checkedParams, el]);
            }
        }
    };

    const handleOnChange = (elem: string) => {
        changeCheckedState(elem);
    };

    const saveParams = () => {
        console.log("params werebeen saved");
    };

    return (
        <div className={cnAimItem()}>
            <div className={cnAimItem("header")}>
                <div className={cnAimItem("row")}>
                    <div className={cnAimItem("header-status")}>
                        {statusAim}
                    </div>
                    <div className={cnAimItem("header-type")}>{typeAim}</div>
                    <div className={cnAimItem("header-message")}>
                        <span className={cnAimItem("header-message-text")}>
                            <ReactSVG src={worningIcon} />
                            {messageAim}
                        </span>
                    </div>
                    <div
                        className={cnAimItem("header-btn-show")}
                        onClick={() => setIsShowTasks((prev) => !prev)}
                    >
                        {titleForBtn}
                        <ReactSVG
                            src={arrowThin}
                            className={cnAimItem("header-btn-show-icon", {
                                rotated: isShowTasks,
                            })}
                        />
                    </div>
                </div>
                <div className={cnAimItem("row")}>
                    <div className={cnAimItem("header-title")}>{titleAim}</div>
                </div>
                <div className={cnAimItem("row")}>
                    <div className={cnAimItem("header-phrase")}>
                        {phraseAim}
                    </div>
                </div>
                <div className={cnAimItem("row")}>
                    {all_steps.map((el, idx) => (
                        <EnergyLine maxValue={100} value={95} />
                    ))}
                </div>
            </div>
            {isShowTasks && (
                <>
                    {count_steps > 0 && (
                        <div>
                            <div className={cnAimItem("row")}>
                                <div className={cnAimItem("steps")}>
                                    {all_steps.map((el, idx) => (
                                        <div
                                            key={idx}
                                            className={cnAimItem("steps-item", {
                                                active: choosedStep === el,
                                            })}
                                        >
                                            {el} шаг
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cnAimItem("row")}>
                                <div className={cnAimItem("warning")}>
                                    <ReactSVG src={worningIcon} />
                                    Все что не тренируется, то отмирает! Имей в
                                    виду, твой уровень будет понижаться без
                                    регулярных репетиций.
                                </div>
                            </div>
                            <div className={cnAimItem("task-block")}>
                                <span className={cnAimItem("header-phrase")}>
                                    Задачи:
                                </span>
                                {tasks.map((el, idx) => (
                                    <div
                                        className={cnAimItem(
                                            "task-block-item",
                                            {
                                                done: idx === 0,
                                            }
                                        )}
                                    >
                                        <ReactSVG
                                            src={
                                                idx === 0 ? tickDone : tickIcon
                                            }
                                        />
                                        <span>{el}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {count_steps === 0 && (
                        <div className={cnAimItem("error-block")}>
                            <span className={cnAimItem("header-phrase")}>
                                Задачи:
                            </span>
                            <div className={cnAimItem("error-block-text")}>
                                Для формирования задач необходимо выбрать
                                параметры, на которых они основаны.
                            </div>
                        </div>
                    )}
                    <div
                        className={
                            cnAimItem("row") + " " + cnAimItem("padding")
                        }
                    >
                        <div
                            className={cnAimItem("params-block-title")}
                            onClick={() => setIsShowParams((prev) => !prev)}
                        >
                            <ReactSVG
                                src={arrowNorm}
                                className={cnAimItem("params-block-arrow", {
                                    rotated: isShowParams,
                                })}
                            />
                            Параметры цели
                        </div>
                        <div className={cnAimItem("params-block-grow")}>
                            {""}
                        </div>

                        {canSave ? (
                            <div
                                className={cnAimItem("params-block-btn")}
                                onClick={saveParams}
                            >
                                Сохранить
                            </div>
                        ) : (
                            <div className={cnAimItem("params-block-message")}>
                                Параметры этой цели изменить нельзя
                            </div>
                        )}
                    </div>
                    {isShowParams && (
                        <div className={cnAimItem("params-block-grid")}>
                            {params.map((el, idx) => (
                                <div
                                    className={cnAimItem(
                                        "params-block-grid-item"
                                    )}
                                >
                                    <label
                                        className={cnAimItem(
                                            "params-block-grid-item-label"
                                        )}
                                        data-tooltip-id={"params-input-" + idx}
                                    >
                                        <input
                                            type="checkbox"
                                            className={cnAimItem(
                                                "params-block-grid-item-input"
                                            )}
                                            checked={checkedParams.includes(el)}
                                            name={el}
                                            value={el}
                                            onChange={() => handleOnChange(el)}
                                        ></input>
                                        <span
                                            className={cnAimItem(
                                                "params-block-grid-item-span"
                                            )}
                                        >
                                            {el}
                                        </span>
                                    </label>
                                    <Tooltip
                                        id={"params-input-" + idx}
                                        place={"right-start"}
                                        noArrow={true}
                                        className={cnAimItem("tooltip")}
                                    >
                                        Информативность - предоставление полной
                                        и точной информации, наличие в
                                        выступлении фактов и деталей, которые
                                        помогут аудитории понять тему
                                        выступления и принять выдвинутые
                                        аргументы."
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
