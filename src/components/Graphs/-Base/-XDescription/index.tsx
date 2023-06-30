import { cn } from "@bem-react/classname";

import "./style.scss";

const CN = cn("base-graph-x-description");

type Props = { data?: number[] | string[]; selected?: number; stats: string };

export default function BaseGraphXDescription({
    data,
    selected = 0,
    stats,
}: Props) {
    const curTime = data?.map((el, ind) => {
        const curDate = new Date(Date.now() - ind * 86400000);
        const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        return {
            day: days[curDate.getDay()],
            date: curDate.getDate(),
            month: new Date().getMonth(),
        };
    });
    curTime?.reverse();
    return (
        <div className={CN()}>
            {/* {data?.map((el, idx) => ( */}
            {curTime!.map((el, idx) => (
                <div
                    className={CN(stats !== "st" ? "item" : "item-stats", {
                        first: idx === 0,
                        selected: idx === selected,
                    })}
                    key={idx}
                >
                    {stats === "st" ? (
                        <>
                            {el.day}
                            <span>{` ${el.date}:${
                                el.month >= 10 ? el.month : "0" + el.month
                            }`}</span>
                        </>
                    ) : (
                        <span>{data![idx]}</span>
                    )}
                </div>
            ))}
        </div>
    );
}
