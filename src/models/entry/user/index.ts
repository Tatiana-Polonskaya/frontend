import { UUID } from "crypto";

export interface IUser {
    phone: any;
    city: any;
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
