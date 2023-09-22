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
    action_words: number;
    parasitic_words_list: {
        [key: string]: number;
    };
};

export type EloquenceJSON = {
    values: EloquenceDataItem;
};
