import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import { PageType } from "../../../../models/entry";

import LoginRegisterChanger from "../../-LoginRegisterChanger";
import Link from "../../../../components/ui-kit/Link";

import "./style.scss";
import RoutesEnum from "../../../../models/routes";

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
                onClick={() => navigate(RoutesEnum.REGISTER)}
            >
                Вернуться к регистрации
            </Link>
        </>
    );
}
