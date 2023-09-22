export type TranscriptionValue = {
    seq_number: number;
    time_start: number;
    text: string;
};

export interface TranscriptionJSON {
    values: TranscriptionValue[];
}
