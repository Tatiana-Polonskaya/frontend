import React, { ReactNode, useState } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { ReactSVG } from "react-svg";

type Props = {
    title: string;
    icon?: string;
    children: ReactNode[] | ReactNode;
};

export default function RollUp(props: Props) {
    const cnRollUp = cn("RollUp");
    const stateBtn = ["Свернуть блок", "Развернуть блок"];
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={cnRollUp()}>
            <div className={cnRollUp("header")}>
                {props.icon && <ReactSVG src={props.icon} className={cnRollUp("icon")}/>}
                <span className={cnRollUp("title")}>{props.title}</span>
                <span onClick={()=>setIsShow(prev=>!prev)} className={cnRollUp("btn")}>{isShow ? stateBtn[0] : stateBtn[1]}</span>
            </div>
            {isShow && <div className={cnRollUp("content")}>{props.children}</div>}
        </div>
    );
}
