import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";

import picture from "./right_pic.jpg";

type Props = {
    children?: ReactNode;
};

const cnContent = cn("surveyLayput");

export default function SurveyLayout(props: Props) {
    return (
        <>
            <div className={cnContent()}>
                <div className={cnContent("wrapper")}>
                    <div className={cnContent("left-content")}>
                        {props.children}
                    </div>
                    <div className={cnContent("right-content")}>
                        <img
                            src={picture}
                            alt="picture"
                            className={cnContent("right-content-img")}
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
}
