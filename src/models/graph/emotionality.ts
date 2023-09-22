export enum EmotionalityChannel {
    VIDEO = "video",
    AUDIO = "audio",
    TEXT = "text",
}

export enum EmotionalityItem {
    NEUTRAL = "neutral",
    HAPPINESS = "happiness",
    ANGER = "anger",
}

export type ChannelItem = Record<EmotionalityItem, number>;

export type ChannelInfo = Record<EmotionalityChannel, ChannelItem>;

export type EmotionalityDataItem = {
    seq_number: number;
    time_start: number;
} & ChannelInfo;

type Toteltem = Record<EmotionalityItem, number>;

export type EmotionalityJSON = {
    total: Toteltem;
    values: EmotionalityDataItem[];
};
