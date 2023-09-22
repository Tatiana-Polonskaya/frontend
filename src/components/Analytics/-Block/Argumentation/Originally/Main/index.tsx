import { cn } from "@bem-react/classname";

import "./style.scss";

import ProgressLine from "../ProgressLine";

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
                        // на тест убрать
                        // value={props.positions[ind]}
                        value={props.positions[ind] !== 0 ? 0 : 0}
                    />
                ))}
            </div>
        </>
    );
}
