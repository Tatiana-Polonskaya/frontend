import { Fragment, useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import svgg from "../Menu/icons/book.svg";
import {
    EnumBody,
    EnumDeclaration,
    EnumMember,
    EnumStringBody,
    EnumStringMember,
} from "@babel/types";
import { IQuestion } from "../CheckboxQuestion";
import { UUID } from "crypto";

type Props = {
    question: IQuestion;
    addAnswers: Function;
};

type Question = {
    id: number;
    title: string;
    answers: Answer[];
    block_another?: boolean;
    placeholder_another?: string;
    icons?: boolean;
    type?: string;
    type_answer?: string;
};

type Answer = {
    id: number;
    title: string;
    icon?: string;
};

export default function RadioBtnQuestion(props: Props) {
    const cnMain = cn("radio-main");

    const [selectedOption, setSelectedOption] = useState<UUID>();

    function handleChange(id: UUID) {
        setSelectedOption(id);
        props.addAnswers(id, props.question.id);
    }
    const index_another = props.question.choices.length;

    const addText = (value: string) => {
        // props.addAnotherAnswers(props.question.id, value);
    };

    // `${props.question.type_answer}`
    let style = "column-answers";

    return (
        <div className={cnMain()}>
            <h3 className={cnMain("title")}>{props.question.title}</h3>
            <div className={cnMain(`${props.question.type_choice}`)}>
                {props.question.choices.map((el, index) => (
                    <Fragment key={index}>
                        {!el.another && (
                            <div
                                key={el.id}
                                className={cnMain(
                                    `${props.question.type_choice}-item`,
                                    {
                                        checked: selectedOption === el.id,
                                    }
                                )}
                            >
                                {props.question.icons && (
                                    <ReactSVG
                                        src={svgg}
                                        className={cnMain(
                                            `${props.question.type_choice}-item-icon`
                                        )}
                                    />
                                )}

                                <label
                                    className={cnMain(
                                        `${props.question.type_choice}-item-label`
                                    )}
                                >
                                    <input
                                        type="radio"
                                        value={el.id}
                                        checked={selectedOption === el.id}
                                        onChange={() => handleChange(el.id)}
                                        className={cnMain(
                                            `${props.question.type_choice}-item-label-radio`
                                        )}
                                    />
                                    <div
                                        className={cnMain(
                                            `${props.question.type_choice}-item-label-custom-radio__label`
                                        )}
                                    >
                                        <strong>{el.title}</strong>
                                    </div>
                                </label>
                            </div>
                        )}
                        {el.another && (
                            <div className={cnMain("another")}>
                                <label className={cnMain("another-label")}>
                                    <input
                                        type="radio"
                                        value={el.id}
                                        className={cnMain(
                                            "another-label-radio"
                                        )}
                                        checked={
                                            selectedOption === el.id
                                        }
                                        onChange={() =>
                                            handleChange(el.id)
                                        }
                                    />
                                    <div
                                        className={cnMain(
                                            "another-label-custom-radio__label"
                                        )}
                                    >
                                        <strong>Другое:</strong>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={
                                            el.title
                                        }
                                        className={cnMain(
                                            "another-label-input-text"
                                        )}
                                        disabled={
                                            selectedOption !== el.id
                                        }
                                        onChange={(e) =>
                                            addText(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
