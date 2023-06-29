import { cn } from "@bem-react/classname";

import "./style.scss";

import ProgressCircle from "../ProgressCircle";

import { IComponents } from "../../../../../Analytics/-Block/models/IComponents";

type Props = {
    info: IComponents[];
};

const cnProgressLine = cn("progress-circle_block");

export default function MainNonMonotony(props: Props) {
    return (
        <>
            <div className={cnProgressLine()}>
                {props.info.map((el, index) => (
                    <ProgressCircle key={index} info={el} />
                ))}
            </div>
        </>
    );
}
