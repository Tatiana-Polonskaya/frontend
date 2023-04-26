import { ReactSVG } from "react-svg";
import EntryLayout from "../../layouts/EntryLayout";

import RegImagePersonal from "./assets/reg-image-personal.svg";
import RegImageBusiness from "./assets/reg-image-business.svg";

import Tab from "../../components/ui-kit/Tab";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import RegisterPage from "./-Register";

import "./style.scss";

export enum UserType {
    Personal = "personal",
    Business = "business",
}

export enum PageMode {
    Login = "login",
    Register = "register",
    PasswordRecovery = "password-recovery",
}

export type GenericProps = {
    userType: UserType;
};

const USER_TYPE_PARAM = "type";
const PAGE_MODE_PARAM = "mode";

export default function EntryPageTest() {
    const [params, setParams] = useSearchParams();

    const isValidUserType = (value: string | null) =>
        Object.values(UserType).includes((value || "") as UserType);
    const isValidPageMode = (value?: string | null) =>
        Object.values(PageMode).includes((value || "") as PageMode);

    const [userType, setUserType] = useState(
        isValidUserType(params.get(USER_TYPE_PARAM))
            ? (params.get(USER_TYPE_PARAM) as UserType)
            : UserType.Personal
    );
    const [pageMode, setPageMode] = useState(
        isValidPageMode(params.get(PAGE_MODE_PARAM))
            ? (params.get(PAGE_MODE_PARAM) as PageMode)
            : PageMode.Register
    );

    useEffect(() => {
        setParams((prev) => {
            isValidUserType(userType) &&
                prev.set(USER_TYPE_PARAM, String(userType));
            isValidPageMode(pageMode) &&
                prev.set(PAGE_MODE_PARAM, String(pageMode));
            return prev;
        });
    }, [userType, pageMode]);

    return (
        <EntryLayout
            image={
                <ReactSVG
                    src={
                        userType === UserType.Personal
                            ? RegImagePersonal
                            : RegImageBusiness
                    }
                />
            }
        >
            <div>
                <Tab
                    selected={userType === UserType.Personal}
                    onClick={() => setUserType(UserType.Personal)}
                >
                    Для себя
                </Tab>
                <Tab
                    selected={userType === UserType.Business}
                    onClick={() => setUserType(UserType.Business)}
                >
                    Для бизнеса
                </Tab>
            </div>
            <div>
                {pageMode === PageMode.Register && (
                    <RegisterPage userType={userType} />
                )}
            </div>
        </EntryLayout>
    );
}
