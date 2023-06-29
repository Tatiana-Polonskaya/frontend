
export enum EnergyType {
    ENERGY = "energy",
}

type ExtendWithType = Record<EnergyType, number>;

export type EnergyDataItem = {
    seq_number: number;
    time_start: number;
} & ExtendWithType;


export type EnergyJSON = {
    values: EnergyDataItem[],
    total_energy:number,
}
