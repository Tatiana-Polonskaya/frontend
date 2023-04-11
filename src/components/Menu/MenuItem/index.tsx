import { ReactSVG } from "react-svg"
import { cn } from "@bem-react/classname";

import "./style.scss"

type Props = {
    id: number;
    item: Item;
};
type Item = {
    title: string;
    url: string;
    img: string;
};

const cnMenuItem = cn("menu-item")

export default function MenuItem(props: Props) {
    return (
        <>
            <span className={cnMenuItem("span-logo")}>
                <ReactSVG src={props.item.img} className={cnMenuItem("ul-logo")} />
            </span>
            <span>{props.item.title}</span>
        </>
    );
}
