import { cn } from "@bem-react/classname";
import InfoFragment from "../../-InfoFragment";
import LoginRegisterChanger from "../../-LoginRegisterChanger";
import UserTypeSwitch from "../../-UserTypeSwitch";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import TextInput from "../../../../components/ui-kit/TextInput";
import { UserType, PageType, RegisterStep } from "../../types";

import "./style.scss";

interface IPrimaryInfo {
    userType: UserType;
    setUserType: Function;
    setStep: Function;
}

const cnPrimaryInfo = cn("primary-info");

export default function PrimaryInfo({
    userType,
    setUserType,
    setStep,
}: IPrimaryInfo) {
    return (
        <>
            <UserTypeSwitch currentType={userType} setter={setUserType} />
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
                <TextInput label="Имя" placeholder="Введите имя" />
                <TextInput label="Фамилия" placeholder="Введите фамилию" />
                <TextInput label="Почта" placeholder="Укажите почту" />
            </div>
            <Button
                className={cnPrimaryInfo("next-button")}
                onClick={() => setStep(RegisterStep.SecondaryInfo)}
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
