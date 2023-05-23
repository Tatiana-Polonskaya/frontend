import { cn } from "@bem-react/classname";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { UserType, PageType, RegisterStep } from "../../../../models/entry";
import {
    setEmail,
    setLastName,
    setName,
} from "../../../../store/slices/register/business";

import { setStep } from "../../../../store/slices/entry";
import { useLazyCheckEmailQuery } from "../../../../store/api/register";
import { useRef, useState } from "react";

import InfoFragment from "../../-InfoFragment";
import LoginRegisterChanger from "../../-LoginRegisterChanger";
import UserTypeSwitch from "../../-UserTypeSwitch";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";

import Input, { ForwardedInput } from "../../../../components/ui-kit/Input";
import InputHeader from "../../../../components/ui-kit/InputHeader";

import "./style.scss";

const cnPrimaryInfo = cn("primary-info");

const EMAIL_WRONG_TEXT_INIT = "Неверный формат почты";

export default function PrimaryInfoBusiness() {
    const [checkEmailRequest, checkEmailResponse] = useLazyCheckEmailQuery();

    const { data, isFetching, isSuccess } = checkEmailResponse;

    const dispatch = useAppDispatch();

    const userType = useAppSelector((state) => state.entry.userType);

    const { name, lastName, email } = useAppSelector(
        (state) => state.register.business
    );

    const [isNameValid, setNameValid] = useState(true);
    const [isEmailValid, setEmailValid] = useState(true);

    const [wrongEmailText, setWrongEmailText] = useState(EMAIL_WRONG_TEXT_INIT);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        const isEmailValidLocal = emailInputRef.current?.checkValidity();
        const isNameValidLocal = nameInputRef.current?.checkValidity();

        if (!isNameValidLocal) {
            setNameValid(false);
            return;
        }

        if (!isEmailValidLocal) {
            setEmailValid(false);
            setWrongEmailText(EMAIL_WRONG_TEXT_INIT);
            return;
        }

        try {
            const checkEmailResponseData = await checkEmailRequest(
                email
            ).unwrap();
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

    return (
        <>
            <UserTypeSwitch />
            <LoginRegisterChanger pageType={PageType.Register} />
            {userType === UserType.Personal ? (
                <InfoFragment
                    phrase="Станьте успешнее и увереннее в себе"
                    subphrase="Совершенствуйте навыки выступлений, репетируя наедине с собой без какого-либо смущения."
                />
            ) : (
                <InfoFragment
                    phrase="Автоматизируйте первичный отбор"
                    subphrase="Оставьте свою заявку на присоединение к сервису, заполнив форму ниже."
                />
            )}
            <div className={cnPrimaryInfo("inputs")}>
                <label>
                    <InputHeader
                        text="Имя"
                        wrong={!isNameValid}
                        wrongText="Поле не может быть пустым"
                    />
                    <ForwardedInput
                        required
                        placeholder="Введите имя"
                        maxLength={50}
                        value={name}
                        invalid={!isNameValid}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        onBlur={(e) => setNameValid(e.target.checkValidity())}
                        ref={nameInputRef}
                    />
                </label>
                <label>
                    <InputHeader text="Фамилия" />
                    <Input
                        placeholder="Введите фамилию"
                        value={lastName}
                        onChange={(e) => dispatch(setLastName(e.target.value))}
                    />
                </label>
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
            </div>
            <Button
                className={cnPrimaryInfo("next-button")}
                disabled={isFetching}
                onClick={onSubmit}
            >
                Продолжить
            </Button>
            <p className={cnPrimaryInfo("legal")}>
                Нажимая «Продолжить», я принимаю условия{" "}
                <Link>Пользовательского соглашения</Link> и даю своё согласие
                ООО «Точка инноваций» на обработку моей персональной информации
                на условиях, определённых{" "}
                <Link>Политикой конфиденциальности</Link>.
            </p>
        </>
    );
}
