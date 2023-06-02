import GraphColor from "./_colors";

export type TimelineItem = {
    id: string | number;
    color?: GraphColor;
    time?: string;
    text?: string;
};
