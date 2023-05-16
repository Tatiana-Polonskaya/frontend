

export interface IRegister {
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    avatar?: string;
    password: string;
}

export interface IRegisterResponse {
    id: string;
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    avatar?: string;
    registration_data: string;
    status: string;
    tarif_active: boolean;
}

export interface ICheckEmail {
    email: string
}