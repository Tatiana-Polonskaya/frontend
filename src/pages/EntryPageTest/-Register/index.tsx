import { createContext, useState } from "react";
import { GenericProps, UserType, PageMode } from "..";
import FirstStep from "./Generic/FirstStep";

enum PersonalRegisterSteps {
    PrimaryInfo,
    SecondaryInfo,
    EmailPending,
    SuccessfulRegister,
}

enum BusinessRegisterSteps {
    PrimaryInfo,
    SecondaryInfo,
    SuccessfulRequest,
}

const RegisterContextGeneric = createContext({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
});

const RegisterContextPersonal = createContext({
    birthday: undefined,
    city: undefined,
    password: undefined,
});

const RegisterContextBusiness = createContext({
    companyName: undefined,
    TIN: undefined,
    workPosition: undefined,
});

const PersonalProps = {
    phrase: "Станьте успешнее и увереннее в себе",
    subphrase:
        "Совершенствуйте навыки выступлений, репетируя наедине с собой без какого-либо смущения.",
};

const BusinessProps = {
    phrase: "Автоматизируйте первичный отобр",
    subphrase:
        "Оставьте свою заявку на присоединение к сервису, заполнив форму ниже.",
};

export default function RegisterPage(props: GenericProps) {
    const [step, setStep] = useState(props.userType === UserType.Personal);

    return (
        <FirstStep
            {...(props.userType === UserType.Personal
                ? PersonalProps
                : BusinessProps)}
        />
    );
}
