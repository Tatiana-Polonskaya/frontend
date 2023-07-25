import { Dispatch, SetStateAction, createContext } from "react";

export const _1SEC_PX = 6.15;

export const createXDescriptionFromSeconds = (lastSecond: number): string[] => {
    const minutes = Math.floor(lastSecond / 60);
    const seconds = Math.ceil((lastSecond - minutes * 60) / 10) + 1;

    const result = [];

    for (let i = 0; i <= minutes; i++) {
        for (let j = 0; j < (i === minutes ? seconds : 6); j++) {
            result.push(
                j === 6
                    ? `${i + 1 < 10 ? "0" : ""}${i + 1}:00`
                    : `${i < 10 ? "0" : ""}${i}:${j}0`
            );
        }
    }

    return result; /// ["00:00", "00:10", ...]
};

interface IWithTimeStart {
    time_start: number;
}
interface IWithoutTimeStart {
    time_sec: number;
}

export const createXDescriptionFromData = (data: IWithTimeStart[]) =>
    createXDescriptionFromSeconds(data.at(-1)!.time_start);

export const createXDescriptionFromDataConfidence = (
    data: IWithoutTimeStart[]
) => createXDescriptionFromSeconds(data.at(-1)!.time_sec);

export const GraphContext = createContext({
    currentTime: 0,
    setCurrentTime: (() => {}) as Dispatch<SetStateAction<number>>,
});
