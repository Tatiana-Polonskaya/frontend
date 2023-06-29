import React from "react";
import { cn } from "@bem-react/classname";

import "./style.scss";
import MainOriginally from "./Main";
import SecondaryOriginally from "./Secondary";
import { IComponents } from "../../models/IComponents";
import { IBreakdown } from "../../models/IBreakdown";

type Props = {
    name?: string;
    title: string;
    subtitle: string;
    info: IComponents[];
    breakdown: IBreakdown[];
    // state: string;
};
const cnOriginally = cn("originally");

export default function Originally(props: Props) {
    return (
        <></>
        // тебя чтоль вообще убрать
    );
}
