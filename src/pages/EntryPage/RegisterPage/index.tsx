import { Context, createContext, useEffect, useState } from "react";
import EntryLayout from "../../../layouts/EntryLayout";
import {
    IBusinessRegister,
    IPersonalRegister,
    PageType,
    RegisterStep,
    UserType,
} from "../types";

import RegisterImagePersonal from "./assets/reg-image-personal.svg";
import RegisterImageBusiness from "./assets/reg-image-business.svg";
import { ReactSVG } from "react-svg";

import UserTypeSwitch from "../-UserTypeSwitch";
import LoginRegisterChanger from "../-LoginRegisterChanger";
import InfoFragment from "../-InfoFragment";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import Link from "../../../components/ui-kit/Link";
import PrimaryInfo from "./PrimaryInfo";
import SecondaryInfoPersonal from "./SecondaryInfoPersonal";
import SecondaryInfoBusiness from "./SecondaryInfoBusiness";
import FinishPersonal from "./FinishPersonal";
import FinishBusiness from "./FinishBusiness";

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
            {RegisterStep.PrimaryInfo === step && (
                <PrimaryInfo
                    userType={userType}
                    setUserType={setUserType}
                    setStep={setStep}
                />
            )}
            {RegisterStep.SecondaryInfo === step &&
                (userType === UserType.Personal ? (
                    <SecondaryInfoPersonal setStep={setStep} />
                ) : (
                    <SecondaryInfoBusiness setStep={setStep} />
                ))}
            {RegisterStep.EmailVerification === step && (
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
            {RegisterStep.FinishRegister === step &&
                (UserType.Personal === userType ? (
                    <FinishPersonal />
                ) : (
                    <FinishBusiness />
                ))}
        </EntryLayout>
    );
}
