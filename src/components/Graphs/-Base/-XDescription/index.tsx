import { cn } from "@bem-react/classname";

import "./style.scss";
import { Fragment } from "react";

const CN = cn("base-graph-x-description");

type Props = { data?: number[] | string[]; selected?: number; stats: string };

export default function BaseGraphXDescription({
    data,
    selected = 0,
    stats,
}: Props) {
    const curTime = data?.map((el, ind) => {
        const curDate = new Date(el);
        const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        return {
            day: days[curDate.getDay()],
            date: curDate.getDate(),
            month: new Date().getMonth(),
        };
    });
    return (
        <div className={stats !== "st" ? CN() : CN("stats")}>
            {curTime!.map((el, idx) =>
                idx !== 0 ? (
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
                                <span
                                    style={{
                                        color:
                                            idx === selected
                                                ? "white"
                                                : "#adb9d480",
                                    }}
                                >
                                    {`${
                                        el.date >= 10 ? el.date : "0" + el.date
                                    }.${
                                        el.month >= 10
                                            ? el.month
                                            : "0" + el.month
                                    }`}
                                </span>
                            </>
                        ) : (
                            <span>{data![idx]}</span>
                        )}
                    </div>
                ) : (
                    <Fragment key={idx} />
                )
            )}
        </div>
    );
}
