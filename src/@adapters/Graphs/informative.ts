import GraphColor from "../../models/graph/_colors";
import { BrickedGraphItem } from "../../models/graph/bricked";
import { InformativeDataItem } from "../../models/graph/informative";

const convertInformativeData = (
    raw: InformativeDataItem
): BrickedGraphItem => ({
    id: raw.seq_number,
    text:
        raw.text === "Text for sounds"
            ? "неречевые звуки"
            : raw.text === "Text for pauses"
            ? "пустые паузы"
            : raw.text,
    top: "42%",
    startTime: raw.time_start,
    endTime: raw.time_end,
    /// ["main-text","unconfirmed","non-speech","parasite-words",]
    color:
        raw.type === "main-text"
            ? GraphColor.DARKGRAY
            : raw.type === "unconfirmed"
            ? GraphColor.ORANGE
            : raw.type === "parasite-words"
            ? GraphColor.BLUE
            : raw.type === "parasite"
            ? GraphColor.PURPLE
            : raw.type === "informative"
            ? GraphColor.GRAY
            : raw.type === "empty"
            ? GraphColor.ORANGE
            : raw.type === "sounds"
            ? GraphColor.RED
            : raw.type === "pauses"
            ? GraphColor.ORANGE
            : GraphColor.GRAY,
});

export default convertInformativeData;
