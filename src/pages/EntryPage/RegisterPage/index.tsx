import { Context, createContext, useEffect, useState } from "react";
import EntryLayout from "../../../layouts/EntryLayout";
import {
    IBusinessRegister,
    IPersonalRegister,
    PageType,
    RegisterSteps,
    UserType,
} from "../types";

import RegisterImagePersonal from "./assets/reg-image-personal.svg";
import RegisterImageBusiness from "./assets/reg-image-business.svg";
import { ReactSVG } from "react-svg";

import { RegisterSteps as RegisterStep } from "../types";
import UserTypeSwitch from "../-UserTypeSwitch";
import LoginRegisterChanger from "../-LoginRegisterChanger";
import InfoFragment from "../-InfoFragment";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import Link from "../../../components/ui-kit/Link";

const PersonalRegisterContext: Context<IPersonalRegister> = createContext({});
const BusinessRegisterContext: Context<IBusinessRegister> = createContext({});

const RegContext = (userType: UserType) =>
    userType === UserType.Personal
        ? PersonalRegisterContext
        : BusinessRegisterContext;

export default function RegisterPage() {
    const [userType, setUserType] = useState(UserType.Personal);
    const [step, setStep] = useState(RegisterStep.PrimaryInfo);

    useEffect(() => console.log(step), [step]);

    return (
        <EntryLayout
            image={
                <ReactSVG
                    src={
                        userType === UserType.Personal
                            ? RegisterImagePersonal
                            : RegisterImageBusiness
                    }
                />
            }
        >
            {RegisterSteps.PrimaryInfo === step && (
                <>
                    <UserTypeSwitch
                        currentType={userType}
                        setter={setUserType}
                    />
                    <LoginRegisterChanger pageType={PageType.Register} />
                    {userType === UserType.Personal ? (
                        <InfoFragment
                            phrase="Станьше успешнее и увереннее в себе"
                            subphrase="Совершенствуйте навыки выступлений, репетируя наедине с собой без какого-либо смущения."
                        />
                    ) : (
                        <InfoFragment
                            phrase="Автоматизируйте первичный отбор"
                            subphrase="Оставьте свою заявку на присоединение к сервису, заполнив форму ниже."
                        />
                    )}
                    <TextInput label="Имя" placeholder="Введите имя" />
                    <TextInput label="Фамилия" placeholder="Введите фамилию" />
                    <TextInput label="Почта" placeholder="Укажите почту" />
                    <Button onClick={() => setStep(RegisterStep.SecondaryInfo)}>
                        Продолжить
                    </Button>
                </>
            )}
            {RegisterSteps.SecondaryInfo === step &&
                (userType === UserType.Personal ? (
                    <>
                        <Link
                            onClick={() => setStep(RegisterSteps.PrimaryInfo)}
                            arrow="left"
                        >
                            Вернуться
                        </Link>
                        <p>Приветствуем, {"Anna"}!</p>
                        <TextInput
                            label="Дата рождения"
                            placeholder="Поменять на другой инпут"
                        />
                        <TextInput
                            label="Город"
                            placeholder="Введите свой город"
                        />
                        <TextInput
                            label="Пароль"
                            placeholder="Придумайте пароль"
                            password
                        />
                        <TextInput
                            label="Подтверждение пароля"
                            placeholder="Повторите пароль"
                            password
                        />
                        <Button
                            onClick={() =>
                                setStep(RegisterSteps.EmailVerification)
                            }
                        >
                            Продолжить
                        </Button>
                    </>
                ) : (
                    <>
                        <p>Приветствуем, {"Anna"}!</p>
                        <p>Завяка на корпоративное использование</p>
                        <p>
                            Пожалуйста, добавьте информацию о вашей компании. Не
                            переживайте, мы запрашиваем её исключительно в целях
                            безопасности.
                        </p>

                        <TextInput
                            label="Название компании"
                            placeholder="Введите название"
                        />
                        <TextInput label="ИНН" placeholder="Введите ИНН" />
                        <TextInput
                            label="Ваша должность"
                            placeholder="Укажите вашу должность"
                        />
                        <Button
                            onClick={() =>
                                setStep(RegisterSteps.FinishRegister)
                            }
                        >
                            Отправить заявку
                        </Button>
                    </>
                ))}
            {RegisterSteps.EmailVerification === step && (
                <>
                    <p>
                        Мы отправили письмо со ссылкой для подтверждения
                        регистрации аккаунта на указанный почтовый адрес
                    </p>
                    <p>
                        Пожалуйста, перейдите по ней, чтобы завершить
                        регистрацию.
                    </p>
                </>
            )}
            {RegisterSteps.FinishRegister === step &&
                (UserType.Personal === userType
                    ? "finish personal"
                    : "finish business")}
        </EntryLayout>
    );
}
