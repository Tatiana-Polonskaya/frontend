import { cn } from "@bem-react/classname";

import "./style.scss";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import { UserType } from "../types";

const cnLoginFragment = cn("login-fragment");

interface LoginFragmentProps {
    userType: UserType;
}

export default function LoginFragment(props: LoginFragmentProps) {
    return (
        <>
            <p className={cnLoginFragment("phrase")}>
                {props.userType === UserType.Personal
                    ? "Готовы всех поразить?"
                    : "Путь к лучшему коллективу"}
            </p>
            <p className={cnLoginFragment("subphrase")}>
                {props.userType === UserType.Personal
                    ? "Каждое ваше выступление может быть лучшим."
                    : "Поможем сделать правильный выбор."}
            </p>
            <TextInput
                label="Логин"
                placeholder={
                    props.userType === UserType.Personal
                        ? "+7 XXX XXX XX XX"
                        : "Введите электронную почту"
                }
            />
            <TextInput label="Пароль" placeholder="Введите пароль" password />
            <Button className={cnLoginFragment("next-button")}>
                Продолжить
            </Button>
        </>
    );
}
