import { DetailedHTMLProps, LabelHTMLAttributes, useState } from "react";

import { cn } from "@bem-react/classname";

import HelpIcon from "./assets/help-icon.svg";
import "./style.scss";
import { ReactSVG } from "react-svg";

type InputHeaderProps = {
    text?: string;
    wrong?: boolean;
    wrongText?: string;
    helpText?: string;
};

const cnInputHeader = cn("input-header");

export default function InputHeader(props: InputHeaderProps) {
    const [helpVisible, setHelpVisible] = useState(false);
    return (
        <div className={cnInputHeader()}>
            <span>
                {props.text && (
                    <span
                        className={cnInputHeader("label-text", {
                            wrong: props.wrong,
                        })}
                    >
                        {props.text}
                    </span>
                )}
                {props.wrong && props.wrongText && (
                    <span className={cnInputHeader("wrong-text")}>
                        {props.wrongText}
                    </span>
                )}
            </span>
            {props.helpText && (
                <>
                    <ReactSVG
                        className={cnInputHeader("help-icon", {
                            selected: helpVisible,
                        })}
                        src={HelpIcon}
                        onMouseEnter={() => setHelpVisible(true)}
                        onMouseLeave={() => setHelpVisible(false)}
                    />
                    <div
                        className={cnInputHeader("help-window", {
                            hidden: !helpVisible,
                        })}
                    >
                        {props.helpText}
                    </div>
                </>
            )}
        </div>
    );
}
