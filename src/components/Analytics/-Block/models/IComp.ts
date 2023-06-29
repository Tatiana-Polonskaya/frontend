import { ReactNode } from "react";

export interface IComp {
    result: string;
    styles: Styles;
    child: Children[];
}

type Styles = {
    color: string;
    background: string;
};

type Children = {
    childTitle: string;
    childSubtitle: string;
    visible: ReactNode;
    invisible: ReactNode;
};
