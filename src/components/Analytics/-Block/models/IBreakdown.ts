import { IModification } from "./IModification";

export interface IBreakdown {
    time: string;
    description: string;
    modification: IModification;
}
