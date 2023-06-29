export enum ParasiticWords {
    FIRST_PARASITE = "слово",
    SECOND_PARASITE = "ещеслово",
    THIRD_PARASITE = "ещеслололово",
    FOURTH_PARASITE = "что-то",
}

export type ParasiticWordsItem = Record<ParasiticWords, number>;

export type EloquenceDataItem = {
    parasitic_words: number;
    short_sentences: number; 
    short_words: number; 
    active_words: number;
    parasitic_words_list: ParasiticWordsItem;
};

export type EloquenceJSON = {
    values:EloquenceDataItem,
} 