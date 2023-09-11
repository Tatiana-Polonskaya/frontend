export type ConfidenceDataItem = {
    time_sec: number;
    confidence: number;

    text: string;

    time_start?: number;
    time_end?: number;
    seq_number?: number;
    value?: number;
};

export type ConfidenceJSON = {
    values: ConfidenceDataItem[];
    average_value: number;
    uncertainty: number;
    comment: string;
};
