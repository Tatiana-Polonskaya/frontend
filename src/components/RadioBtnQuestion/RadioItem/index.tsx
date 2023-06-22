import React, { useState } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";

type Props = {
    idItem: number;
    titleItem: string;
    addAnswers: Function;
    currentIdItem: number;
}


export default function RadioItem(props: Props) {
    const cnRadioItem = cn("RadioItem");

    function handleChange(id: number) {
        props.addAnswers(id);
    }

    return (
        <div>
            <div
                className={cnRadioItem(`col-answers-item`, {
                    checked: props.idItem === props.currentIdItem,
                })}
            >

                <label
                    className={cnRadioItem(
                        `col-answers-item-label`
                    )}
                >
                    <input
                        type="radio"
                        value={props.idItem}
                        checked={props.idItem === props.currentIdItem}
                        onChange={() => handleChange(props.idItem)}
                        className={cnRadioItem(
                            `col-answers-item-label-radio`
                        )}
                    />
                    <div
                        className={cnRadioItem(
                            `col-answers-item-label-custom-radio__label`
                        )}
                    >
                        <strong>{props.titleItem}</strong>
                    </div>
                </label>
            </div>
        </div>
    );
}
