import { cn } from "@bem-react/classname";

import "./style.scss";

const cnLink = cn("link");

export default function Link(
    props: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >
) {
    return (
        <a {...props} className={`${props.className} ${cnLink()}`}>
            {props.children}
        </a>
    );
}
