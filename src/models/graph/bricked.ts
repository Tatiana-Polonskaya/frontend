export type BrickedGraphItem = {
    id: number;
    text: string;
    top?: string;
    startTime: number;
    endTime: number;
    color: string;
    type?: "thin" | "solid";
};
