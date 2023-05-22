import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import { useConfirmQuery } from "../../../../store/api/register";

import Link from "../../../../components/ui-kit/Link";

import "./style.scss";
import RoutesEnum from "../../../../models/routes";

const cnFinishPersonal = cn("finish-personal");

export default function FinishPersonal({ token }: { token: string }) {
    const navigate = useNavigate();
    const response = useConfirmQuery(token);
    const { isLoading, isSuccess, isError, data, error } = response;

    return (
        <>
            {data?.success ? (
                <>
                    <p className={cnFinishPersonal("title")}>
                        Регистрация прошла успешно!
                    </p>
                    <p className={cnFinishPersonal("description")}>
                        Поздравляем! Ваш путь к успешным выступлениям начинается
                        прямо сейчас.
                    </p>
                </>
            ) : (
                <p className={cnFinishPersonal("title")}>
                    {data?.error?.msg ||
                        "Ошибка сети, повторите запрос позднее"}
                </p>
            )}
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
