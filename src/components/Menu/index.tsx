import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import MenuItem from "./MenuItem";
import iconSrc from "./icons/logo-mini.svg";

import images from "./icons";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/slices/user";

const cnMenu = cn("menu");

export default function Menu() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const items = [
        {
            title: "Главная",
            img: images.Home,
            onClick: () => navigate("/"),
        },
        {
            title: "Обучение",
            onClick: () => navigate("/learning"),
            img: images.Teacher,
        },
        {
            title: "Репетиция",
            onClick: () => navigate("/repetition"),
            img: images.Repetition,
        },
        {
            title: "Импровизация",
            onClick: () => navigate("/improvisation"),
            img: images.Improvization,
        },
        {
            title: "Дневник",
            onClick: () => navigate("/diary"),
            img: images.Book,
        },
        {
            title: "Настройки",
            onClick: () => navigate("/settings"),
            img: images.Setting,
        },
        {
            title: "Выход",
            onClick: async () => {
                await dispatch(logout());
                navigate("/login");
            },
            img: images.Logout,
        },
    ];

    const uniqueFactory = () => window.crypto.randomUUID(); // not works with SSR
    return (
        <div className={cnMenu()}>
            <ReactSVG src={iconSrc} className={cnMenu("logo")} />
            <ul>
                {items.map((props, idx) => (
                    <li key={uniqueFactory()}>
                        <MenuItem {...props} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
