import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import customFetchBase from "../utils/customFetchBase";
import { IMessageItem } from "../../../models/chat";

export const chatApi = createApi({
    reducerPath: "/api/chat",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getMessages: build.query<IResponse<Array<IMessageItem>>, null>({
            query: () => ({
                url: "/api/support/messages",
                method: "GET",
            }),
        }),
        sendMessage: build.mutation<IResponse<any>, string>({
            query: (message) => ({
                url: "/api/support/send-message",
                method: "POST",
                params: {message},
            }),
        }),
        getSSEConnection: build.query<any, void>({
            query: () => ({
                url: "/api/support/sse-connection",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useLazyGetMessagesQuery,
    useGetSSEConnectionQuery,
    useSendMessageMutation
} = chatApi;

export const { endpoints, reducerPath, reducer, middleware } = chatApi;
