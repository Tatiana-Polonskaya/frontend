import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { ILoginRequest, ILoginResponse } from "../../../models/entry/login";

export const accountApi = createApi({
    reducerPath: "api/login",
    baseQuery: fetchBaseQuery({ baseUrl: "account" }),
    endpoints: (build) => ({
        login: build.query<IResponse<ILoginResponse>, ILoginRequest>({
            query: (loginRequest) => ({
                url: "login",
                method: "POST",
                params: { email: loginRequest.email },
                body: { password: loginRequest.password },
            }),
        }),
        passwordRestore: build.query<IResponse<void>, string>({
            query: (email) => ({
                url: "password/restore",
                method: "POST",
                params: { email },
            }),
        }),
    }),
});

export const { useLazyLoginQuery, useLazyPasswordRestoreQuery } = accountApi;
export const { endpoints, reducerPath, reducer, middleware } = accountApi;
