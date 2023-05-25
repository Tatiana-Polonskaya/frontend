import { useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import svgg from "../Menu/icons/book.svg";

type Props ={
    question : Question;
    addAnswers: Function;
    addAnotherAnswers:Function;
}

type Question = {
    id: number;
    title: string;
    answers: Answer[];
    block_another?: boolean;
    placeholder_another?: string;
    icons?: boolean;
    type?:string;
    type_answer?:string;
}

type Answer = {
    id:number;
    title: string;
    icon?:string;
}

export default function CheckboxQuestion(props: Props) {
    const cnMain = cn("checkbox-main");

    const [checkedState, setCheckedState] = useState(
        new Array(props.question.answers.length+1).fill(false)
    );
    const index_another = props.question.answers.length;

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        props.addAnswers(updatedCheckedState, props.question.id-1);
    }

    const addText = (value: string) => {
        props.addAnotherAnswers(props.question.id - 1, value);
    };

    return (
        <div className={cnMain()}>
            <h3 className={cnMain("title")}>{props.question.id}. {props.question.title}</h3>
            <div className={cnMain(`${props.question.type_answer}`)}>
                
                {props.question.answers.map((el, index) => (
                    <div
                        key={el.id}
                        className={cnMain("block-answers-item")}
                    >
                        <label
                            className={cnMain("block-answers-item-label")}
                        >
                            <input
                                type="checkbox"
                                id={`question-checkbox-${index}`}
                                value={el.id}
                                name={el.title}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                                className={cnMain("block-answers-item-check")}
                            />
                            <span className={cnMain("block-answers-item-span")}>{el.title}</span>
                        </label>
                    </div>
                ))}
            </div>
            {props.question.block_another && (
                    <div className={cnMain("block-answers-item")}>
                        <label className={cnMain("block-answers-item-label")}>
                            <input
                                type="checkbox"
                                value={index_another}
                                className={cnMain("block-answers-item-check")}
                                checked={checkedState[index_another]}
                                onChange={() => handleOnChange(index_another)}
                            />
                            <div className={cnMain("block-answers-item-span")}>
                                Другое:
                            </div>     
                            <input
                                type="text"
                                placeholder={props.question.placeholder_another}
                                className={cnMain(
                                    "block-answers-item-input-text"
                                )}
                                disabled={!checkedState[index_another]}
                                onChange={(e) => addText(e.target.value)}
                            />
                        </label>
                    </div>
                )}
        </div>
    );
}
