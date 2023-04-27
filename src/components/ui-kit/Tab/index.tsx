import { MouseEventHandler } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";

type TabProps = {
    selected?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
};

const cnTab = cn("tab");
export default function Tab(props: TabProps) {
    return <button onClick={props.onClick} className={cnTab("button", {selected: props.selected})}>{props.children}</button>;
}
