import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactNode } from "react";

const cnEntryLayout = cn("entry-layout");

type EntryLayoutProps = {
    children?: ReactNode,
    image?: ReactNode,
}

export default function EntryLayout(props: EntryLayoutProps) {
    return (
        <div className={cnEntryLayout()}>
            <div className={cnEntryLayout("content")}>{props.children}</div>
            <div className={cnEntryLayout("image")}>{props.image}</div>
        </div>
    );
}
