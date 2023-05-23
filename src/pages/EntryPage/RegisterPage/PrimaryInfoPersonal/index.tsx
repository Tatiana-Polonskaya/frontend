import { cn } from "@bem-react/classname";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { UserType, PageType, RegisterStep } from "../../../../models/entry";

import {
    setName,
    setBirthday,
    setCity,
    setLastName,
} from "../../../../store/slices/register/personal";

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

export default function PrimaryInfo() {
    const dispatch = useAppDispatch();

    const userType = useAppSelector((state) => state.entry.userType);

    const { name, lastName, birthday, city } = useAppSelector(
        (state) => state.register.personal
    );
    // const name = useAppSelector((state) => state.entry.register.primary.name);
    // const lastName = useAppSelector(
    //     (state) => state.entry.register.primary.lastName
    // );
    // const email = useAppSelector((state) => state.entry.register.primary.email);

    const [isNameValid, setNameValid] = useState(true);
    

    const [isBirthdayValid, setBirthdayValid] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const birthdayInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        const isNameValid = nameInputRef.current?.checkValidity();
        if (!isNameValid) {
            setNameValid(false);
            return;
        }
        const isBirthdayValid = birthdayInputRef.current?.checkValidity();
        if (!isBirthdayValid) {
            setBirthdayValid(false);
            return;
        }
        dispatch(setStep(RegisterStep.SecondaryInfo));
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
                        text="Дата рождения"
                        wrong={!isBirthdayValid}
                        wrongText="Некорректная дата"
                    />
                    <ForwardedInput
                        type="date"
                        min="1900-01-01"
                        value={birthday}
                        onChange={(e) => dispatch(setBirthday(e.target.value))}
                        max={new Date().toLocaleDateString("fr-ca")}
                        ref={birthdayInputRef}
                    />
                </label>
            </div>
            <Button className={cnPrimaryInfo("next-button")} onClick={onSubmit}>
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
