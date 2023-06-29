export type EmotionalArousalDataItem = {
    emotional_arousal: number;
    trager_coefficient: number; 
    action_certainty_factor: number; 
    aggressiveness_coefficient: number;
};

export type EmotionalArousalJSON  = {
    values: EmotionalArousalDataItem,
}