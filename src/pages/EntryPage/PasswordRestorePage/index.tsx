import { ReactSVG } from "react-svg";
import EntryLayout from "../../../layouts/EntryLayout";

import PasswordRestoreImage from "./assets/password-restore.svg";
import Link from "../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";

export default function PasswordRestorePage() {
    const navigate = useNavigate();

    return (
        <EntryLayout image={<ReactSVG src={PasswordRestoreImage} />}>
            <Link onClick={() => navigate(-1)}>Вернуться</Link>
            <p>Восстановление пароля</p>
            <p>Введите почту, указанную при регистрации. Туда мы вышлем новый пароль. Вы всегда можете изменить его в настройках.</p>
            <TextInput label="Почта" placeholder="Укажите почту" />
            <Button>Продолжить</Button>
        </EntryLayout>
    );
}
