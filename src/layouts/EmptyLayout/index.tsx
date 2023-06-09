import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactNode } from "react";

const cnEmptyLayout = cn("empty-layout");

type EmptyLayoutProps = {
    children?: ReactNode,
}

export default function EmptyLayout(props: EmptyLayoutProps) {
    return (
        <div className={cnEmptyLayout()}>
            <div className={cnEmptyLayout("content")}>{props.children}</div>
        </div>
    );
}
