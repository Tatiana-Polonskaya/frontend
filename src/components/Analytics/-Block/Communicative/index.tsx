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
const cnCommunicative = cn("communicative");

export default function CommunicativeBlock(props: Props) {
    return (
        <div className={`${cnCommunicative()}`}>
            <div className={cnCommunicative("content")}>
                <p>
                    {
                        "Умение правильно и эффективно использовать язык и другие коммуникативные инстументы для того, чтобы эффективно общаться с аудиторией и передавать свои мысли и идеи."
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
