export type ConfidenceDataItem = {
    seq_number: number;
    text: string;
    value: number;
    time_start: number;
    time_end: number;
};

export type ConfidenceJSON = {
    values:ConfidenceDataItem[],
    average_value: number,
    uncertainty: number
}