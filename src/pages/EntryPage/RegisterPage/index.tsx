import { useState } from "react";
import EntryLayout from "../../../layouts/EntryLayout";
import { PageType, UserType } from "../types";

import RegisterImagePersonal from "./assets/reg-image-personal.svg";
import RegisterImageBusiness from "./assets/reg-image-business.svg";
import { ReactSVG } from "react-svg";
import UserTypeSwitch from "../-UserTypeSwitch";
import InfoFragment from "../-InfoFragment";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import LoginRegisterChanger from "../-LoginRegisterChanger";

export default function RegisterPage() {
    const [userType, setUserType] = useState(UserType.Personal);

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
            <UserTypeSwitch currentType={userType} setter={setUserType} />
            <LoginRegisterChanger pageType={PageType.Register} />
            <InfoFragment
                phrase={
                    userType === UserType.Personal
                        ? "Станьше успешнее и увереннее в себе"
                        : "Автоматизируйте первичный отбор"
                }
                subphrase={
                    userType === UserType.Personal
                        ? "Совершенствуйте навыки выступлений, репетируя наедине с собой без какого-либо смущения."
                        : "Оставьте свою заявку на присоединение к сервису, заполнив форму ниже."
                }
            />
            <TextInput label="Имя" placeholder="Введите имя" />
            <TextInput label="Фамилия" placeholder="Введите фамилию" />
            <TextInput label="Почта" placeholder="Укажите почту" />
            <Button>Продолжить</Button>
        </EntryLayout>
    );
}
