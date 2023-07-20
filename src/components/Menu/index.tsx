import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import MenuItem from "./MenuItem";
import iconSrc from "./icons/logo-mini.svg";

import images from "./icons";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/slices/user";
import RoutesEnum from "../../models/routes";

import { useState } from "react";
import logoutImg from "./ModalExit/img/logout.svg";
import exitImg from "./ModalExit/img/exit.svg";
import Button from "../ui-kit/Button";
import ModalWindow from "../ModalWindow/ModalWindow";
const cnMenu = cn("menuStyle");

export default function Menu() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);

    const closeModal = () => {
        setIsModal(false);
    };

    const showModal = () => {
        setIsModal(true);
    };

    const location = useLocation();
    const currentLocation = location ? location.pathname.split("/")[1] : "";

    const items = [
        {
            title: "Главная",
            img: images.Home,
            onClick: () => navigate(RoutesEnum.HOME),
            current:
                currentLocation === RoutesEnum.HOME.split("/")[1] ||
                currentLocation === "",
        },
        // {
        //     title: "Обучение",
        //     onClick: () => navigate(RoutesEnum.LEARNING),
        //     img: images.Teacher,
        // },
        {
            title: "Репетиции",
            onClick: () => navigate(RoutesEnum.REPETITION),
            img: images.Repetition,
            current: currentLocation === RoutesEnum.REPETITION.split("/")[1],
        },
        // {
        //     title: "Импровизация",
        //     onClick: () => navigate(RoutesEnum.IMPROVISATION),
        //     img: images.Improvization,
        // },
        {
            title: "Дневник",
            onClick: () => navigate(RoutesEnum.DIARY),
            img: images.Book,
            current: currentLocation === RoutesEnum.DIARY.split("/")[1],
        },
        {
            title: "Настройки",
            onClick: () => navigate(RoutesEnum.SETTINGS),
            img: images.Setting,
            current: currentLocation === RoutesEnum.SETTINGS.split("/")[1],
        },
        {
            title: "Выход",
            onClick: showModal,
            img: images.Logout,
            current: false,
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
            <ModalWindow
                title="Выход"
                icon={logoutImg}
                isVisible={isModal}
                onClose={() => closeModal()}
            >
                <div className={cnMenu("modal")}>
                    <div className={cnMenu("ImgText")}>
                        <ReactSVG src={exitImg} />
                        <span className={cnMenu("textQ")}>
                            Вы уверены, что хотите выйти из аккаунта?
                        </span>
                        <span className={cnMenu("text")}>
                            Вы всегда сможете вернуться и продолжить тренировки
                            с нами, но к чему останавливаться?
                        </span>
                    </div>
                    <div className={cnMenu("modalBtn")}>
                        <Button
                            className={cnMenu("Btn")}
                            style={{ background: "#2477F4" }}
                        >
                            <span className="" onClick={() => closeModal()}>
                                Хочу остаться
                            </span>
                        </Button>
                        <Button
                            className={cnMenu("Btn")}
                            style={{ background: "#F3F5F9", color: "#37476A" }}
                        >
                            <span
                                className=""
                                onClick={async () => {
                                    // await dispatch(accountApi.endpoints.logout.initiate(null));
                                    await dispatch(logout());
                                    navigate(RoutesEnum.LOGIN);
                                }}>
                                Выйти из аккаунта
                            </span>
                        </Button>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}
