import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { IUser } from "../../../models/entry/user";
import customFetchBase from "../utils/customFetchBase";
import { logout, setUser } from "../../slices/user";

export const userApi = createApi({
    reducerPath: "api/user",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getMe: build.query<IResponse<IUser>, null>({
            query: () => ({
                url: "/api/users/account/me",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        await dispatch(setUser(data.data!));
                    }
                } catch (error) {
                    await dispatch(logout());
                }
            },
        }),
    }),
});

export const { useGetMeQuery } = userApi;
export const { endpoints, reducerPath, reducer, middleware } = userApi;
