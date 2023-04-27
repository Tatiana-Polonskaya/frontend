import { cn } from "@bem-react/classname";

import Arrow from "./assets/arrow.svg";

import "./style.scss";
import { ReactSVG } from "react-svg";

const cnLink = cn("link");

type LinkProps = {
    arrow?: "left" | "right";
} & React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

export default function Link(props: LinkProps) {
    return (
        <a {...props} className={`${props.className} ${cnLink()}`}>
            {props.arrow === "left" && (
                <ReactSVG
                    src={Arrow}
                    wrapper="span"
                    className={cnLink("arrow", { rotated: true })}
                />
            )}
            {props.children}
            {props.arrow === "right" && (
                <ReactSVG
                    src={Arrow}
                    wrapper="span"
                    className={cnLink("arrow")}
                />
            )}
        </a>
    );
}
