import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IRegister, IRegisterResponse } from "../../../models/entry/register";

export const registerApi = createApi({
    reducerPath: "api/register",
    baseQuery: fetchBaseQuery({ baseUrl: "register" }),
    endpoints: (build) => ({
        register: build.mutation<IResponse<IRegisterResponse>, IRegister>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
        }),
        checkEmail: build.query<IResponse<void>, string>({
            query: (email) => ({
                url: "validation",
                method: "POST",
                body: { email },
            }),
        }),
        confirm: build.query<IResponse<void>, string>({
            query: (token) => ({
                url: `confirm/${token}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useRegisterMutation, useLazyCheckEmailQuery, useConfirmQuery } =
    registerApi;
export const { endpoints, reducerPath, reducer, middleware } = registerApi;
