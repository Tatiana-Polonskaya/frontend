import { off } from "process";
import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { ClarityDataItem } from "../../models/graph/clarity";

const convertClarityData = (raws: ClarityDataItem[]): BrickedGraphItem[] => {
    const result = [] as BrickedGraphItem[];

    let middleOffset: number = 50; // middle of graph

    for (let i = 0; i < raws.length; i++) {
        const raw = raws[i];
        const type = raw.type === "basic" ? "solid" : "thin";
        const offset = type === "solid" ? -8 : -3; // for center on center line
        
        if (i !== 0) {
            middleOffset =
                middleOffset -
                raw.value * (raws[i - 1].type === "basic" ? 16 : 11);
        } 
       
        const top = `${(middleOffset + offset < 0 ? 0 : middleOffset) }%`;

        const color =
            raw.type === "basic"
                ? GraphColor.DARKGRAY
                : raw.type === "sounds"
                ? GraphColor.RED
                : GraphColor.BLUE;

        const item = {
            id: raw.seq_number,
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
