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

    const [isNameValid, setNameValid] = useState(true);
    const [isBirthdayValid, setBirthdayValid] = useState(true);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const birthdayInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        const isNameValid = nameInputRef.current?.checkValidity();
        if (!isNameValid) {
            setNameValid(false);
        }
        const isBirthdayValid = birthdayInputRef.current?.checkValidity();
        if (!isBirthdayValid) {
            setBirthdayValid(false);
        }
        if (isNameValid && isBirthdayValid) {
            dispatch(setStep(RegisterStep.SecondaryInfo));
        }
    };

    return (
        <>
            <UserTypeSwitch />
            <LoginRegisterChanger pageType={PageType.Register} />
            {userType === UserType.Personal ? (
                <InfoFragment
                    phrase={"Станьте успешнее \n и увереннее в себе"}
                    subphrase="Совершенствуйте навыки выступлений, репетируя наедине с собой без какого-либо смущения."
                />
            ) : (
                <InfoFragment
                    phrase="РАЗВИВАЙТЕ ПУБЛИЧНОСТЬ"
                    subphrase="Оставьте свою заявку на присоединение вашей компании к сервису, заполнив форму ниже."
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
                        required
                        value={birthday}
                        onChange={(e) => dispatch(setBirthday(e.target.value))}
                        max={new Date().toLocaleDateString("fr-ca")}
                        ref={birthdayInputRef}
                        invalid={!isBirthdayValid}
                    />
                </label>

                <label>
                    <InputHeader text="Город" />
                    <Input
                        placeholder="Введите свой город"
                        value={city}
                        onChange={(e) => dispatch(setCity(e.target.value))}
                    />
                </label>
            </div>
            <Button className={cnPrimaryInfo("next-button")} onClick={onSubmit}>
                Продолжить
            </Button>

        </>
    );
}
