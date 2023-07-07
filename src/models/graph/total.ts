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

/* ---------------------------- TITLE TYPE IN RUSSIAN ---------------------------- */

export enum TotalTypeInRussian {
    CONNECTEDNESS = "связность",
    ARGUMENTATIVE = "аргументированность",
    CLARITY = "ясность",
    DYNAMISM = "динамизм",
    PERSUASIVENESS = "убедительность",
    COMMUNICATIVE = "соблюдение коммуникативной нормы",
}