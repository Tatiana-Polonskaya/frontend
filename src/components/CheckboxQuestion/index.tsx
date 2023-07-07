import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import svgg from "../Menu/icons/book.svg";
// import { IQuestion } from "../../models/survey";
import { UUID } from "crypto";
import { IAnswer, IQuestion, typeQuestion } from "../../models/survey";
import { LocalAnswer } from "../../store/slices/survey";

type Props = {
    question: IQuestion;
    addAnswers: Function;
    addAnotherAnswers?: Function;
};

export default function CheckboxQuestion(props: Props) {
    const cnMain = cn("checkbox-main");
    const question_id = props.question.id;

    const anotherCheckRef = useRef<HTMLInputElement>(null);

    const [checkedState, setCheckedState] = useState<Array<boolean>>(
        new Array(props.question.choices.length).fill(false)
    );

    const changeCheckedState = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    useEffect(() => {
        if (checkedState) {
            let currentIdAswers = props.question.choices.filter(
                (el, idx) => checkedState[idx]
            );

            let isAnother = currentIdAswers.some((el) => el.another);
            if (!isAnother && anotherCheckRef)
                anotherCheckRef.current!.value = "";

            const answers: LocalAnswer = {
                id_question: question_id,
                type_question: typeQuestion.checkbox,
                id_choices: currentIdAswers.map((el) => el.id),
                another_choices: "",
            };
            props.addAnswers(answers);
        }
    }, [checkedState]);

    const changeAnotherAnswer = () => {
        if (anotherCheckRef && anotherCheckRef.current) {
            if (anotherCheckRef.current!.value.length > 0) {
                let currentIdAswers = props.question.choices
                    .filter((el, idx) => checkedState[idx])
                    .map((el) => el.id);
                const answers: LocalAnswer = {
                    id_question: question_id,
                    type_question: typeQuestion.checkbox,
                    id_choices: currentIdAswers,
                    another_choices: anotherCheckRef.current!.value,
                };
                props.addAnswers(answers);
            }
        }
    };

    return (
        <div className={cnMain()}>
            {props.question.title.length > 0 && (
                <h3 className={cnMain("title")}>{props.question.title}</h3>
            )}
            <div className={cnMain(`${props.question.type_choice}`)}>
                {props.question.choices.map((el, index) => (
                    <Fragment key={el.id}>
                        {!el.another && (
                            <div className={cnMain("block-answers-item")}>
                                <label
                                    className={cnMain(
                                        "block-answers-item-label"
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        id={`question-checkbox-${index}`}
                                        value={el.id}
                                        name={el.title}
                                        checked={checkedState[index]}
                                        onChange={
                                            () => changeCheckedState(index)
                                            // handleOnChange(el.id, index)
                                        }
                                        className={cnMain(
                                            "block-answers-item-check"
                                        )}
                                    />
                                    <span
                                        className={cnMain(
                                            "block-answers-item-span"
                                        )}
                                    >
                                        {el.title}
                                    </span>
                                </label>
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
            <div className={cnMain("another-block")}>
                {props.question.choices.map((el, index) => (
                    <Fragment key={el.id}>
                        {el.another && (
                            <div
                                key={el.id}
                                className={cnMain("block-answers-item")}
                            >
                                <div className={cnMain("block-answers-item")}>
                                    <label
                                        className={cnMain(
                                            "block-answers-item-label"
                                        )}
                                    >
                                        <input
                                            type="checkbox"
                                            value={el.id}
                                            className={cnMain(
                                                "block-answers-item-check"
                                            )}
                                            checked={checkedState[index]}
                                            onChange={() =>
                                                changeCheckedState(index)
                                            }
                                        />
                                        <div
                                            className={cnMain(
                                                "block-answers-item-span"
                                            )}
                                        >
                                            Другое:
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={el.title}
                                            className={cnMain(
                                                "block-answers-item-input-text"
                                            )}
                                            disabled={!checkedState[index]}
                                            ref={anotherCheckRef}
                                            onChange={changeAnotherAnswer}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
