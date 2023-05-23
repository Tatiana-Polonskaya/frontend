import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import { RegisterStep } from "../../../../models/entry";

import { useEffect, useRef, useState } from "react";
import isPasswordValid from "../../../../tools/validations/passwordValidation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { setStep } from "../../../../store/slices/entry";
import { setEmail } from "../../../../store/slices/register/personal";

import "./style.scss";
import {
    useLazyCheckEmailQuery,
    useRegisterMutation,
} from "../../../../store/api/register";
import InputHeader from "../../../../components/ui-kit/InputHeader";
import Input, { ForwardedInput } from "../../../../components/ui-kit/Input";

const cnSecondaryInfoPersonal = cn("secondary-info-personal");

const PASSWORD_ERROR_TEXT_INIT = "Пароли не совпадают";
const EMAIL_WRONG_TEXT_INIT = "Неверный формат почты";

export default function SecondaryInfoPersonal() {
    const dispatch = useAppDispatch();

    const { name, lastName, birthday, email } = useAppSelector(
        (state) => state.register.personal
    );
    const [checkEmailRequest, checkEmailResponse] = useLazyCheckEmailQuery();
    const [wrongEmailText, setWrongEmailText] = useState(EMAIL_WRONG_TEXT_INIT);
    const [isEmailValid, setEmailValid] = useState(true);

    const [registerRequest, registerResponse] = useRegisterMutation();
    const { isLoading, isSuccess, isError } = registerResponse;

    const emailInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        const isEmailValidLocal = emailInputRef.current?.checkValidity();

        if (!isEmailValidLocal) {
            setEmailValid(false);
            setWrongEmailText(EMAIL_WRONG_TEXT_INIT);
            return;
        }

        try {
            const checkEmailResponseData = await checkEmailRequest({
                email,
            }).unwrap();
            if (checkEmailResponseData.success) {
                dispatch(setStep(RegisterStep.SecondaryInfo));
            } else {
                setEmailValid(false);
                setWrongEmailText(
                    checkEmailResponseData.error?.msg || "Unknown error"
                );
            }
        } catch (e) {
            alert(e);
        }
    };

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

    const [isPasswordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState(
        PASSWORD_ERROR_TEXT_INIT
    );

    const birthdayInputRef = useRef<HTMLInputElement>(null);

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
                    {name}
                </span>
                !
            </p>
            <div className={cnSecondaryInfoPersonal("inputs")}>
                <label>
                    <InputHeader
                        text="Почта"
                        wrong={!isEmailValid}
                        wrongText={wrongEmailText}
                    />
                    <ForwardedInput
                        type="email"
                        required
                        placeholder="Укажите почту"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        onBlur={(e) => setEmailValid(e.target.checkValidity())}
                        ref={emailInputRef}
                        invalid={!isEmailValid}
                    />
                </label>
                <label>
                    <InputHeader text="Телефон" />
                    <ForwardedInput type="tel" placeholder="+7" />
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
                Завершить регистрацию
            </Button>
            <p className={cnSecondaryInfoPersonal("remark")}>
                Нажимая данную кнопку, вы подтверждаете корректность введенных
                данных.
            </p>
        </>
    );
}
