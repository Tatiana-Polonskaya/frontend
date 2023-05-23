import { ReactSVG } from "react-svg";
import { useAppSelector } from "../../../hooks/redux";

import { RegisterStep, UserType } from "../../../models/entry";

import EntryLayout from "../../../layouts/EntryLayout";

import RegisterImagePersonal from "./assets/reg-image-personal.svg";
import RegisterImageBusiness from "./assets/reg-image-business.svg";

import PrimaryInfoBusiness from "./PrimaryInfoBusiness";
import SecondaryInfoPersonal from "./SecondaryInfoPersonal";
import SecondaryInfoBusiness from "./SecondaryInfoBusiness";
import EmailVerification from "./EmailVerification";
import PrimaryInfoPersonal from "./PrimaryInfoPersonal";
import RegisterErrorPage from "./ErrorPage";

export default function RegisterPage() {
    const userType = useAppSelector((state) => state.entry.userType);

    const step = useAppSelector((state) => state.entry.registerStep);

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
            {/* {RegisterStep.PrimaryInfo === step && <PrimaryInfo />} */}
            {RegisterStep.PrimaryInfo === step &&
                (userType === UserType.Personal ? (
                    <PrimaryInfoPersonal />
                ) : (
                    <PrimaryInfoBusiness />
                ))}
            {RegisterStep.SecondaryInfo === step &&
                (userType === UserType.Personal ? (
                    <SecondaryInfoPersonal />
                ) : (
                    <SecondaryInfoBusiness />
                ))}
            {RegisterStep.EmailVerification === step && <EmailVerification />}
            {RegisterStep.Error === step && <RegisterErrorPage />}
        </EntryLayout>
    );
}
