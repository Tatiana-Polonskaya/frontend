import { Fragment, createContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "react-tooltip/dist/react-tooltip.css";

import AimItem from "./AimItem";
import ModalWindow from "../ModalWindow/ModalWindow";

import Button from "../ui-kit/Button";
import { ForwardedCheckBoxItem } from "../CheckboxQuestion/CheckboxItem";
import {
    useGetUserPurposesQuery,
    useLazyGetUserPurposesQuery,
    useSendUserPurposeMutation,
} from "../../store/api/diary";
import { AIM_PARAMETERS, IAimItem, ISendUserPurpose } from "../../models/aim";

import { updateUserAims } from "../../store/slices/diary";

import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import addIcon from "./icons/add-square.svg";
import gpsIcon from "./icons/gps.svg";

import "./style.scss";

export const NewAimContext = createContext({
    hasNewAim: false,
    updateAims: (() => {}) as Function,
});

export default function AimBlock() {
    const cnAimBlock = cn("AimBlock");
    const dispatch = useAppDispatch();

    /* ------------------------------ AIMS ------------------------------ */

    const allUsersPurposes = useGetUserPurposesQuery();
    const [allPurposes, setAllPurposes] = useState<IAimItem[]>();

    const countPurposes: number = allPurposes ? allPurposes.length : 0;

    const storePurposes = useAppSelector((state) => state.diary.userAims);

    useEffect(() => {
        if (
            allUsersPurposes &&
            allUsersPurposes.data &&
            allUsersPurposes.data.data
        ) {
            console.log("allUsersPurposes", allUsersPurposes);
            if (storePurposes.length > 0) {
                if (storePurposes[0].title.length === 0) {
                    const purposes = [
                        ...allUsersPurposes.data!.data!.purposes,
                    ].reverse();
                    setAllPurposes(purposes);
                    dispatch(updateUserAims(purposes));
                } else {
                    setAllPurposes(storePurposes);
                }
            }
        }
    }, [allUsersPurposes]);

    /* ------------------------------ AIMS FOR MODAL WINDOW ------------------------------ */
    const existedPurposes = [
        {
            id: "1",
            title: "Повысить уверенность в себе и в своих навыках публичного выступления",
            isExist: false,
            another: false,
            params: [
                AIM_PARAMETERS.confidence,
                AIM_PARAMETERS.energy,
                AIM_PARAMETERS.eloquence,
                AIM_PARAMETERS.informative,
                AIM_PARAMETERS.expressiveness,
            ],
        },
        {
            id: "2",
            title: "Улучшить качество презентаций в рамках учебных и профессиональных мероприятий",
            isExist: false,
            another: false,
            params: [
                AIM_PARAMETERS.consistency,
                AIM_PARAMETERS.informative,
                AIM_PARAMETERS.non_monotony,
                AIM_PARAMETERS.clarity,
                AIM_PARAMETERS.parasite_words,
            ],
        },
        {
            id: "3",
            title: "Подготовиться к важному профессиональному или личному мероприятию, такому как конференция, выставка, презентация проекта",
            isExist: false,
            another: false,
            params: [
                AIM_PARAMETERS.consistency,
                AIM_PARAMETERS.unity_of_style,
                AIM_PARAMETERS.non_monotony,
                AIM_PARAMETERS.confidence,
                AIM_PARAMETERS.aggressiveness_coefficient,
            ],
        },
        {
            id: "4",
            title: "Опишите цель использования сервиса",
            isExist: false,
            another: true,
            params: [],
        },
    ];

    const [standartPurposes, setStandertPurposes] = useState(existedPurposes);

    useEffect(() => {
        if (allPurposes) {
            const userAimTitles = allPurposes.map((el) => el.title);
            // const existedAimsTitles = existedAims.map(el=>el.title);
            setStandertPurposes(
                existedPurposes.map((el) => {
                    return { ...el, isExist: userAimTitles.includes(el.title) };
                })
            );
        }
    }, [allPurposes]);

    const [choosenAim, setChoosenAim] = useState(0);

    /* ------------------------------ UPDATING AIMS AFTER ADDING NEW AIMS ------------------------------ */

    const [hasNewAim, setHasNewAim] = useState(false); // добавить реверс для массива

    const [getNewAims, newAims] = useLazyGetUserPurposesQuery();

    const updateAims = async () => {
        setHasNewAim(false);
        await getNewAims();
    };

    useEffect(() => {
        if (newAims && newAims.data && newAims.isSuccess) {
            if (newAims.data.success && newAims.data.data) {
                const purposes = [...newAims.data!.data!.purposes].reverse();
                setAllPurposes(purposes);
                dispatch(updateUserAims(purposes));
            }
        }
    }, [newAims]);

    /* ------------------------------ MODAL WINDOW ------------------------------ */

    const [isModal, setIsModal] = useState(false);

    const closeModal = () => {
        setCheckedState(new Array(existedPurposes.length).fill(false));
        setIsModal(false);
    };

    const showModal = () => {
        setIsModal(true);
    };

    const textRef = useRef<HTMLInputElement>(null);

    /* ------------------------------ MODAL WINDOW VALUE ------------------------------ */

    const [sendPurposeRequest, sendPurposeResponse] =
        useSendUserPurposeMutation();

    const { isSuccess } = sendPurposeResponse;

    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(existedPurposes.length).fill(false)
    );

    const changeCheckedState = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    // Добавить определенные параметры
    const saveChoosedAims = () => {
        let userAimTitle: string = "";
        const commonAims: ISendUserPurpose[] = [];

        checkedState.forEach((el, idx) => {
            if (el) {
                if (
                    existedPurposes[idx].title === existedPurposes.at(-1)?.title
                ) {
                    // опишите цель использования сервиса
                    userAimTitle =
                        textRef && textRef.current
                            ? textRef.current!.value
                            : "";
                } else {
                    commonAims.push({
                        title: existedPurposes[idx].title,
                        params: existedPurposes[idx].params as AIM_PARAMETERS[],
                    });
                }
            }
        });

        console.log("send commonAims", commonAims);

        if (userAimTitle.length > 0) {
            console.log("userAimTitle.length > 0", userAimTitle);
            const resultAims = {
                title: userAimTitle,
                is_done: false,
                progress: 0,
                created_at: "",
                tasks: [],
                parameters: [],
            };

            dispatch(
                updateUserAims(
                    allPurposes ? [resultAims, ...allPurposes] : [resultAims]
                )
            );

            setAllPurposes((prev) =>
                prev ? [resultAims, ...prev] : [resultAims]
            );

            setHasNewAim(true);
        }

        if (commonAims.length > 0) {
            commonAims.forEach(
                async (purpose) => await sendPurposeRequest(purpose)
            );
        }

        setChoosenAim(0);
        setCheckedState(new Array(existedPurposes.length).fill(false));
        closeModal();
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("isSuccess");
            console.log(sendPurposeResponse);
            const getData = async () => await getNewAims();
            getData();
        }
    }, [isSuccess]);

    /* ------------------------------ CODE ------------------------------ */

    return (
        <div className={cnAimBlock()}>
            <div className={cnAimBlock("row")}>
                <div className={cnAimBlock("title")}>
                    <ReactSVG src={gpsIcon} />
                    Цели
                </div>
                <div className={cnAimBlock("aims-count")}>
                    {countPurposes > 0 &&
                        new Array(countPurposes).fill(1).map((el, i) => (
                            <div
                                key={el + i}
                                className={cnAimBlock("aims-count-circle", {
                                    active: choosenAim === el + i - 1,
                                })}
                                onClick={() => setChoosenAim(el + i - 1)}
                            >
                                {el + i}
                            </div>
                        ))}
                </div>
                <div className={cnAimBlock("grow")}></div>
                <div className={cnAimBlock("btn")} onClick={showModal}>
                    <ReactSVG src={addIcon} />
                    Добавить цель
                </div>
            </div>

            <NewAimContext.Provider value={{ hasNewAim, updateAims }}>
                {allPurposes &&
                    allPurposes.map((el, i) => (
                        <Fragment key={i}>
                            {i === choosenAim ? <AimItem purpose={el} /> : null}
                        </Fragment>
                    ))}
            </NewAimContext.Provider>

            {countPurposes === 0 && (
                <span className={cnAimBlock("empty-msg")}>Целей еще нет</span>
            )}
            <ModalWindow
                title="Выберите цель или введите собственную"
                icon={gpsIcon}
                isVisible={isModal}
                onClose={() => closeModal()}
            >
                <div className={cnAimBlock("modal")}>
                    {standartPurposes.map((el, idx) => (
                        <ForwardedCheckBoxItem
                            key={idx + el.title}
                            id={"" + idx}
                            value={""}
                            name={""}
                            checked={checkedState[idx]}
                            handleOnChange={() => changeCheckedState(idx)}
                            isAnother={el.another}
                            title={el.title}
                            disabled={el.isExist}
                            ref={el.another ? textRef : undefined}
                        >
                            <span>
                                <span
                                    className={cnAimBlock(
                                        "modal-checkbox-text",
                                        { strikethrough: el.isExist }
                                    )}
                                >
                                    {el.title}
                                </span>
                                {el.isExist && (
                                    <span
                                        className={cnAimBlock(
                                            "modal-checkbox-text-blue"
                                        )}
                                    >
                                        Цель уже добавлена
                                    </span>
                                )}
                            </span>
                        </ForwardedCheckBoxItem>
                    ))}
                    <Button
                        className={cnAimBlock("modal-btn")}
                        onClick={saveChoosedAims}
                    >
                        <ReactSVG src={addIcon} />
                        <span className={cnAimBlock("modal-btn-text")}>
                            Добавить цель
                        </span>
                    </Button>
                </div>
            </ModalWindow>
        </div>
    );
}
