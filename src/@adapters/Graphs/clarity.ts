import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { ClarityDataItem } from "../../models/graph/clarity";

const convertClarityData = (raws: ClarityDataItem[]): BrickedGraphItem[] => {
    const result = [] as BrickedGraphItem[];

    for (let i = 0; i < raws.length; i++) {
        const raw = raws[i];
        const type = raw.type === "basic" ? "solid" : "thin";

        const middleOffset = type === "solid" ? 43 : 48;

        const offset = raw.value * (type === "solid" ? 8 : 3);

        const top = `${middleOffset - offset}%`;

        const color =
            raw.type === "basic"
                ? GraphColor.DARKGRAY
                : raw.type === "sounds"
                ? GraphColor.RED
                : GraphColor.BLUE;

        const item = {
            id: raw.seq_number,
            text: "this is the text",
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
