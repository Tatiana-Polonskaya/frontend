export enum TotalType {
    CONNECTEDNESS = "connectedness",
    ARGUMENTATIVE = "argumentativeness",
    CLARITY = "clarity",
    DYNAMISM = "dynamism",
    PERSUASIVENESS = "persuasiveness",
    COMMUNICATIVE = "communicative",
}

type ExtendWithType = Record<TotalType, number>;

export type TotalDataItem = {
    big_conclusion: string;
    conclusion: string;
    total_result: number;
} & ExtendWithType;

export type TotalGraphJSON = {
    values: TotalDataItem;
};