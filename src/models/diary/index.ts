export enum TYPE_DIARY {
    connectivity = "connectivity",
    dynamism = "dynamism",
    argumentativeness = "argumentativeness",
    clarity = "clarity",
    persuasiveness = "persuasiveness",
    communicative = "communicative",
    total = "total",
}

export interface IStatisticItem {
    seq_number: number;
    value: number;
    date: string;
}

export interface IStatisticJSON {
    values: IStatisticItem[];
    argumentativeness: number;
    clarity: number;
    communicative: number;
    connectedness: number;
    dynamism: number;
    persuasiveness: number;
    total_result: number;
}

export interface IAchievement {
    rank: string;
    previous_rank: string;
    text: string;
    improvements: string[];
    deterioration: string[];
}
