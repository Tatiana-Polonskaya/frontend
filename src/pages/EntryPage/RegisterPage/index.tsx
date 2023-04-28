import { Context, createContext, useEffect, useState } from "react";
import EntryLayout from "../../../layouts/EntryLayout";
import {
    IBusinessRegister,
    IPersonalRegister,
    RegisterStep,
    UserType,
} from "../types";

import RegisterImagePersonal from "./assets/reg-image-personal.svg";
import RegisterImageBusiness from "./assets/reg-image-business.svg";
import { ReactSVG } from "react-svg";

import PrimaryInfo from "./PrimaryInfo";
import SecondaryInfoPersonal from "./SecondaryInfoPersonal";
import SecondaryInfoBusiness from "./SecondaryInfoBusiness";
import FinishPersonal from "./FinishPersonal";
import FinishBusiness from "./FinishBusiness";
import EmailVerification from "./EmailVerification";

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
            {RegisterStep.EmailVerification === step && <EmailVerification />}
            {RegisterStep.FinishRegister === step &&
                (UserType.Personal === userType ? (
                    <FinishPersonal />
                ) : (
                    <FinishBusiness />
                ))}
        </EntryLayout>
    );
}
