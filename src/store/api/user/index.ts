import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { IUser } from "../../../models/entry/user";
import customFetchBase from "../utils/customFetchBase";

export const userApi = createApi({
    reducerPath: "api/user",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getMe: build.query<IUser, null>({
            query: () => ({
                url: "account/me",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (result: IResponse<IUser>) => result.data!,
        }),
    }),
});

export const { useGetMeQuery } = userApi;
export const { endpoints, reducerPath, reducer, middleware } = userApi;
