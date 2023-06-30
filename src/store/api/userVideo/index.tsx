import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IVideoApiReq, IVideoInfo, IVideoUploadItem, IVideoUser } from "../../../models/video";
import customFetchBase from "../utils/customFetchBase";
import { UUID } from "crypto";


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
        getVideoById: build.query<IResponse<void>, string>({
            query: (videoId) => {
                return {
                    url: `/api/video/${videoId}`,
                    method: "GET",
                };
            },
        }),
        getVideoByUser: build.query<IResponse<IVideoUser>, number>({
            query: (limit=6) => {
                return {
                    url: `/api/video/user`,
                    params: {limit},
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
            query: ({id,title, description}) => {
                return {
                    url: `/api/video/`,
                    params: {id,title, description},
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

export const { useSendVideoMutation, useGetVideoByIdQuery, useLazyGetVideoByIdQuery, useGetVideoByUserQuery, useGetVideoInfoByIdQuery, useUpdateVideoInfoByIdMutation, useDeleteVideoByIdMutation  } =
    videoApi;

export const { endpoints, reducerPath, reducer, middleware } = videoApi;
