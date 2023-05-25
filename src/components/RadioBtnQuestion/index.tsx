import { useState } from "react";
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

type Props = {
    question: Question;
    addAnswers: Function;
    addAnotherAnswers: Function;
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

    const [selectedOption, setSelectedOption] = useState(-1);

    function handleChange(id: number) {
        setSelectedOption(id);
        props.addAnswers(id, props.question.id - 1);
    }
    const index_another = props.question.answers.length;

    const addText = (value: string) => {
        props.addAnotherAnswers(props.question.id - 1, value);
    };

    // `${props.question.type_answer}`
    let style = "column-answers";

    return (
        <div className={cnMain()}>
            <h3 className={cnMain("title")}>
                {props.question.id}. {props.question.title}
            </h3>
            <div className={cnMain(`${props.question.type_answer}`)}>
                {props.question.answers.map((el) => (
                    <div
                        key={el.id}
                        className={cnMain(
                            `${props.question.type_answer}-item`,
                            {
                                checked: selectedOption === el.id,
                            }
                        )}
                    >
                        {props.question.icons && (
                            <ReactSVG
                                src={svgg}
                                className={cnMain(
                                    `${props.question.type_answer}-item-icon`
                                )}
                            />
                        )}

                        <label
                            className={cnMain(
                                `${props.question.type_answer}-item-label`
                            )}
                        >
                            <input
                                type="radio"
                                value={el.id}
                                checked={selectedOption === el.id}
                                onChange={() => handleChange(el.id)}
                                className={cnMain(
                                    `${props.question.type_answer}-item-label-radio`
                                )}
                            />
                            <div
                                className={cnMain(
                                    `${props.question.type_answer}-item-label-custom-radio__label`
                                )}
                            >
                                <strong>{el.title}</strong>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
            {props.question.block_another && (
                <div className={cnMain("another")}>
                    <label className={cnMain("another-label")}>
                        <input
                            type="radio"
                            value={index_another}
                            className={cnMain("another-label-radio")}
                            checked={selectedOption === index_another}
                            onChange={() => handleChange(index_another)}
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
                            placeholder={props.question.placeholder_another}
                            className={cnMain("another-label-input-text")}
                            disabled={selectedOption !== index_another}
                            onChange={(e) => addText(e.target.value)}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
