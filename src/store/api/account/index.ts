import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { ILoginRequest, ILoginResponse } from "../../../models/entry/login";
import { setAccessToken } from "../../slices/user";
import { IUser } from "../../../models/entry/user";

import { userApi } from "../user";

export const accountApi = createApi({
    reducerPath: "api/login",
    baseQuery: fetchBaseQuery({
        baseUrl: "api/users/account",
    }),
    endpoints: (build) => ({
        login: build.query<IResponse<ILoginResponse>, ILoginRequest>({
            query: (loginRequest) => ({
                url: "login",
                method: "POST",
                params: { email: loginRequest.email },
                body: { password: loginRequest.password },
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        await dispatch(setAccessToken(data.data!.access_token));
                        await dispatch(userApi.endpoints.getMe.initiate(null));
                    }
                } catch (error) {}
            },
        }),
        logout: build.mutation<null, any>({
            query: () => ({
                url: "logout",
                method: "POST",
                credentials: "include",
            }),
        }),
        passwordRestore: build.query<IResponse<void>, string>({
            query: (email) => ({
                url: "password/restore",
                method: "POST",
                params: { email },
            }),
        }),
        getMe: build.query<IUser, null>({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (result: IResponse<IUser>) => result.data!,
        }),
    }),
});

export const {
    useLazyLoginQuery,
    useLazyPasswordRestoreQuery,
    useGetMeQuery,
    useLogoutMutation,
} = accountApi;

export const { endpoints, reducerPath, reducer, middleware } = accountApi;
