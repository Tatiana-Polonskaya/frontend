import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import "./style.scss";

import Recomendation from "../-Recomendation";

import { ICompDinamism } from "../../../Analytics/-Block/models/ICompDinamism";
import Dropdown from "../../../Dropdown";

type Props = {
    component: ICompDinamism;
};
const cnDinamism = cn("dinamism");

export default function DinamismBlock(props: Props) {
    return (
        <div className={`${cnDinamism()}`}>
            <div className={cnDinamism("content")}>
                <p>
                    {
                        "Способность выражать свои мысли и идеи с помощью энергичного и живого выступления, проявление активности, энтузиазма в речи."
                    }
                </p>
            </div>
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
