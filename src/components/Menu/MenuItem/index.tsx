import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { MouseEventHandler } from "react";

type Props = {
    title: string;
    onClick: MouseEventHandler<HTMLElement>;
    img: string;
    current: boolean;
};

export default function MenuItem(props: Props) {
    const cnMenuItem = cn("MenuItem");

    return (
        <div className={cnMenuItem({selected:props.current})} onClick={props.onClick}>
            <span className={cnMenuItem("span-logo")}>
                <ReactSVG
                    src={props.img}
                    className={cnMenuItem("span-logo-svg")}
                />
            </span>
            <span>{props.title}</span>
        </div>
    );
}
