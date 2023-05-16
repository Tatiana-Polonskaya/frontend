import { useState } from "react";
import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import { useNavigate } from "react-router-dom";
import { useLazyPasswordRestoreQuery } from "../../../store/api/account";

import EntryLayout from "../../../layouts/EntryLayout";
import PasswordRestoreImage from "./assets/password-restore.svg";
import Link from "../../../components/ui-kit/Link";
import Button from "../../../components/ui-kit/Button";

import InputHeader from "../../../components/ui-kit/InputHeader";
import Input from "../../../components/ui-kit/Input";

import "./style.scss";

const cnPasswordRestorePage = cn("password-restore-page");

export default function PasswordRestorePage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isProcessed, setIsProcessed] = useState(false);
    const [isError, setIsError] = useState(false);
    const [restorePasswordRequest, restorePasswordResponse] =
        useLazyPasswordRestoreQuery();

    const [errorMessage, setErrorMessage] = useState<string>();
    const { isFetching } = restorePasswordResponse;
    const onSubmit = async () => {
        try {
            const response = await restorePasswordRequest(email).unwrap();
            if (response.success) {
                setIsProcessed(true);
            } else {
                setErrorMessage(response.error?.msg);
                setIsError(true);
            }
        } catch (e) {
            alert(e);
        }
    };

    return (
        <EntryLayout image={<ReactSVG src={PasswordRestoreImage} />}>
            <div className={cnPasswordRestorePage()}>
                {isProcessed ? (
                    <>
                        <p className={cnPasswordRestorePage("title")}>
                            Новый пароль выслан вам на почту!
                        </p>
                        <p className={cnPasswordRestorePage("description")}>
                            Продолжайте пользоваться всеми возможностями Speech
                            Up.
                        </p>
                        <Link
                            arrow="right"
                            onClick={() => navigate("/login")}
                            className={cnPasswordRestorePage("link")}
                        >
                            Войти в аккаунт
                        </Link>
                        <Link
                            arrow="right"
                            className={cnPasswordRestorePage("link")}
                        >
                            Изучить возможности сервиса
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            onClick={() => navigate(-1)}
                            arrow="left"
                            className={cnPasswordRestorePage("link")}
                        >
                            Вернуться
                        </Link>
                        <p className={cnPasswordRestorePage("title")}>
                            Восстановление пароля
                        </p>
                        <p className={cnPasswordRestorePage("description")}>
                            Введите почту, указанную при регистрации. Туда мы
                            вышлем новый пароль. Вы всегда можете изменить его в
                            настройках.
                        </p>
                        <label>
                            <InputHeader
                                text="Почта"
                                wrongText={errorMessage}
                                wrong={isError}
                            />
                            <Input
                                type="email"
                                placeholder="Укажите почту"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                invalid={isError}
                            />
                        </label>

                        <Button
                            className={cnPasswordRestorePage("next-button")}
                            onClick={onSubmit}
                            disabled={isFetching}
                        >
                            Продолжить
                        </Button>
                    </>
                )}
            </div>
        </EntryLayout>
    );
}
