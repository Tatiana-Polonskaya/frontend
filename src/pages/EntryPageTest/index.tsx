import { ReactSVG } from "react-svg";
import EntryLayout from "../../layouts/EntryLayout";

import RegImage from "../EntryPage/assets/reg-image-personal.svg";
import Tab from "../../components/ui-kit/Tab";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

enum PageState {
    Personal = "personal",
    Business = "business",
}

enum PageMode {
    Login = "login",
    Register = "register",
    PasswordRecovery = "password-recovery",
}

type EntryPageProps = {
    initialState?: PageState;
    initialMode?: PageMode;
};

const isEnumMember = (value: any, enum_: Object) =>
    Object.values(enum_).includes(value as typeof enum_);

export default function EntryPageTest() {
    const [params, setParams] = useSearchParams();

    const isValidPageState = (value: string | null) =>
        Object.values(PageState).includes((value || "") as PageState);
    const isValidPageMode = (value?: string | null) =>
        Object.values(PageMode).includes((value || "") as PageMode);

    const [pageState, setPageState] = useState(
        isValidPageState(params.get("state")) ? params.get("state") : PageState.Personal
    );
    const [pageMode, setPageMode] = useState(
        isValidPageMode(params.get("mode")) ? params.get("mode") : PageMode.Login
    );

    useEffect(() => {
        setParams((prev) => {
            isValidPageState(pageState) && prev.set("state", String(pageState));
            isValidPageMode(pageMode) && prev.set("mode", String(pageMode));
            return prev;
        });
    }, [pageState, pageMode]);

    return (
        <EntryLayout image={<ReactSVG src={RegImage} />}>
            <Tab
                selected={pageState === PageState.Personal}
                onClick={() => setPageState(PageState.Personal)}
            >
                Для себя
            </Tab>
            <Tab
                selected={pageState === PageState.Business}
                onClick={() => setPageState(PageState.Business)}
            >
                Для бизнеса
            </Tab>
        </EntryLayout>
    );
}
