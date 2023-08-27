import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import "./style.scss";

import Dropdown from "../../../Dropdown";
import Recomendation from "../-Recomendation";

import Note2 from "../../icons/note-2.svg";
import { IComp } from "../models/IComp";
import InformativeGraph from "../../../Graphs/Informative/InformativeGraph";
import UnityOfStyl from "../../../Graphs/UnityOfStyle/UnityOfStyl";

type Props = {
    component: IComp;
};
const cnConnectivity = cn("connectivity");

export default function ConnectivityBlock(props: Props) {
    return (
        <div className={`${cnConnectivity()}`}>
            <div className={cnConnectivity("content")}>
                <p>
                    {
                        "Логичная и последовательная связь компонентов выступления между собой, которые служат для передачи определенного сообщения и обеспечивают единое понимание темы выступления у слушателей"
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
