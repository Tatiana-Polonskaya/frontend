import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import MenuItem from "./MenuItem";
import iconSrc from "./icons/logo-mini.svg";

import images from "./icons";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/slices/user";
import RoutesEnum from "../../models/routes";

const cnMenu = cn("menu");

export default function Menu() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const items = [
        {
            title: "Главная",
            img: images.Home,
            onClick: () => navigate(RoutesEnum.HOME),
        },
        {
            title: "Обучение",
            onClick: () => navigate(RoutesEnum.LEARNING),
            img: images.Teacher,
        },
        {
            title: "Репетиция",
            onClick: () => navigate(RoutesEnum.REPETITION),
            img: images.Repetition,
        },
        {
            title: "Импровизация",
            onClick: () => navigate(RoutesEnum.IMPROVISATION),
            img: images.Improvization,
        },
        {
            title: "Дневник",
            onClick: () => navigate(RoutesEnum.DIARY),
            img: images.Book,
        },
        {
            title: "Настройки",
            onClick: () => navigate(RoutesEnum.SETTINGS),
            img: images.Setting,
        },
        {
            title: "Выход",
            onClick: async () => {
                await dispatch(logout());
                navigate(RoutesEnum.LOGIN);
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
