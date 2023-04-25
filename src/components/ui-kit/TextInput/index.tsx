import { cn } from "@bem-react/classname";

import "./style.scss";
import { ChangeEventHandler } from "react";

const cnTextInput = cn("text-input");

type TextInputProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function TextInput(props: TextInputProps) {
    return (
        <label className={cnTextInput()}>
            <span>{props.label}</span>
            <input
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    );
}
