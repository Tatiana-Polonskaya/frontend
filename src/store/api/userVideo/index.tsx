import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IVideoApiReq, IVideoUser } from "../../../models/video";
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
                    url: "api/video/upload",
                    method: "POST",
                    params: { title, duration, description },
                    body: bodyFormData,
                    formData: true,
                };
            },
        }),
        getVideoById: build.query<Response, string>({
            query: (videoId) => {
                return {
                    url: `api/video/${videoId}.mp4`,
                    method: "GET",
                };
            },
        }),
        getVideoByUser: build.query<IResponse<IVideoUser>, void>({
            query: () => {
                return {
                    url: `api/video/user`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useSendVideoMutation, useGetVideoByIdQuery, useLazyGetVideoByIdQuery, useGetVideoByUserQuery } =
    videoApi;

export const { endpoints, reducerPath, reducer, middleware } = videoApi;
