import { ChangeEventHandler, useState } from "react";
import { cn } from "@bem-react/classname";

import ShowIcon from "./assets/show.svg";
import HideIcon from "./assets/hide.svg";

import "./style.scss";
import { ReactSVG } from "react-svg";

const cnTextInput = cn("text-input");

type TextInputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    password?: boolean;
};

export default function TextInput(props: TextInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <label className={cnTextInput()}>
            {props.label && (
                <span className={cnTextInput("label", { wrong: false })}>
                    {props.label}
                </span>
            )}
            <span className={cnTextInput("input-wrapper", { wrong: false })}>
                <input
                    className={cnTextInput("input")}
                    type={props.password && !showPassword ? "password" : "text"}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                {props.password && (
                    <ReactSVG
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={cnTextInput("eye")}
                        src={showPassword ? HideIcon : ShowIcon}
                        wrapper="span"
                    />
                )}
            </span>
        </label>
    );
}
