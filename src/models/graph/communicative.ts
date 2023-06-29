export enum CommunicativeValue {
    FIRST = "0",
    SECOND = "1",
    THIRD = "2",
    FOURTH = "3",
    FIFTH = "4",
}


export type CommunicativeValueItem = Record<CommunicativeValue, string[]>;

export type CommunicativeValuesItem = {
    seq_number: number;
    text: string;
    value: CommunicativeValueItem;
    time_start: string;
}


export type CommunicativeJSON = {
    filler_words: number;
    cognitive_distortion: number;
    aggression: number;
    values:CommunicativeValuesItem[];
} ;