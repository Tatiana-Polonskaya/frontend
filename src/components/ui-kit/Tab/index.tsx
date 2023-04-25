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
    // return (
    //     <label className={cnTab("label", { checked: props.selected })}>
    //         <input
    //             className={cnTab("input")}
    //             type="radio"
    //             checked={props.selected}
    //             onChange={props.changer}
    //         />
    //         {props.children}
    //     </label>
    // );
    return <button onClick={props.onClick} className={cnTab("button", {selected: props.selected})}>{props.children}</button>;
}
