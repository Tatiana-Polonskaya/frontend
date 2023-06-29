import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import "./style.scss";

import Dropdown from "../../../Dropdown";
import Recomendation from "../-Recomendation";

import { IComp } from "../models/IComp";

type Props = {
    component: IComp;
};
const cnArgumentation = cn("argumentation");

export default function ArgumentationBlock(props: Props) {
    return (
        <div className={`${cnArgumentation()}`}>
            <div className={cnArgumentation("content")}>
                <p>
                    {
                        "Способность выступающего подтверждать свои утверждения обоснованными фактами, доказательствами, примерами и логическими операциями, умение логически связывать свои мысли со свидетельствами и доказательствами."
                    }
                </p>
            </div>
            {/* <Dropdown component={props.component} /> */}
            {props.component.child.map((el, ind) => (
                <Dropdown
                    key={ind}
                    title={el.childTitle}
                    subtitle={el.childSubtitle}
                    visible={el.visible}
                    invisible={el.invisible}
                />
            ))}
            <Recomendation />
        </div>
    );
}
