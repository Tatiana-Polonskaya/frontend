import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import {
    IParamsForQueryUserVideo,
    IVideoApiReq,
    IVideoInfo,
    IVideoStatus,
    IVideoUploadItem,
    IVideoUser,
    IVideoUserStatus,
} from "../../../models/video";
import customFetchBase from "../utils/customFetchBase";

export const videoApi = createApi({
    reducerPath: "api/video",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        sendVideo: build.mutation<IResponse<void>, IVideoApiReq>({
            query: ({ title, duration, description, file }) => {
                var bodyFormData = new FormData();
                bodyFormData.append("file", file);
                console.log({ bodyFormData, file });
                return {
                    url: "/api/video/upload",
                    method: "POST",
                    params: { title, duration, description },
                    body: bodyFormData,
                    formData: true,
                };
            },
        }),
        getMainVideo: build.query<
            IResponse<IVideoUser>,
            IParamsForQueryUserVideo
        >({
            query: ({ page = 0, limit = 6, tutorial = false }) => {
                return {
                    url: "/api/video/main-page",
                    params: { page, limit, tutorial },
                    method: "GET",
                };
            },
        }),
        getVideoById: build.query<IResponse<void>, string>({
            query: (videoId) => {
                return {
                    url: `/api/video/${videoId}`,
                    method: "GET",
                };
            },
        }),
        // заменить интерфейсы
        getVideoStatusByUser: build.query<
            // IResponse<IVideoStatus>,
            IResponse<IVideoUserStatus>,
            IParamsForQueryUserVideo
        >({
            query: ({ page = 0, limit = 6 }) => {
                return {
                    url: `/api/video/status`,
                    params: { page, limit },
                    method: "GET",
                };
            },
        }),
        getVideoByUser: build.query<
            IResponse<IVideoUser>,
            IParamsForQueryUserVideo
        >({
            query: ({ page = 0, limit = 6 }) => {
                return {
                    url: `/api/video/user`,
                    params: { page, limit },
                    method: "GET",
                };
            },
        }),

        getVideoByUserSearch: build.query<
            IResponse<IVideoUser>,
            IParamsForQueryUserVideo
        >({
            query: ({ page = 0, limit = 6, search = "" }) => {
                return {
                    url: `/api/video/user`,
                    params: { page, limit, search },
                    method: "GET",
                };
            },
        }),
        getVideoInfoById: build.query<IResponse<IVideoInfo>, string>({
            query: (id) => {
                return {
                    url: `/api/video/`,
                    params: { id },
                    method: "GET",
                };
            },
        }),

        updateVideoInfoById: build.mutation<IResponse<void>, IVideoUploadItem>({
            query: ({ id, title, description }) => {
                return {
                    url: `/api/video/`,
                    params: { id, title, description },
                    method: "PUT",
                };
            },
        }),
        deleteVideoById: build.mutation<IResponse<void>, string>({
            query: (id) => {
                return {
                    url: `/api/video/`,
                    params: { id },
                    method: "DELETE",
                };
            },
        }),
        getTestVideoById: build.query<any, string>({
            query: (id) => ({
                url: `/api/video/test/${id}`,
                method: "GET",
            }),
            transformResponse: async (response: any) => {
                console.log("response", response);
                return {
                    data: await response.blob(),
                    error: { code: response.status, msg: response.statusText },
                    success: response.ok,
                };
            },
        }),
    }),
});

export const {
    useSendVideoMutation,
    useGetMainVideoQuery,
    useLazyGetMainVideoQuery,
    useGetVideoByIdQuery,
    useLazyGetVideoByIdQuery,
    useGetVideoStatusByUserQuery,
    useLazyGetVideoStatusByUserQuery,
    useGetVideoByUserQuery,
    useGetVideoByUserSearchQuery,
    useLazyGetVideoByUserQuery,
    useLazyGetVideoByUserSearchQuery,
    useGetVideoInfoByIdQuery,
    useUpdateVideoInfoByIdMutation,
    useDeleteVideoByIdMutation,
    useGetTestVideoByIdQuery,
} = videoApi;

export const { endpoints, reducerPath, reducer, middleware } = videoApi;
