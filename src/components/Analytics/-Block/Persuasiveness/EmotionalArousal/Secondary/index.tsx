import { cn } from "@bem-react/classname";

import "./style.scss";

import ProgressCircleFill from "../ProgressCircleFill";

import { IEmotionalArousal } from "../../../models/IEmotionalArousal";

type Props = {
    info: IEmotionalArousal[];
};

const cnEmotionalArousal = cn("emotional-arousal_block");

export default function SecondaryEmotionalArousal(props: Props) {
    return (
        <>
            <div className={cnEmotionalArousal("marker")}>
                <p className={cnEmotionalArousal("description")}>
                    <b className={cnEmotionalArousal("description-bold")}>
                        {"Эмоциональное возбуждение"}
                    </b>{" "}
                    {
                        " - состояние повышенной эмоциональной активности выступающего, проявляющееся в виде усиленной реакции на события и впечатления и оцениваемое набором психолингвистических маркеров:"
                    }
                </p>
            </div>
            <div className={cnEmotionalArousal()}>
                {props.info.map((el, index) => (
                    <ProgressCircleFill key={index} info={el} id={index} />
                ))}
            </div>
        </>
    );
}
