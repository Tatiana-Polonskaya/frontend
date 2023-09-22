import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";

import { IUser } from "../../../models/entry/user";
import customFetchBase from "../utils/customFetchBase";
import { logout, setUser } from "../../slices/user";
import { setProfile } from "../../slices/profileSlice";

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
                        await dispatch(setProfile(data.data!));
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
        sendUserAvatar: build.mutation<IResponse<void>, Blob>({
            query: (file) => {
                const bodyFormData = new FormData();
                bodyFormData.append("avatar", file);
                return {
                    url: `/api/users/account/avatar`,
                    // headers: { 'Content-Type': 'multipart/form-data' },
                    method: "POST",
                    body: bodyFormData,
                    formData: true,
                };
            },
            // transformResponse:(response:File )=>{
            //     console.log(response)
            //     return {
            //         data: {img:response},
            //         error: {code: 500, msg:""},
            //         success: true,
            //     } as IResponse<any>
            // },
        }),
    }),
});

export const {
    useGetMeQuery,
    useLazyGetMeQuery,
    useSendUserAvatarMutation,
    useGetUserAvatarQuery,
    useLazyGetUserAvatarQuery,
} = userApi;
export const { endpoints, reducerPath, reducer, middleware } = userApi;
