import { useState } from "react";

import "./style.scss";
import { cn } from "@bem-react/classname";

import { ReactSVG } from "react-svg";

type Props = {
    textPlan: string[];
};

export default function BasicTextPlan(props: Props) {
    const cnBasicTextPlan = cn("BasicTextPlan");

    const textPlan = props.textPlan;
    const max_steps = props.textPlan.length - 1;
    const [currentIndex, setCurrentIndex] = useState(0);

    const showLeftItem = () => {
        setCurrentIndex((prev) => (currentIndex !== 0 ? --prev : prev));
    };
    const showRightItem = () => {
        setCurrentIndex((prev) => (currentIndex < max_steps ? ++prev : prev));
    };

    return (
        <div className={cnBasicTextPlan()}>
            <div className={cnBasicTextPlan("arrow")} onClick={showLeftItem}>
                <ReactSVG src={process.env.PUBLIC_URL+"/images/arrows/long-arrow-left.svg"}/>
            </div>
            <div className={cnBasicTextPlan("text")}>
                <span className={cnBasicTextPlan("text-blue")}>{currentIndex+1}:</span>
                {textPlan[currentIndex]}
            </div>
            <div className={cnBasicTextPlan("arrow")} onClick={showRightItem}>
            <ReactSVG src={process.env.PUBLIC_URL+"/images/arrows/long-arrow-right.svg"}/>
            </div>
        </div>
    );
}
