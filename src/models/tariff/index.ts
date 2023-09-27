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

export interface IOrderTariff {
    price: number;
    user_id: string;
    tarif_id: string;
    key: string;
}

export interface IActionTariff {
    client_email: string;
    clientid: string;
    orderid: string;
    sum: number;
    pstype: string;
}
