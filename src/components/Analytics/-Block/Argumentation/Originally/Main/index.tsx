import { cn } from "@bem-react/classname";

import "./style.scss";

import ProgressLine from "../ProgressLine";
import Visible from "../../../../../Dropdown/-Visible";

type Props = {
    info: IComponents[];
    positions: number[];
};

interface IComponents {
    title?: string;
    subtitle?: string;
    result?: string;
    fill?: string;
    dotfill?: string;
    shadow?: string;
    img?: string;
    value: number;
}

const cnProgressLine = cn("progress-line_block");

export default function MainOriginally(props: Props) {
    return (
        <>
            <div className={cnProgressLine()}>
                {props.info.map((el, ind) => (
                    <ProgressLine
                        key={ind}
                        info={el}
                        value={props.positions[ind]}
                    />
                ))}
            </div>
        </>
    );
}
