import { cn } from "@bem-react/classname";

import "./style.scss";

import Dropdown from "../../../Dropdown";
import Recomendation from "../-Recomendation";

import { IComp } from "../models/IComp";

type Props = {
    component: IComp;
};
const cnDefinition = cn("definition");

export default function ClarityBlock(props: Props) {
    return (
        <div className={`${cnDefinition()}`}>
            <div className={cnDefinition("content")}>
                <p>
                    Способность выразить свои мысли в ясной, доходчивой и
                    понятной форме.
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
