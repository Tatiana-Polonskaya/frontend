export type ClarityDataItem = {
    seq_number: number;
    type: string; // type: trembling | basic | sounds | string;
    value: number; // value: -1 | 0 | -1;
    percentage: number;
    time_start: number;
    time_end: number;
    text: string;
};

export type ClarityJSON = {
    values:ClarityDataItem[],
    basic: number,
    sounds: number,
    trembling: number
}
