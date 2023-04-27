import { ReactSVG } from "react-svg";
import EntryLayout from "../../../layouts/EntryLayout";

import PasswordRestoreImage from "./assets/password-restore.svg";
import Link from "../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";

import "./style.scss";
import { cn } from "@bem-react/classname";

const cnPasswordRestorePage = cn("password-restore-page");

export default function PasswordRestorePage() {
    const navigate = useNavigate();

    return (
        <EntryLayout image={<ReactSVG src={PasswordRestoreImage} />}>
            <div className={cnPasswordRestorePage()}>
                <Link
                    onClick={() => navigate(-1)}
                    arrow="left"
                    className={cnPasswordRestorePage("return-link")}
                >
                    Вернуться
                </Link>
                <p className={cnPasswordRestorePage("title")}>
                    Восстановление пароля
                </p>
                <p className={cnPasswordRestorePage("description")}>
                    Введите почту, указанную при регистрации. Туда мы вышлем
                    новый пароль. Вы всегда можете изменить его в настройках.
                </p>
                <TextInput label="Почта" placeholder="Укажите почту" />
                <Button className={cnPasswordRestorePage("next-button")}>
                    Продолжить
                </Button>
            </div>
        </EntryLayout>
    );
}
