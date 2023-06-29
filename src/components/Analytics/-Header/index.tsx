import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import "./style.scss";

import Note2 from "../-Header/icons/note-2.svg";

export interface IHeaderAnalytics {
    title: string;
    result: string;
    styles: Styles;
}
type Styles = {
    color: string;
    background: string;
};

const cnHeaderAnalytic = cn("header-analytics");

export default function HeaderAnalytics(component: IHeaderAnalytics) {
    return (
        <>
            <div className={cnHeaderAnalytic("header")}>
                <ReactSVG className={cnHeaderAnalytic("icon")} src={Note2} />
                <div className={cnHeaderAnalytic("title")}>
                    {component.title}
                </div>
                <div
                    className={cnHeaderAnalytic("result")}
                    style={{
                        color: component.styles.color,
                        background: component.styles.background,
                    }}
                >
                    {component.result}
                </div>
            </div>
        </>
    );
}
