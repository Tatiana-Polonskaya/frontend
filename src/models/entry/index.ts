import { IUser } from "./user";

export enum UserType {
    Personal,
    Business,
}

export enum PageType {
    Login,
    Register,
    PasswordRestore,
}

export enum RegisterStep {
    PrimaryInfo,
    SecondaryInfo,
    EmailVerification,
    FinishRegister,
}

export interface JWTToken {
    exp: number;
    iat: number;
    user: IUser;
}

