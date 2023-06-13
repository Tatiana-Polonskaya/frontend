import { ReactNode } from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";

type Props = {
    children?: ReactNode;
};

const cnInvisible = cn("invisible");

export default function Visible(props: Props) {
    return (
        <>
            <section className={cnInvisible("main")}>{props.children}</section>
        </>
    );
}
