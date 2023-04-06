import { cn } from "@bem-react/classname";

import "./style.scss";

const cnMenu = cn("menu");

export default function Menu() {
    return <div className={cnMenu()}>menu</div>;
}
