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

export interface IPersonalSecondaryInfo {
    birthday?: Date;
    city?: string;
    password?: string;
}

export interface IBusinessSecondaryInfo {
    companyName?: string;
    TIN?: string;
    workPosition?: string;
}

export interface IPrimaryInfo {
    name?: string;
    lastName?: string;
    email?: string;
}

interface X<T> {
    data: T;
    setter: React.Dispatch<React.SetStateAction<{}>>;
}

export interface IRegister {
    personal: {
        primary: IPrimaryInfo;
        secondary: IPersonalSecondaryInfo;
    };
    business: {
        primary: IPrimaryInfo;
        secondary: IBusinessSecondaryInfo;
    };
}
