import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import {
    IParamsForQueryUserVideo,
    IVideoApiReq,
    IVideoInfo,
    IVideoUploadItem,
    IVideoUser,
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
                    params: { page, limit,tutorial },
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
    }),
});

export const {
    useSendVideoMutation,
    useGetMainVideoQuery,
    useLazyGetMainVideoQuery,
    useGetVideoByIdQuery,
    useLazyGetVideoByIdQuery,
    useGetVideoByUserQuery,
    useGetVideoInfoByIdQuery,
    useUpdateVideoInfoByIdMutation,
    useDeleteVideoByIdMutation,
} = videoApi;

export const { endpoints, reducerPath, reducer, middleware } = videoApi;
