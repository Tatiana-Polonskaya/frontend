import { useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import svgg from "../Menu/icons/book.svg";
// import { IQuestion } from "../../models/survey";
import { UUID } from "crypto";
import { IAnswer } from "../../models/survey";

type Props = {
    question: IQuestion;
    addAnswers: Function;
    addAnotherAnswers: Function;
};

enum typeQuestion {
    checkbox = "checkbox",
    radio = "radio",
}
enum typeStyleAnswers {
    row = "block-answers",
    column = "col-answers",
    icon_row = "icon-rows",
}
export interface IQuestion {
    id: UUID;
    title: string;
    type: typeQuestion;
    icons: boolean;
    type_choice: typeStyleAnswers;
    choices: IChoice[];
}

export interface IChoice {
    id: UUID;
    title: string;
    icon: string;
    another: boolean;
}

export default function CheckboxQuestion(props: Props) {
    const cnMain = cn("checkbox-main");
    const question_id = props.question.id;

    const [checkedState, setCheckedState] = useState(
        new Array(props.question.choices.length + 1).fill(false)
    );

    const changeCheckedState = (position: number) => {

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const handleOnChange = (choice_id: UUID, position: number) => {

        changeCheckedState(position);

        const answers: IAnswer = {
            question_id: question_id,
            choice_id: choice_id,
            text: "",
        };
        props.addAnswers(answers);
    };

    const addText = (choice_id: UUID, text: string) => {
        // const answers: IAnswer = {
        //     question_id: question_id,
        //     choice_id: choice_id,
        //     text: text,
        // };
        props.addAnotherAnswers(question_id, choice_id,text);
    };

    return (
        <div className={cnMain()}>
            {props.question.title.length > 0 && (<h3 className={cnMain("title")}>{props.question.title}</h3>)}
            <div className={cnMain(`${props.question.type_choice}`)}>
                {props.question.choices.map((el, index) => (
                    <div key={el.id} className={cnMain("block-answers-item")}>
                        {!el.another && (
                            <label
                                className={cnMain("block-answers-item-label")}
                            >
                                <input
                                    type="checkbox"
                                    id={`question-checkbox-${index}`}
                                    value={el.id}
                                    name={el.title}
                                    checked={checkedState[index]}
                                    onChange={() =>
                                        handleOnChange(el.id, index)
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
                        )}
                        {el.another && (
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
                                        onChange={(e) =>
                                            addText(el.id, e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
