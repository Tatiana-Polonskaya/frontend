import { IUser } from "../user";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    user: IUser;
}
