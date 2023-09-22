import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import noteIcon from "../assets/note.svg";
import symbolT from "../assets/symbol-T.svg";

import "./style.scss";

type Props = {
    activeTab: string;
    label: string;
    onClick: Function;
};

export default function ColorfulTab({ activeTab, label, onClick }: Props) {
    const cnColorfulTab = cn("ColorfulTabItem");

    const funcClick = () => {
        onClick(label);
    };

    return (
        <li
            className={cnColorfulTab("tab-list-item", {
                active: activeTab === label,
            })}
            onClick={funcClick}
        >
            <ReactSVG
                className={cnColorfulTab("icon")}
                src={label === "Транскрипция речи" ? symbolT : noteIcon}
            />
            {label}
        </li>
    );
}
