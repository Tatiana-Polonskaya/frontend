import { cn } from "@bem-react/classname";

import "./style.scss";
import { ReactNode, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import deleteBtn from "./assets/delete-btn.svg";
import plusBtn from "./assets/plus-btn.svg";

type Props = {
    saveResultPlan: Function;
};

export default function ListInput(props: Props) {
    const ListInputStyle = cn("ListInput");

    const [inputValues, setInputValues] = useState<Array<String>>(
        new Array(1).fill("")
    );

    const addInput = () => {
        setInputValues((inputValues) => [...inputValues, ""]);
    };

    const removeInput = (index: number) => {
        if (inputValues.length > 1) {
            let temp = [
                ...inputValues.slice(0, index),
                ...inputValues.slice(index + 1),
            ];
            setInputValues(temp);
        }
    };

    const addInputValues = (index: number, value: string) => {
        let temp = [...inputValues];
        temp[index] = value;
        setInputValues(temp);
    };

    useEffect(() => {
        props.saveResultPlan(inputValues);
    }, [inputValues]);

    return (
        <div className={ListInputStyle()}>
            <div className={ListInputStyle("list-block-input")}>
                {inputValues.map((el, id) => (
                    <div className={ListInputStyle("block-input")} key={id}>
                        <span className={ListInputStyle("index")}>
                            {id + 1}:
                        </span>
                        <input
                            id={"" + id}
                            key={id}
                            className={ListInputStyle("input")}
                            value={el + ""}
                            onChange={(e) => addInputValues(id, e.target.value)}
                        />

                        <p className={ListInputStyle("block-input-btn")}>
                            <ReactSVG
                                src={deleteBtn}
                                onClick={() => removeInput(id)}
                            />
                        </p>
                    </div>
                ))}
            </div>

            <button
                className={ListInputStyle("button")}
                onClick={() => addInput()}
            >
                <ReactSVG src={plusBtn} />
                Добавить еще пункт
            </button>
        </div>
    );
}
