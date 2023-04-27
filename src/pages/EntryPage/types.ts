export enum UserType {
    Personal,
    Business,
}

export enum PageType {
    Login,
    Register,
    PasswordRestore,
}

export enum RegisterSteps {
    PrimaryInfo,
    SecondaryInfo,
    EmailVerification,
    FinishRegister,
}

export interface IRegister {
    name?: string;
    lastName?: string;
    email?: string;
}

export interface IPersonalRegister extends IRegister {
    birthday?: Date;
    city?: string;
    password?: string;
}

export interface IBusinessRegister extends IRegister {
    companyName?: string;
    TIN?: string;
    workPosition?: string;
}
