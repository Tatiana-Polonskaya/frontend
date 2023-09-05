import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

import { useLazyLoginQuery } from "../../../store/api/account";
import { PageType } from "../../../models/entry";

import UserTypeSwitch from "../-UserTypeSwitch";
import InfoFragment from "../-InfoFragment";
import EntryLayout from "../../../layouts/EntryLayout";
import LoginRegisterChanger from "../-LoginRegisterChanger";
import Button from "../../../components/ui-kit/Button";
import Link from "../../../components/ui-kit/Link";
import InputHeader from "../../../components/ui-kit/InputHeader";
import Input from "../../../components/ui-kit/Input";

import LoginImage from "./assets/login.svg"; // login_pic.png
import RegisterImageBusiness from "../RegisterPage/assets/reg-image-business.svg";

import "./style.scss";
import RoutesEnum from "../../../models/routes";
import PrimaryInfoBusiness from "../RegisterPage/PrimaryInfoBusiness";

enum UserType {
    Personal,
    Business,
}

const cnLoginPage = cn("login-page");

const INVALID_LOGIN_INIT_TEXT = "Поле не может быть пустым";

export default function LoginPage() {
    const userType = useAppSelector((state) => state.entry.userType);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailWrong, setEmailWrong] = useState(false);
    const [isPasswordWrong, setPasswordWrong] = useState(false);
    const [wrongEmailText, setWrongEmailText] = useState(
        INVALID_LOGIN_INIT_TEXT,
    );
    const [wrongPasswordText, setWrongPasswordText] = useState("");

    const [loginRequest, loginResponse] = useLazyLoginQuery();
    const { isFetching } = loginResponse;

    const location = useLocation();

    const from =
        ((location.state as any)?.from.pathname as string) || RoutesEnum.HOME;

    async function onSubmit() {
        try {
            const result = await loginRequest({ email, password });
            const { isSuccess, data } = result;
            if (isSuccess && data) {
                if (data.success) {
                    navigate(from);
                } else {
                    const error = data.error!;
                    setEmailWrong(false);
                    setPasswordWrong(false);
                    switch (error.code) {
                        case 10003:
                            setWrongPasswordText(error.msg);
                            setPasswordWrong(true);
                            break;
                        case 10015:
                            setWrongEmailText(error.msg);
                            setEmailWrong(true);
                            break;
                        default:
                            alert(error.msg);
                            break;
                    }
                }
            } else {
                alert("Ошибка сервера");
            }
        } catch (e) {
            alert(e);
        }
    }

    return (
        <EntryLayout
            image={
                // <img src={LoginImage} alt="login" className={cnLoginPage("image")}/>
                <ReactSVG
                    src={
                        userType === UserType.Personal
                            ? LoginImage
                            : RegisterImageBusiness
                    }
                    className={cnLoginPage("image")}
                />
            }
        >
            {userType === UserType.Personal ? (
                <>
                    <UserTypeSwitch />
                    <div className={cnLoginPage("padding")}><LoginRegisterChanger pageType={PageType.Login} /></div>
                    
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
                            <label>
                                <InputHeader
                                    text="Почта"
                                    wrong={isEmailWrong}
                                    wrongText={wrongEmailText}
                                />
                                <Input
                                    placeholder="Введите электронную почту"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    invalid={isEmailWrong}
                                />
                            </label>
                            <label>
                                <InputHeader
                                    text="Пароль"
                                    wrong={isPasswordWrong}
                                    wrongText={wrongPasswordText}
                                />
                                <Input
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    invalid={isPasswordWrong}
                                />
                            </label>

                            <Button
                                className={cnLoginPage("next-button")}
                                disabled={isFetching || !(email && password)}
                                onClick={onSubmit}
                                // onClick={() => loginRequest({ email, password })}
                            >
                                Продолжить
                            </Button>
                        </div>
                        <p>
                            <span className={cnLoginPage("span")}>
                                Забыли пароль?
                            </span>
                            &nbsp;
                            <Link
                                className={cnLoginPage("link")}
                                onClick={() => navigate(RoutesEnum.RESTORE)}
                            >
                                Восстановить
                            </Link>
                        </p>
                    </div>
                </>
            ) : (
                <PrimaryInfoBusiness />
            )}
        </EntryLayout>
    );
}
