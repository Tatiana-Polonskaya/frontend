import { cn } from "@bem-react/classname";

import "./style.scss"

const cnButton = cn("button");

export default function Button(
    props: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) {
    const newProps = {...props, className: cnButton()}
    return (
        <button {...props} className={`${props.className} ${cnButton()}`}>
            {props.children}
        </button>
    );
}
