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
import { userApi } from "../../store/api/user";
import { accountApi } from "../../store/api/account";

const cnMenu = cn("menuStyle");

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
                await dispatch(accountApi.endpoints.logout.initiate(null));
                await dispatch(logout());
                navigate(RoutesEnum.LOGIN);
            },
            img: images.Logout,
        },
    ];

    return (
        <div className={cnMenu()}>
            <ReactSVG src={iconSrc} className={cnMenu("logo")} />
            <ul>
                {items.map((props, idx) => (
                    <li key={idx}>
                        <MenuItem {...props} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
