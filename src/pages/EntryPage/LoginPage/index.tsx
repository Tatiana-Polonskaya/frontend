import { useState } from "react";

import EntryLayout from "../../../layouts/EntryLayout";

import LoginImage from "./assets/login.svg";
import { ReactSVG } from "react-svg";

import UserTypeSwitch from "../-UserTypeSwitch";
import LoginFragment from "../-LoginFragment";

import { cn } from "@bem-react/classname";

import "./style.scss";
import LoginRegisterChanger from "../-LoginRegisterChanger";
import { PageType } from "../types";

enum UserType {
    Personal,
    Business,
}


const cnLoginPage = cn("login-page");


export default function LoginPage() {
    const [userType, setUserType] = useState(UserType.Personal);

    return (
        <EntryLayout image={<ReactSVG src={LoginImage} />}>
            <UserTypeSwitch currentType={userType} setter={setUserType} />
            <LoginRegisterChanger pageType={PageType.Login} />
            <div className={cnLoginPage()}>
                <LoginFragment userType={userType} />
            </div>
        </EntryLayout>
    );
}
