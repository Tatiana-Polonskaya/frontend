import { Fragment, useContext, useEffect, useMemo, useState } from "react";

import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
import { cn } from "@bem-react/classname";

import { ReactSVG } from "react-svg";

import arrowThin from "../icons/chevron-down.svg";
import arrowNorm from "../icons/arrow-down.svg";
import worningIcon from "../icons/danger.svg";
import tickIcon from "../icons/more-circle.svg";
import tickDone from "../icons/tick-circle.svg";
import {
    useLazyGetParamsQuery,
    useSendUserPurposeMutation,
} from "../../../store/api/diary";
import {
    AIM_PARAMETERS,
    IAimItem,
    IAimParameters,
} from "../../../models/aim";
import ProgressBar from "../../Graphs/Progressbar";
import {  NewAimContext } from "..";

type Props = {
    item: IAimItem;
};

// TO DO : CHANGE VALUE PARAMS FOR SAVING sendPurposeRequest FROM resParams TO checkedParams

export default function AimItem({ item }: Props) {
    const cnAimItem = cn("AimItem");

    const {updateAims } = useContext(NewAimContext);

    /* ------------------------------ AIM ------------------------------ */

    const statusAim = item ? (item.is_done ? "завершено" : "в процессе") : "";
    const typeAim = "личная цель";
    const messageAim = "выберите параметры для оценки цели";

    const titleAim = item ? item.title : "";
    const phraseAim = "Мотивирующая фраза, зависящая от прогресса!";

    const [sendPurposeRequest, sendPurposeResponse] =
        useSendUserPurposeMutation();
    const { isSuccess, isError } = sendPurposeResponse;

    /* ------------------------------ STEPS ------------------------------ */

    const count_steps = useMemo(
        () =>
            item
                ? item.tasks
                      .map((el) => el.step)
                      .filter((item, i, ar) => ar.indexOf(item) === i)
                : [],
        [item]
    );

    const choosedStep = 1;

    /* ------------------------------ TASKS ------------------------------ */

    const allTasks = item ? item.tasks : [];

    const [isShowTasks, setIsShowTasks] = useState(false);
    const titleForBtn = isShowTasks ? "Свернуть" : "Развернуть цель";

    /* ------------------------------ PARAMS ------------------------------ */

    const [getParams, resultParams] = useLazyGetParamsQuery();
    const [listParams, setListParams] = useState<IAimParameters>();

    useEffect(() => {
        if (resultParams && resultParams.data) {
            setListParams(resultParams.data!.data!);
        }
    }, [resultParams]);

    /* ------------------------------ SAVED PARAMS ------------------------------ */

    const [canSave, setCanSave] = useState(
        count_steps.length > 0 ? false : true
    );

    useEffect(() => {
        if (count_steps && count_steps.length === 0) return setCanSave(true);
        return setCanSave(false);
    }, [count_steps]);

    const [isShowParams, setIsShowParams] = useState(true);

    const [checkedParams, setCheckedParams] = useState<Array<string>>([]);

    // for existed params from user aim
    useEffect(() => {
        if (listParams) {
            Object.entries(listParams).map(([key, value]) => {
                let rest = item.parameters.filter(
                    (el) => el.title === value.title
                );
                if (rest.length > 0) {
                    setCheckedParams((prev) => [...prev, key]);
                }
            });
        }
    }, [listParams, item.parameters]);

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
        if (canSave) changeCheckedState(elem);
    };

    const saveParams = async () => {

        let resParams = [
            AIM_PARAMETERS.consistency,
            AIM_PARAMETERS.informative,
            AIM_PARAMETERS.originality,
        ];

        await sendPurposeRequest({
            title: item.title,
            params: checkedParams as AIM_PARAMETERS[], // checkedParams
        });
    };

    useEffect(() => {
        if (isSuccess) {
            updateAims();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) alert("Something was wrong!");
    }, [isError]);

    return (
        <div className={cnAimItem()}>
            <div className={cnAimItem("header")}>
                <div className={cnAimItem("row")}>
                    <div className={cnAimItem("header-status")}>
                        {statusAim}
                    </div>
                    <div className={cnAimItem("header-type")}>{typeAim}</div>
                    {count_steps.length < 1 && (
                        <div className={cnAimItem("header-message")}>
                            <span className={cnAimItem("header-message-text")}>
                                <ReactSVG src={worningIcon} />
                                {messageAim}
                            </span>
                        </div>
                    )}

                    <div
                        className={cnAimItem("header-btn-show")}
                        onClick={() => {
                            setIsShowTasks((prev) => !prev);
                            getParams(null, true);
                        }}
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
                    {item &&
                        count_steps.length > 0 &&
                        count_steps.map((el, idx) => {
                            let itemProgress = 100 / count_steps.length;
                            let prevMax =
                                idx > 0 ? (100 / count_steps.length) * idx : 0;
                            let currentMax = itemProgress * (idx + 1);
                            let currV = item.progress;
                            let currentValue =
                                currV >= currentMax
                                    ? currentMax
                                    : currV - prevMax > 0
                                    ? currV - prevMax
                                    : 0;
                            return (
                                <ProgressBar
                                    completed={currentValue}
                                    maxValue={currentMax}
                                    key={idx}
                                />
                            );
                        })}
                </div>
            </div>
            {isShowTasks && (
                <>
                    {count_steps.length > 0 && (
                        <div>
                            <div className={cnAimItem("row")}>
                                <div className={cnAimItem("steps")}>
                                    {count_steps.map((el, idx) => (
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
                                {allTasks &&
                                    allTasks.map((el, idx) => (
                                        <Fragment key={idx}>
                                            {choosedStep === el.step ? (
                                                <div
                                                    className={cnAimItem(
                                                        "task-block-item",
                                                        {
                                                            done: el.is_done,
                                                        }
                                                    )}
                                                >
                                                    <ReactSVG
                                                        src={
                                                            el.is_done
                                                                ? tickDone
                                                                : tickIcon
                                                        }
                                                    />
                                                    <span>
                                                        {el.description}
                                                    </span>
                                                </div>
                                            ) : undefined}
                                        </Fragment>
                                    ))}
                            </div>
                        </div>
                    )}
                    {count_steps.length === 0 && (
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
                    {isShowParams && listParams && (
                        <div className={cnAimItem("params-block-grid")}>
                            {listParams &&
                                Object.entries(listParams).map(
                                    ([key, value], idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                className={cnAimItem(
                                                    "params-block-grid-item"
                                                )}
                                            >
                                                <label
                                                    className={cnAimItem(
                                                        "params-block-grid-item-label",
                                                        {
                                                            active: !canSave,
                                                        }
                                                    )}
                                                    data-tooltip-id={
                                                        "params-input-" + key
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className={cnAimItem(
                                                            "params-block-grid-item-input"
                                                        )}
                                                        checked={checkedParams.includes(
                                                            key
                                                        )}
                                                        name={key}
                                                        value={key}
                                                        onChange={() =>
                                                            handleOnChange(key)
                                                        }
                                                    ></input>
                                                    <span
                                                        className={cnAimItem(
                                                            "params-block-grid-item-span"
                                                        )}
                                                    >
                                                        {value.title}
                                                    </span>
                                                </label>
                                                <Tooltip
                                                    id={"params-input-" + key}
                                                    place={"right-start"}
                                                    noArrow={true}
                                                    className={cnAimItem(
                                                        "tooltip"
                                                    )}
                                                >
                                                    {value.description}
                                                </Tooltip>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
