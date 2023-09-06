import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IResponse } from "../../../models/api";
import { IAimFromBack, IAimParameters, ISendUserPurpose } from "../../../models/aim";
import customFetchBase from "../utils/customFetchBase";
import { IAchievement, IStatisticJSON, TYPE_DIARY } from "../../../models/diary";

export const diaryApi = createApi({
    reducerPath: "api/diary",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getParams: build.query<IResponse<IAimParameters>, null>({
            query: () => ({
                url: "/api/video/purposes/parameters",
                method: "GET",
            }),
        }),
        getUserPurposes: build.query<IResponse<IAimFromBack>, void>({
            query: () => ({
                url: "/api/video/purposes/",
                method: "GET",
            }),
        }),
        sendUserPurpose: build.mutation<IResponse<void>, ISendUserPurpose>({
            query: ({title, params}) => ({
                url: "/api/video/purposes/purpose",
                params: {title},
                method: "POST",
                body:params,
            }),
        }),
        deleteUserPurpose: build.mutation<IResponse<void>, string>({
            query: (id) => ({
                url: "/api/video/purposes/purpose",
                params: {id},
                method: "DELETE",
            }),
        }),
        getStatisticData: build.query<IResponse<IStatisticJSON>, TYPE_DIARY>({
            query: (type:TYPE_DIARY) => ({
                url: `/api/video/diary/${type}`,
                method: "GET",
            }),
        }),
        getAchievements: build.query<IResponse<IAchievement>, void>({
            query: () => ({
                url: `/api/video/user/achievements`,
                method: "GET",
            }),
        })
    }),
});

export const {
    useGetParamsQuery,
    useLazyGetParamsQuery,
    useGetUserPurposesQuery,
    useLazyGetUserPurposesQuery,
    useSendUserPurposeMutation,
    useGetStatisticDataQuery,
    useLazyGetStatisticDataQuery,
    useGetAchievementsQuery,
    useLazyGetAchievementsQuery,
    useDeleteUserPurposeMutation
} = diaryApi;

export const { endpoints, reducerPath, reducer, middleware } = diaryApi;
