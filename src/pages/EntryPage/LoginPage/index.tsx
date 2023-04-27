import { useState } from "react";

import EntryLayout from "../../../layouts/EntryLayout";

import LoginImage from "./assets/login.svg";
import { ReactSVG } from "react-svg";

import UserTypeSwitch from "../-UserTypeSwitch";
import InfoFragment from "../-InfoFragment";

import { cn } from "@bem-react/classname";

import "./style.scss";
import LoginRegisterChanger from "../-LoginRegisterChanger";
import { PageType } from "../types";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import Link from "../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";

enum UserType {
    Personal,
    Business,
}

const cnLoginPage = cn("login-page");

export default function LoginPage() {
    const [userType, setUserType] = useState(UserType.Personal);
    const navigate = useNavigate();

    return (
        <EntryLayout image={<ReactSVG src={LoginImage} />}>
            <UserTypeSwitch currentType={userType} setter={setUserType} />
            <LoginRegisterChanger pageType={PageType.Login} />
            <div className={cnLoginPage()}>
                <InfoFragment
                    phrase={
                        userType === UserType.Personal
                            ? "Готовы всех поразить?"
                            : "Путь к лучшему коллективу"
                    }
                    subphrase={
                        userType === UserType.Personal
                            ? "Каждое ваше выступление может быть лучшим."
                            : "Поможем сделать правильный выбор."
                    }
                />
                <div className={cnLoginPage("inputs")}>
                    <TextInput
                        label="Логин"
                        placeholder={
                            userType === UserType.Personal
                                ? "+7 XXX XXX XX XX"
                                : "Введите электронную почту"
                        }
                    />
                    <TextInput
                        label="Пароль"
                        placeholder="Введите пароль"
                        password
                    />
                    <Button className={cnLoginPage("next-button")}>
                        Продолжить
                    </Button>
                </div>
                <p>
                    <span>Забыли пароль?</span>&nbsp;
                    <Link
                        className={cnLoginPage("link")}
                        onClick={() => navigate("/restore")}
                    >
                        Восстановить
                    </Link>
                </p>
            </div>
        </EntryLayout>
    );
}
