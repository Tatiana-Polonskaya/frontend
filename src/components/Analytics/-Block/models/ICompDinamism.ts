import { ReactNode } from "react";

export interface ICompDinamism {
    result: string;
    styles: Styles;
    child: Childs[];
}

type Styles = {
    color: string;
    background: string;
};

type Childs = {
    childTitle: string;
    childSubtitle: string;
    visible: ReactNode;
    invisible: ReactNode;
};
