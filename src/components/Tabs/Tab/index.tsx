import React from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import noteIcon from "../icons/note-icon.svg"

type TabItem = {
    activeTab: string;
    label: string;
    onClick: Function;
    value: string;
    color: string;
    percent?:boolean;
};

export default function Tab({
    activeTab,
    label,
    onClick,
    value,
    color="#2477F4",
    percent=false
}: TabItem) {

    const cnTabs = cn("TabItem");

    const funcClick = () => {
        onClick(label);
    };

    return (
        <li className={cnTabs("tab-list-item",{active:activeTab === label})} onClick={funcClick}>
            {activeTab === label && !percent && (
                <ReactSVG
                className={cnTabs("icon")}
                   src={noteIcon}
                />
            )}
            {label}
            {(activeTab === label && !percent) && (
                <span
                    className={cnTabs("value")}
                    style={{ backgroundColor: color }}
                >
                    {value}
                </span>
            )}
            {(activeTab === label && percent) && (
                <span
                    className={cnTabs("percent")}
                    style={{ color: color }}
                >
                    {value}
                </span>
            )}
        </li>
    );
}
