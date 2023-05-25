import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { MouseEventHandler } from "react";

type Props = {
    title: string;
    onClick: MouseEventHandler<HTMLElement>;
    img: string;
};

const cnMenuItem = cn("menu-item");

export default function MenuItem(props: Props) {

    return (
        <div className={cnMenuItem()} onClick={props.onClick}>
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
