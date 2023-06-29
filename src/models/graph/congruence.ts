import { ChannelInfo } from "./emotionality"

export type CongruenceItem = {
    time_start: number,
    value: number,
    type: string,
    time_end:number
}

export enum CongruenceEnum {
    A_V= "A-V",
    A_T = "A-T",
    V_T = "V-T",
}

export type CongruenceValues = Record<CongruenceEnum, CongruenceItem[]>;

export type CongruenceJSON = {
    values: CongruenceValues,
    diameter: ChannelInfo,
}