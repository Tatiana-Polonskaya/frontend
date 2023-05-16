import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import { RegisterStep } from "../../../../models/entry";

import { useEffect, useRef, useState } from "react";
import isPasswordValid from "../../../../tools/validations/passwordValidation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
    setCity,
    setBirthday,
} from "../../../../store/slices/entry/register/secondaryInfo/personal";
import { setStep } from "../../../../store/slices/entry/register";

import "./style.scss";
import { useRegisterMutation } from "../../../../store/api/register";
import InputHeader from "../../../../components/ui-kit/InputHeader";
import Input, { ForwardedInput } from "../../../../components/ui-kit/Input";

const cnSecondaryInfoPersonal = cn("secondary-info-personal");

const PASSWORD_ERROR_TEXT_INIT = "Пароли не совпадают";

export default function SecondaryInfoPersonal() {
    const primaryInfo = useAppSelector((state) => state.entry.register.primary);
    const info = useAppSelector(
        (state) => state.entry.register.secondary.personal
    );
    const dispatch = useAppDispatch();
    const [registerRequest, registerResponse] = useRegisterMutation();
    const { isLoading, isSuccess, isError } = registerResponse;

    useEffect(() => {
        if (isSuccess) {
            const data = registerResponse.data;
            if (data.success) {
                dispatch(setStep(RegisterStep.EmailVerification));
            } else {
                alert(data.error?.msg);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isLoading) {
            /// some loading action
        }
    }, [isLoading]);

    useEffect(() => {
        if (isError) {
            const error = registerResponse.error as Response;
            alert(`Error with status code ${error.status}`);
            console.log(registerResponse.error);
        }
    }, [isError]);

    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [isBirthdayError, setBirthdayError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState(
        PASSWORD_ERROR_TEXT_INIT
    );

    const birthdayInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        setBirthdayError(false);
        setPasswordError(false);
        if (birthdayInputRef.current && info.birthday) {
            const year = new Date(info.birthday).getFullYear();
            const isYearNotValid =
                year < 1900 || year > new Date().getFullYear();
            setBirthdayError(isYearNotValid);
        } else {
            setBirthdayError(true);
        }

        if (password !== passwordRepeat) {
            setPasswordError(true);
            setPasswordErrorText(PASSWORD_ERROR_TEXT_INIT);
        } else if (!isPasswordValid(password)) {
            setPasswordError(true);
            setPasswordErrorText("См. подсказку");
        }

        if (
            !isPasswordError &&
            password === passwordRepeat &&
            !isBirthdayError &&
            info.birthday
        ) {
            registerRequest({
                firstname: primaryInfo.name,
                lastname: primaryInfo.lastName,
                email: primaryInfo.email,
                birthday: info.birthday,
                password,
            });
        }
    };

    return (
        <>
            <Link
                className={cnSecondaryInfoPersonal("back-link")}
                onClick={() => dispatch(setStep(RegisterStep.PrimaryInfo))}
                arrow="left"
            >
                Вернуться
            </Link>
            <p className={cnSecondaryInfoPersonal("title")}>
                Приветствуем,{" "}
                <span
                    className={cnSecondaryInfoPersonal("title", { name: true })}
                >
                    {primaryInfo.name}
                </span>
                !
            </p>
            <div className={cnSecondaryInfoPersonal("inputs")}>
                <label>
                    <InputHeader
                        text="Дата рождения"
                        wrong={isBirthdayError}
                        wrongText="Некорректная дата"
                    />
                    <ForwardedInput
                        type="date"
                        min="1900-01-01"
                        value={info.birthday}
                        onChange={(e) => dispatch(setBirthday(e.target.value))}
                        max={new Date().toLocaleDateString("fr-ca")}
                        ref={birthdayInputRef}
                    />
                </label>
                <label>
                    <InputHeader text="Город" />
                    <Input
                        placeholder="Введите свой город"
                        value={info.city}
                        onChange={(e) => dispatch(setCity(e.target.value))}
                    />
                </label>
                <label>
                    <InputHeader
                        text="Пароль"
                        wrong={isPasswordError}
                        wrongText={passwordErrorText}
                        helpText={`Не менее 8 символов.
                            Минимум 1 латинская буква верхнего и нижнего регистра.
                            Минимум 1 цифра или символ (~!@#$%^&*_-+=\`|\(){}[]:;"'<>,.?/)`}
                    />
                    <Input
                        placeholder="Придумайте пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        invalid={isPasswordError}
                    />
                </label>
                <label>
                    <InputHeader
                        text="Подтверждение пароля"
                        wrong={isPasswordError}
                    />
                    <Input
                        placeholder="Повторите пароль"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        type="password"
                        invalid={isPasswordError}
                    />
                </label>
            </div>
            <Button
                className={cnSecondaryInfoPersonal("next-button")}
                disabled={isLoading}
                onClick={onSubmit}
            >
                Продолжить
            </Button>
        </>
    );
}
