
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
    seq_number: number,
    value: number,
    date: string
}

export interface IStatisticJSON {
    values: IStatisticItem[];
}