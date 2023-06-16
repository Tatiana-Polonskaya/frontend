import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IVideoApiReq } from "../../../models/video";
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
                    url: "api/video/upload",
                    method: "POST",
                    params: { title, duration, description },
                    body: bodyFormData,
                    formData: true,
                };
            },
        }),
        getVideo: build.query<Response, string>({
            query: (videoId) => {
                return {
                    url: `api/video/${videoId}.mp4`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useSendVideoMutation, useGetVideoQuery, useLazyGetVideoQuery } =
    videoApi;

export const { endpoints, reducerPath, reducer, middleware } = videoApi;
