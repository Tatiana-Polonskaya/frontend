export enum ExpressivenessType {
    NEUTRAL = "neutral",
    HAPPINESS = "happiness",
    ANGER = "anger",
}

type ExtendWithType = Record<ExpressivenessType, number>;

export type ExpressivenessDataItem = {
    seq_number: number;
    time_start: number;
    text: string | null;
} & ExtendWithType;

export type ExpressivenessJSON = {
    values: ExpressivenessDataItem[];
    total_expressiveness: number;
    comment: string;
};
