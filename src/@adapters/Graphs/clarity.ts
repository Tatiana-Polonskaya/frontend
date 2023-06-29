import { off } from "process";
import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { ClarityDataItem } from "../../models/graph/clarity";

const convertClarityData = (raws: ClarityDataItem[]): BrickedGraphItem[] => {
    const result = [] as BrickedGraphItem[];

    let middleOffset: number = 50;
    for (let i = 0; i < raws.length; i++) {
        const raw = raws[i];
        const type = raw.type === "basic" ? "solid" : "thin";
        let offset: number = 0;
        if (i !== 0) {
            if (type === "solid") {
                offset -= 8;
            } else {
                offset -= 3;
            }
            middleOffset =
                middleOffset -
                raw.value * (raws[i - 1].type === "basic" ? 16 : 11);
        } else {
            if (type === "solid") {
                offset -= 8;
            } else {
                offset -= 3;
            }
        }

        const top = `${middleOffset + offset}%`;

        const color =
            raw.type === "basic"
                ? GraphColor.DARKGRAY
                : raw.type === "sounds"
                ? GraphColor.RED
                : GraphColor.BLUE;

        const item = {
            id: raw.seq_number,
            // text: "this is the text",
            text: raw.text,
            startTime: raw.time_start,
            endTime: raw.time_end,
            top,
            type,
            color,
        } as BrickedGraphItem;

        result.push(item);
    }
    return result;
};

export default convertClarityData;
