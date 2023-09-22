import { UUID } from "crypto";

export interface ITariff {
    id: string;
    duration: number;
    loads_limit: number;
    title: string;
    price: number;
}

export interface ISetTariff {
    tarif_id: string;
    user_id: UUID;
}
