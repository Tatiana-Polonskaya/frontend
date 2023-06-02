import { cn } from "@bem-react/classname";

import "./style.scss";

const CN = cn("base-graph-y-description");

type Props = {
    data?: string[] | number[];
};

export default function BaseGraphYDescription({ data }: Props) {
    return (
        <div className={CN()}>
            {data?.map((el) => (
                <div className={CN("item")} key={el}>
                    {el}
                </div>
            ))}
        </div>
    );
}
