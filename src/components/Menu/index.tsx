
import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import MenuItem from "./MenuItem";
import iconSrc from "./icons/logo-mini.svg";

import images from "./icons";
import "./style.scss";

const cnMenu = cn("menu");

export default function Menu() {
    const titleMenu = [
        {
            id: 1,
            title: "Главная",
            url: "/",
            img: images.Home,
        },
        {
            id: 2,
            title: "Обучение",
            url: "/learning",
            img: images.Teacher,
        },
        {
            id: 3,
            title: "Репетиция",
            url: "/repetition",
            img: images.Repetition,
        },
        {
            id: 4,
            title: "Импровизация",
            url: "/improvisation",
            img: images.Improvization,
        },
        {
            id: 5,
            title: "Дневник",
            url: "/diary",
            img: images.Book,
        },
        {
            id: 6,
            title: "Настройки",
            url: "/settings",
            img: images.Setting,
        },
        {
            id: 7,
            title: "Выход",
            url: "/",
            img: images.Logout,
        },
    ];

    return (
        <div className={cnMenu()}>
            <ReactSVG src={iconSrc} className={cnMenu("logo")} />
            <ul>
                {titleMenu.map((el) => {
                    return (
                        <li>
                            <MenuItem item={el} id={el.id} key={el.id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
