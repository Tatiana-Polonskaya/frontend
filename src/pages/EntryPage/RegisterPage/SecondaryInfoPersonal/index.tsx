import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import { RegisterStep } from "../../../../models/entry";

import { useEffect, useRef, useState } from "react";
import checkPasswordRegex from "../../../../tools/validations/passwordValidation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { setStep } from "../../../../store/slices/entry";
import { setEmail, setTel } from "../../../../store/slices/register/personal";

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

    const { name, lastName, birthday, city, email, tel } = useAppSelector(
        (state) => state.register.personal
    );
    const [checkEmailRequest] = useLazyCheckEmailQuery();
    const [wrongEmailText, setWrongEmailText] = useState(EMAIL_WRONG_TEXT_INIT);
    const [isEmailValid, setEmailValid] = useState(true);
    const [isTelValid, setTelValid] = useState(true);

    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [isPasswordValid, setPasswordValid] = useState(true);
    const [passwordErrorText, setPasswordErrorText] = useState(
        PASSWORD_ERROR_TEXT_INIT
    );

    const [registerRequest, registerResponse] = useRegisterMutation();
    const { isLoading, isSuccess, isError } = registerResponse;

    const emailInputRef = useRef<HTMLInputElement>(null);
    const telInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        setWrongEmailText(EMAIL_WRONG_TEXT_INIT);
        setPasswordErrorText(PASSWORD_ERROR_TEXT_INIT);
        const isTelValid = !!telInputRef.current?.checkValidity();
        let isEmailValid = !!emailInputRef.current?.checkValidity();
        const isPasswordsEquals = password === passwordRepeat;
        const _isPasswordValid =
            password.length !== 0 && checkPasswordRegex(password);

        setTelValid(isTelValid);
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordsEquals && _isPasswordValid);

        if (!_isPasswordValid) {
            setPasswordErrorText("Неверный пароль (см. подсказку)");
        }
        if (isEmailValid) {
            const checkEmailResponse = await checkEmailRequest(email);
            if (!checkEmailResponse.isSuccess) {
                setWrongEmailText(
                    "Ошибка при проверке почты, попробуйте позднее"
                );
                isEmailValid = false;
            } else if (!checkEmailResponse.data?.success) {
                setWrongEmailText(
                    "Пользователь с такой почтой уже зарегистрирован"
                );
                isEmailValid = false;
            } else {
                isEmailValid = true;
            }
            setEmailValid(isEmailValid);
        }

        if (
            isTelValid &&
            isEmailValid &&
            isPasswordsEquals &&
            _isPasswordValid
        ) {
            await registerRequest({
                firstname: name,
                lastname: lastName,
                birthday: birthday,
                email: email,
                phone: tel,
                avatar: null,
                password: password,
                city: city,
            });
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
                    <InputHeader
                        text="Телефон"
                        wrongText="Неверный формат номера"
                        wrong={!isTelValid}
                    />
                    <ForwardedInput
                        type="tel"
                        placeholder="Укажите телефон"
                        onChange={(e) => dispatch(setTel(e.target.value))}
                        value={tel}
                        pattern="^[\+\d](?:\d\s?){6,14}\d$"
                        ref={telInputRef}
                        invalid={!isTelValid}
                    />
                </label>
                <label>
                    <InputHeader
                        text="Пароль"
                        wrong={!isPasswordValid}
                        wrongText={passwordErrorText}
                        helpText={`Не менее 8 символов.
                            Минимум 1 латинская буква верхнего и нижнего регистра.
                            Минимум 1 цифра или символ (~!@#$%^&*_-+=\`|\\(){}[]:;"'<>,.?/)`}
                    />
                    <Input
                        placeholder="Придумайте пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        invalid={!isPasswordValid}
                    />
                </label>
                <label>
                    <InputHeader
                        text="Подтверждение пароля"
                        wrong={!isPasswordValid}
                    />
                    <Input
                        placeholder="Повторите пароль"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        type="password"
                        invalid={!isPasswordValid}
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
            <p className={cnSecondaryInfoPersonal("legal")}>
                Нажимая «Завершить регистрацию», я подтверждаю корректность
                введённых данных, принимаю условия{" "}
                <Link>Пользовательского соглашения</Link> и даю своё согласие
                ООО «Точка инноваций» на обработку моей персональной информации
                на условиях, определённых{" "}
                <Link>Политикой конфиденциальности</Link>.
            </p>
        </>
    );
}
