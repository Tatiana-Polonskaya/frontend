import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { ConnectivityDataItem } from "../../models/graph/connectivity";

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

const convertConnectivityData = (
    raw: ConnectivityDataItem
): BrickedGraphItem => ({
    id: raw.seq_number,
    text: raw.text,
    // value: raw.value, /// REMOVE THIS
    top: `${getTop(raw.value)}%`,
    startTime: raw.time_start,
    endTime: raw.time_end,
    color: getColor(raw.value),
});
export default convertConnectivityData;
