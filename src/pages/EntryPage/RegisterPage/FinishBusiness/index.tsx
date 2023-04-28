import { cn } from "@bem-react/classname";
import LoginRegisterChanger from "../../-LoginRegisterChanger";
import { PageType } from "../../types";
import Link from "../../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const cnFinishBusiness = cn("finish-business");

export default function FinishBusiness() {
    const navigate = useNavigate();
    return (
        <>
            <LoginRegisterChanger pageType={PageType.Register} />
            <p className={cnFinishBusiness("title")}>
                Спасибо за заполнение заявки!
            </p>
            <p className={cnFinishBusiness("description")}>
                Наш менеджер свяжется с Вами в ближайшее время и сориентирует по
                дальнейшим шагам сотрудничества!
            </p>
            <Link className={cnFinishBusiness("link")} arrow="right">
                Изучить возможности сервиса
            </Link>
            <Link
                className={cnFinishBusiness("link")}
                arrow="right"
                onClick={() => navigate("/login")}
            >
                Вернуться к регистрации
            </Link>
        </>
    );
}
