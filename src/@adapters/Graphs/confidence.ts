import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { ConfidenceDataItem } from "../../models/graph/confidence";

const getColor = (value: number) => {
    switch (value) {
        case 0:
            return GraphColor.RED;
        case 1:
            return GraphColor.GRAY;
        case 2:
            return GraphColor.GREEN;
        default:
            return GraphColor.GRAY;
    }
};

const getTop = (value: number) => {
    const OFFSET = 14;
    const INIT = 28;
    switch (value) {
        case 2:
            return INIT;
        default:
            return INIT + OFFSET;
        case 1:
            return OFFSET * 2 + INIT;
    }
};

const convertConfidenceData = (raw: ConfidenceDataItem): BrickedGraphItem => ({
    // id: raw.seq_number,
    id: raw.time_sec,
    text: raw.text,
    // value: raw.value, /// REMOVE THIS
    // top: `${getTop(raw.value)}%`,
    top: `${getTop(raw.confidence)}%`,
    // startTime: raw.time_start,
    startTime: raw.time_sec,
    // endTime: raw.time_end,
    endTime: raw.time_sec + 10,
    // color: getColor(raw.value),
    color: getColor(raw.confidence),
});
export default convertConfidenceData;
