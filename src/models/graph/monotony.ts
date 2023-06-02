export enum NonMonotonyType {
    RATE = "rate",
    VOLUME = "volume",
    TONE = "tone",
}

type ExtendWithType = Record<NonMonotonyType, number>;

export type NonMonotonyDataItem = {
    seq_number: number;
    time_start: number;
} & ExtendWithType;
