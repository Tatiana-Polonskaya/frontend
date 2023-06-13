import { ReactNode } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";

type Props = {
    children?: ReactNode;
};

const cnVisible = cn("visible");

export default function Visible(props: Props) {
    return (
        <div className={`${cnVisible()}`}>
            <section className={cnVisible("main")}>{props.children}</section>
        </div>
    );
}
