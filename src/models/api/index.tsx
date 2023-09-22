interface IError {
    code: number;
    msg: string;
}
export interface IResponse<T> {
    data?: T;
    error?: IError;
    success: boolean;
}
