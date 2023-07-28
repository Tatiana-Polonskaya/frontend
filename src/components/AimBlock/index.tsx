import {
    Fragment,
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "react-tooltip/dist/react-tooltip.css";

import AimItem from "./AimItem";
import ModalWindow from "../ModalWindow/ModalWindow";

import Button from "../ui-kit/Button";
import {
    ForwardedCheckBoxItem,
} from "../CheckboxQuestion/CheckboxItem";
import { useGetUserPurposesQuery, useLazyGetUserPurposesQuery } from "../../store/api/diary";
import { IAimItem } from "../../models/aim";

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
    const count_purposes: number = allPurposes ? allPurposes.length : 0;

    const storePurposes = useAppSelector((state) => state.diary.userAims);

    useEffect(() => {
        if (
            allUsersPurposes &&
            allUsersPurposes.data &&
            allUsersPurposes.data.data
        ) {
            if(storePurposes.length > 0){
            if (storePurposes[0].title.length === 0) {
                setAllPurposes(allUsersPurposes.data!.data!.purposes);
                dispatch(updateUserAims(allUsersPurposes.data!.data!.purposes));
            } else {
                setAllPurposes(storePurposes);
            }
        }
        }
    }, [allUsersPurposes]);

    /* ------------------------------ AIMS FOR MODAL WINDOW ------------------------------ */
    const existedAims = [
        {
            id: "1",
            title: "Повысить уверенность в себе и в своих навыках публичного выступления",
            isExist: false,
            another: false,
        },
        {
            id: "2",
            title: "Улучшить качество презентаций в рамках учебных и профессиональных мероприятий",
            isExist: false,
            another: false,
        },
        {
            id: "3",
            title: "Подготовиться к важному профессиональному или личному мероприятию, такому как конференция, выставка, презентация проекта",
            isExist: false,
            another: false,
        },
        {
            id: "4",
            title: "Опишите цель использования сервиса",
            isExist: false,
            another: true,
        },
    ];

    const [standartAims, setStandertAims] = useState(existedAims);

    useEffect(() => {
        if (allPurposes) {
            const userAimTitles = allPurposes.map((el) => el.title);
            // const existedAimsTitles = existedAims.map(el=>el.title);
            setStandertAims(
                existedAims.map((el) => {
                    return { ...el, isExist: userAimTitles.includes(el.title) };
                })
            );
        }
    }, [allPurposes]);

    const [choosenAim, setChoosenAim] = useState(0);

    /* ------------------------------ UPDATING AIMS AFTER ADDING NEW AIMS ------------------------------ */
    
    const [hasNewAim, setHasNewAim] = useState(false);

    const [getNewAims, newAims] = useLazyGetUserPurposesQuery();

    const updateAims = async () =>{
        setHasNewAim(prev=>!prev);
        await getNewAims();
    }

    useEffect(()=>{
        if(newAims && newAims.data && newAims.isSuccess){
            if (newAims.data.success && newAims.data.data){
                setAllPurposes(newAims.data!.data!.purposes);
                dispatch(updateUserAims(newAims.data!.data!.purposes));
            }
        } 
    },[newAims]);

    /* ------------------------------ MODAL WINDOW ------------------------------ */

    const [isModal, setIsModal] = useState(false);

    const closeModal = () => {
        setIsModal(false);
    };

    const showModal = () => {
        setIsModal(true);
    };

    const textRef = useRef<HTMLInputElement>(null);

    /* ------------------------------ MODAL WINDOW VALUE ------------------------------ */


    const [checkedState, setCheckedState] = useState<Array<boolean>>(
        new Array(existedAims.length).fill(false)
    );

    const changeCheckedState = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const saveChoosedAims = () => {
        let titles: string[] = checkedState.map((el, idx) => {
            if (el) {
                if (existedAims[idx].title === existedAims.at(-1)?.title) {
                    // опишите цель использования сервиса
                    return textRef && textRef.current
                        ? textRef.current!.value
                        : "textRef";
                }
                return existedAims[idx].title;
            }
            return "";
        });

        let res = titles
            .filter((el) => el !== "")
            .map((el) => ({
                title: el,
                is_done: false,
                progress: 0,
                created_at: "",
                tasks: [],
                parameters: [],
            }));

        dispatch(
            updateUserAims(allPurposes ? [...res, ...allPurposes] : [...res])
        );
        setAllPurposes((prev) => (prev ? [...res, ...prev] : [...res]));

        setHasNewAim(true);
        setChoosenAim(0);
        setCheckedState(new Array(existedAims.length).fill(false))
        closeModal();
    };

    /* ------------------------------ CODE ------------------------------ */

    return (
        <div className={cnAimBlock()}>
            <div className={cnAimBlock("row")}>
                <div className={cnAimBlock("title")}>
                    <ReactSVG src={gpsIcon} />
                    Цели
                </div>
                <div className={cnAimBlock("aims-count")}>
                    {count_purposes > 0 &&
                        new Array(count_purposes).fill(1).map((el, i) => (
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
                            {i === choosenAim ? <AimItem item={el} /> : null}
                        </Fragment>
                    ))}
                    
            </NewAimContext.Provider>
            {count_purposes===0 && (<span className={cnAimBlock("empty-msg")}>Целей еще нет</span>)}
            <ModalWindow
                title="Выберите цель или введите собственную"
                icon={gpsIcon}
                isVisible={isModal}
                onClose={() => closeModal()}
            >
                <div className={cnAimBlock("modal")}>
                    {standartAims.map((el, idx) => (
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
