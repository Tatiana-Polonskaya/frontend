export enum TotalType {
    CONNECTEDNESS = "connectedness",
    ARGUMENTATIVE = "argumentativeness",
    CLARITY = "clarity",
    DYNAMISM = "dynamism",
    PERSUASIVENESS = "persuasiveness",
    COMMUNICATIVE = "communicative",
}

export enum TotalTypeRecomendation {
    CONNECTEDNESS_REC = "connectedness_recommendations",
    ARGUMENTATIVE_REC = "argumentativeness_recommendations",
    CLARITY_REC = "clarity_recommendations",
    DYNAMISM_REC = "dynamism_recommendations",
    PERSUASIVENESS_REC = "persuasiveness_recommendations",
    COMMUNICATIVE_REC = "communicative_recommendations",
}

type ExtendWithType = Record<TotalType, number>;
type ExtendWithTypeRecomendation = Record<TotalTypeRecomendation, string>;

export type TotalDataItem = {
    big_conclussion: string;
    conclussion: string;
    total_result: number;
} & ExtendWithType &
    ExtendWithTypeRecomendation;

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
