import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import Link from "../../../../components/ui-kit/Link";

import "./style.scss";
import RoutesEnum from "../../../../models/routes";

const cnFinishPersonal = cn("finish-personal");

export default function ActivationPageSuccess() {
    const navigate = useNavigate();

    return (
        <>
            <>
                <p className={cnFinishPersonal("title")}>
                    Регистрация прошла успешно!
                </p>
                <p className={cnFinishPersonal("description")}>
                    Поздравляем! Ваш путь к успешным выступлениям начинается
                    прямо сейчас.
                </p>
            </>

            <Link
                className={cnFinishPersonal("link")}
                arrow="right"
                onClick={() => navigate(RoutesEnum.LOGIN)}
            >
                Войти в аккаунт
            </Link>
            <Link className={cnFinishPersonal("link")} arrow="right">
                Изучить возможности сервиса
            </Link>
        </>
    );
}
