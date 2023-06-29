import { ReactNode, useState } from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import Arrow from "./icons/arrow-down.svg";

import "./style.scss";
import Visible from "./-Visible";
import Invisible from "./-Invisible";

const cnDropDown = cn("dropdown");

interface IDropdown {
    title?: string;
    subtitle?: string;
    visible?: ReactNode;
    invisible?: ReactNode;
}

export default function DropDown(props: IDropdown) {
    const [angle, setAngle] = useState(0);
    const [active, setActive] = useState("d-n");

    const openDrop = () => {
        if (angle === 90) {
            setAngle(0);
            setActive("d-n");
        } else {
            setAngle(90);
            setActive("");
        }
    };
    return (
        <div className={`${cnDropDown()}`}>
            <div className={`${cnDropDown("block")}`}>
                <div className={cnDropDown("header")}>
                    <ReactSVG
                        onClick={openDrop}
                        style={{ transform: `rotate(${angle}deg)` }}
                        className={cnDropDown("icon")}
                        src={Arrow}
                    />
                    <div className={cnDropDown("title")}>{props.title}</div>
                </div>
                <div className={cnDropDown("subtitle")}>
                    <p>{props.subtitle}</p>
                </div>
            </div>
            <Visible>{props.visible}</Visible>
            <div className={cnDropDown("invisible", active)}>
                <Invisible>{props.invisible}</Invisible>
            </div>
        </div>
    );
}
