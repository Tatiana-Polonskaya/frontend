export type InformativeDataItem = {
    seq_number: number;
    text: string;
    type: string; /// ["main-text","unconfirmed","non-speech","parasite-words",]
    time_start: number;
    time_end: number;
};

export type InformativeJSON = {
    values: InformativeDataItem[];
    informative: number;
    parasite: number;
    sounds: number;
    empty: number;
    comment: string;
};
