import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IResponse } from "../../../models/api";
import { IAimFromBack, IAimParameters, ISendUserPurpose } from "../../../models/aim";
import customFetchBase from "../utils/customFetchBase";

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
    }),
});

export const {
    useGetParamsQuery,
    useLazyGetParamsQuery,
    useGetUserPurposesQuery,
    useLazyGetUserPurposesQuery,
    useSendUserPurposeMutation,
} = diaryApi;

export const { endpoints, reducerPath, reducer, middleware } = diaryApi;
