import { ReactSVG } from "react-svg";
import EntryLayout from "../../layouts/EntryLayout";

import RegImage from "../EntryPage/assets/reg-image-personal.svg";
import Tab from "../../components/ui-kit/Tab";
import { useState } from "react";

enum PageState {
    Personal,
    Business,
}

enum PageMode {
    Login,
    Register,
    PasswordRecovery,
}

type EntryPageProps = {
    initialState?: PageState;
    initialMode?: PageMode;
};

export default function EntryPageTest(props: EntryPageProps) {
    const [pageState, setPageState] = useState(
        props.initialState || PageState.Personal
    );

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
