import { cn } from "@bem-react/classname";

import "./style.scss";
import { ReactElement, ReactNode, useState } from "react";
import Tab from "./Tab";

export enum TYPE_TABS {
    PERCENT = "percent",
    TEXT_VALUE = "value",
}

type Props = {
    children: Array<ReactNode>;
    type:TYPE_TABS
};

export default function Tabs(props: Props) {
    const cnTabs = cn("Tabs");

    const children = props.children as ReactElement[];
    const [activeTab, setActiveTab] = useState(children[0].props['data-title']);

    const onClickTabItem = (label: string) => { 
        setActiveTab(label);
    };

    return (
        <div className={cnTabs()}>
            <ul className={cnTabs("list")}>
                {children.map((child) => {
                    return (
                        <Tab
                            key={child.props['data-title']}
                            activeTab={activeTab}
                            label={child.props['data-title']}
                            value={child.props['data-value']}
                            color={child.props.color}
                            onClick={onClickTabItem}
                            percent={props.type === TYPE_TABS.PERCENT}
                        />
                    );
                })}
            </ul>

            <div className={cnTabs("content")}>
                {children.map((child) => {
                    if (child.props['data-title'] !== activeTab) return undefined;
                    return child;
                })}
            </div>
        </div>
    );
}
