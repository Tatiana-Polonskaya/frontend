import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import { useConfirmQuery } from "../../../../store/api/register";

import Link from "../../../../components/ui-kit/Link";

import "./style.scss";
import RoutesEnum from "../../../../models/routes";

const cnRegisterErrorPage = cn("register-error-page");

export default function RegisterErrorPage() {
    const navigate = useNavigate();

    return (
        <>
            <>
                <p className={cnRegisterErrorPage("title")}>
                    Во время регистрации произошла ошибка!
                </p>
                <p className={cnRegisterErrorPage("description")}>
                    Такое иногда случается. Пожалуйста, попробуйте пройти
                    регистрацию ещё раз.
                </p>
                <p className={cnRegisterErrorPage("description")}>
                    Если ошибка будет настойчиво сохраняться, сообщите об этом в
                    службу поддержки, и мы попробуем помочь вам в решении этой
                    проблемы!
                </p>
                <p className={cnRegisterErrorPage("description")}>
                    Нужна помощь? <Link>support@speechup.ru</Link>
                </p>
            </>

            <Link
                className={cnRegisterErrorPage("link")}
                arrow="right"
                onClick={() => navigate(RoutesEnum.REGISTER)}
            >
                Вернуться к началу регистрации
            </Link>
            <Link className={cnRegisterErrorPage("link")} arrow="right">
                Изучить возможности сервиса
            </Link>
        </>
    );
}
