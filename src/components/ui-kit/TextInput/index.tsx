import { cn } from "@bem-react/classname";

import "./style.scss";
import { ChangeEventHandler } from "react";

const cnTextInput = cn("text-input");

type TextInputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    password?: boolean;
};

export default function TextInput(props: TextInputProps) {
    return (
        <label className={cnTextInput()}>
            {props.label && (
                <span className={cnTextInput("label", { wrong: false })}>
                    {props.label}
                </span>
            )}
            <input
                className={cnTextInput("input", { wrong: false })}
                type={props.password ? "password" : "text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    );
}
