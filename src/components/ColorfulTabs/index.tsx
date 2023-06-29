import { cn } from '@bem-react/classname';
import React, { ReactElement, ReactNode, useState } from 'react'
import ColorfulTab from './ColorofulTab';

import "./style.scss";

type Props ={
    children: Array<ReactNode>;
}

export default function ColorfulTabs(props: Props) {
    const cnColorfulTab = cn("ColorfulTabs");

    const children = props.children as ReactElement[];
    const [activeTab, setActiveTab] = useState(children[1].props.title);

    const onClickTabItem = (title: string) => {
        setActiveTab(title);
    };

    return (
        <div className={cnColorfulTab()}>
            <ul className={cnColorfulTab("list")}>
                {children.map((child) => {
                    return (
                        <ColorfulTab
                            key={child.props.title}
                            activeTab={activeTab}
                            label={child.props.title}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ul>

            <div className={cnColorfulTab("content")}>
                {children.map((child) => {
                    if (child.props.title !== activeTab) return undefined;
                    return child;
                })}
            </div>
        </div>
    );
}
