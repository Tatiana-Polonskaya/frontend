import { CongruenceItem } from "../../models/graph/congruence";

export enum EMOTION {
    ANGRY = "angry",
    HAPPINESS = "happiness",
    NEUTRAL = "neutral",
}

/**
 * Fills time gaps in data received from the server
 * @param values - array of CongruenceItem( time_start: number, value: number,type: string, time_end:number)
 * @returns CongruenceItem[] without time gaps
 */
function convertCongruenceValues(values: CongruenceItem[]) {
    let previosTime = 0;
    const step = 10;

    return values
        .map((el) => {
            if (el.time_start === previosTime) {
                previosTime = el.time_end;
                return el;
            } else {
                const diff = previosTime - el.time_start;
                if (diff === step) {
                    previosTime = el.time_end;
                    return el;
                } else if (el.type === EMOTION.NEUTRAL) {
                    const tempElem = {
                        time_start: previosTime,
                        value: 0,
                        type: EMOTION.NEUTRAL,
                        time_end: el.time_end,
                    };
                    previosTime = el.time_end;
                    return tempElem;
                } else {
                    const tempElem = [
                        {
                            time_start: previosTime,
                            value: 0,
                            type: EMOTION.NEUTRAL,
                            time_end: el.time_start,
                        },
                        el,
                    ];
                    previosTime = el.time_end;
                    return tempElem;
                }
            }
        })
        .flat(2);
}

/**
 * Removes duplicates of elements with the neutral type, combining time intervals
 * @param values - array of CongruenceItem( time_start: number, value: number,type: string, time_end:number)
 * @returns CongruenceItem[] without neutral duplicates
 */
function combiningNeutralTypes(values: CongruenceItem[]) {
    let previousType: string = EMOTION.NEUTRAL;
    let previousTimeStart = 0;
    const resultArray: CongruenceItem[] = [];

    const lastTimeStart = values.at(-1)!.time_start;

    let tempItem = {
        time_start: 0,
        value: 0,
        type: EMOTION.NEUTRAL as string,
        time_end: 0,
    };

    values.forEach((el) => {
        if (el.type === EMOTION.NEUTRAL) {
            const tempTimeStart =
                previousType === EMOTION.NEUTRAL
                    ? previousTimeStart
                    : el.time_start;
            previousTimeStart = tempTimeStart;

            tempItem = {
                time_start: tempTimeStart,
                value: el.value,
                type: el.type,
                time_end: el.time_end,
            };

            if (el.time_start === lastTimeStart) resultArray.push(tempItem);
        } else {
            if (
                previousType !== el.type &&
                previousType === EMOTION.NEUTRAL &&
                tempItem.time_end !== 0
            ) {
                resultArray.push(tempItem);
                tempItem = {
                    time_start: 0,
                    value: 0,
                    type: EMOTION.NEUTRAL as string,
                    time_end: 0,
                };
            }
            resultArray.push(el);
            previousTimeStart = el.time_start;
        }
        previousType = el.type;
    });
    return resultArray;
}

export default function convertDataCongruenceFromBackIntoGraph(
    values: CongruenceItem[]
) {
    const resultArray = convertCongruenceValues(values);
    return combiningNeutralTypes(resultArray);
}
