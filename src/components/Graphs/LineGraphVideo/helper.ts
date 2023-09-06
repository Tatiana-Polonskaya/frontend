import GraphColor from "../../../models/graph/_colors";

const MIN_HEIGHT = 20;

export function getHeightByValue(value: number) {
    value *= 100;
    if (value < MIN_HEIGHT) return MIN_HEIGHT;
    else if (value < 60) return 50;
    else return value;
}

export enum EMOTION {
    ANGRY = "angry",
    HAPPINESS = "happiness",
    NEUTRAL = "neutral",
}

export function getColorByEmotion(emotion: EMOTION) {
    switch (emotion) {
        case EMOTION.ANGRY:
            return GraphColor.RED;
        case EMOTION.HAPPINESS:
            return GraphColor.GREEN;
        default:
            return GraphColor.GRAY;
    }
}
