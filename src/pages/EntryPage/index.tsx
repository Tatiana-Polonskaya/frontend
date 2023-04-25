import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import EntryPageBusiness from "./-Business";
import EntryPagePersonal from "./-Personal";

import RegImage from "./assets/reg-image.svg";

import "./style.scss";
import { useState } from "react";

const cnEntryPage = cn("entry-page");
const cnRadioItem = cn("radio-item");

enum PageState {
    Personal,
    Business,
}

export enum PageMode {
    Login,
    Register,
}

type RadioItemProps = {
    condition: boolean;
    changer: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
};

const RadioItem = (props: RadioItemProps) => (
    <label className={cnRadioItem("label", { checked: props.condition })}>
        <input
            className={cnRadioItem("input")}
            type="radio"
            checked={props.condition}
            onChange={props.changer}
        />
        <span>{props.label}</span>
    </label>
);

export default function EntryPage() {
    const [pageState, setPageState] = useState(PageState.Personal);
    const [pageMode, setPageMode] = useState(PageMode.Login);

    return (
        <div className={cnEntryPage()}>
            <div className={cnEntryPage("main")}>
                <div>
                    <RadioItem
                        condition={pageState === PageState.Personal}
                        changer={() => setPageState(PageState.Personal)}
                        label={"Для себя"}
                    />
                    <RadioItem
                        condition={pageState === PageState.Business}
                        changer={() => setPageState(PageState.Business)}
                        label={"Для бизнеса"}
                    />
                    <div className={cnEntryPage("content")}>
                        {pageState === PageState.Personal && (
                            <EntryPagePersonal mode={pageMode} />
                        )}
                        {pageState === PageState.Business && (
                            <EntryPageBusiness mode={pageMode} />
                        )}
                    </div>
                </div>
            </div>
            <ReactSVG src={RegImage} />
        </div>
    );
}
