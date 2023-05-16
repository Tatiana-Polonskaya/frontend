import { UUID } from "crypto";

export interface IUser {
    id: UUID;
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    avatar?: string;
    registration_data: string;
    status: string;
    tarif_active: boolean;
}

