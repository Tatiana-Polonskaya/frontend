import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import "./style.scss";

type Props = {
    item: Item;
};

type Item = {
    title: string;
    url: string;
    img: string;
};

const cnMenuItem = cn("menu-item");

export default function MenuItem(props: Props) {
    const navigate = useNavigate();

    return (
        <div className={cnMenuItem()} onClick={() => navigate(props.item.url)}>
            <span className={cnMenuItem("span-logo")}>
                <ReactSVG
                    src={props.item.img}
                    className={cnMenuItem("ul-logo")}
                />
            </span>
            <span>{props.item.title}</span>
        </div>
    );
}
