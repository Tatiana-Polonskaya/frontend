import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";

import picture from "./assets/survey.png";

type Props = {
    children?: ReactNode;
};

const cnContent = cn("surveyLayout");

export default function SurveyLayout(props: Props) {
    return (
        <div className={cnContent()}>
            <div className={cnContent("left-content")}>{props.children}</div>
            <div className={cnContent("right-content")}>
                <img
                    src={picture}
                    className={cnContent("right-content-img")}
                    alt=""
                />
            </div>
        </div>
    );
}
