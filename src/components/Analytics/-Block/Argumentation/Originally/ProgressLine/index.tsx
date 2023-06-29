import { cn } from "@bem-react/classname";

import "./style.scss";

import { IComponents } from "../../../../../Analytics/-Block/models/IComponents";

type Props = {
    info: IComponents;
    value: number;
};
const cnProgressLine = cn("progress");

export default function ProgressLine(props: Props) {
    return (
        <div className={cnProgressLine("item")}>
            <div className={cnProgressLine("bar-title")}>
                {props.info.title}
            </div>
            <div className={cnProgressLine("bar")}>
                <div
                    className={cnProgressLine("bar-fill")}
                    style={{
                        width: `${props.value}%`,
                        background: props.info.fill,
                    }}
                >
                    <div
                        className={cnProgressLine("bar-dot")}
                        style={{
                            background: props.info.dotfill,
                            boxShadow: props.info.shadow,
                        }}
                    >
                        <div className={cnProgressLine("img")}>
                            {/* прокинуть сюда SVG */}
                            <img
                                src={props.info.img}
                                alt={props.info.img}
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
