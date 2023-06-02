export type InformativeDataItem = {
    seq_number: number;
    text: string;
    type: string; /// ["main-text","unconfirmed","non-speech","parasite-words",]
    time_start: number;
    time_end: number;
};
