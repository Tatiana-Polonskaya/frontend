import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { IUser } from "../../../models/entry/user";
import customFetchBase from "../utils/customFetchBase";
import { logout, setUser } from "../../slices/user";
import { setLastNameProfile, setNameProfile } from "../../slices/profileSlice";

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
                        await dispatch(setNameProfile(data.data!.firstname));
                        await dispatch(setLastNameProfile(data.data!.lastname));
                    }
                } catch (error) {
                    await dispatch(logout());
                }
            },
        }),
        getUserAvatar: build.query<IResponse<void>, void>({
            query: () => {
                return {
                    url: `/api/users/account/avatar`,
                    method: "GET",
                };
            },
        }),
        sendUserAvatar: build.mutation<IResponse<void>, File>({
            query: (avatar) => {
                var bodyFormData = new FormData();
                bodyFormData.append("file", avatar);
                console.log({ bodyFormData, avatar });
                return {
                    url:  `/api/users/account/avatar`,
                    method: "POST",
                    body: bodyFormData,
                    formData: true,
                };
            },
        }),
    }),
});

export const { useGetMeQuery, useGetUserAvatarQuery, useLazyGetUserAvatarQuery, useSendUserAvatarMutation } = userApi;
export const { endpoints, reducerPath, reducer, middleware } = userApi;
