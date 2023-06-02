import { cn } from "@bem-react/classname";

import "./style.scss";

const CN = cn("base-graph-x-description");

type Props = { data?: number[] | string[]; selected?: number };

export default function BaseGraphXDescription({ data, selected = 0 }: Props) {
    return (
        <div className={CN()}>
            {data?.map((el, idx) => (
                <div
                    className={CN("item", {
                        first: idx === 0,
                        selected: idx === selected,
                    })}
                    key={el}
                >
                    {el}
                </div>
            ))}
        </div>
    );
}
