enum HType {
    HTemp = "h-temp",
    HVolume = "h-volume",
    HTone = "h-tone",
}
type HItemValues = Record<HType, number>;

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

export type NonMonotonyJSON = {
    values: NonMonotonyDataItem[];
} & HItemValues;
