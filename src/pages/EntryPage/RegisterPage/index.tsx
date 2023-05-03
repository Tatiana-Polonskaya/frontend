import { Context, createContext, useEffect, useState } from "react";
import EntryLayout from "../../../layouts/EntryLayout";
import {
    IBusinessSecondaryInfo,
    IPersonalSecondaryInfo,
    RegisterStep,
    UserType,
    IRegister,
    IPrimaryInfo,
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

export const RegisterContext: Context<{
    primaryInfo: IPrimaryInfo;
    setPrimaryInfo: React.Dispatch<React.SetStateAction<IPrimaryInfo>>;
}> = createContext({ primaryInfo: {}, setPrimaryInfo: (prev) => {} });

export default function RegisterPage() {
    const [userType, setUserType] = useState(UserType.Personal);
    const [step, setStep] = useState(RegisterStep.PrimaryInfo);

    const [primaryInfo, setPrimaryInfo] = useState({
        name: "",
        lastName: "",
        email: "",
    } as IPrimaryInfo);

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
            <RegisterContext.Provider value={{ primaryInfo, setPrimaryInfo }}>
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
                    <EmailVerification />
                )}
                {RegisterStep.FinishRegister === step &&
                    (UserType.Personal === userType ? (
                        <FinishPersonal />
                    ) : (
                        <FinishBusiness />
                    ))}
            </RegisterContext.Provider>
        </EntryLayout>
    );
}
