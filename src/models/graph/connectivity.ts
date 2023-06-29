export type ConnectivityDataItem = {
    seq_number: number;
    text: string;
    value: number;
    time_start: number;
    time_end: number;
};

export type ConnectivityJSON= {
    values: ConnectivityDataItem[];
    controversy: number;
    statements: number;
};
