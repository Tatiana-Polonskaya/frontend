export type ArgumentativenessDataItem = {
    seq_number: number;
    time_start: string;
    text: string;
    value: number;
    link: string;
    allocated: string;
};

export type ArgumentativenessJSON = {
    values: ArgumentativenessDataItem[];
    originality: number;
    borrowing: number;
    citation: number;
};
