export interface IRegister {
    firstname: string;
    lastname: string;
    birthday: string;
    phone: string;
    city: string;
    email: string;
    avatar?: string | null;
    password: string;
}

export interface IRegisterResponse {
    id: string;
    firstname: string;
    lastname: string;
    birthday: string;
    phone: string;
    city: string;
    email: string;
    avatar?: string;
    registration_data: string;
    status: string;
    tarif_active: boolean;
    loads_count: number | null;
    loads_limit: number | null;
    tarif_duration: number | null;
    trial_used: boolean;
}

export interface ICheckEmail {
    email: string;
}
