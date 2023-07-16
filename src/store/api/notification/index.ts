import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import customFetchBase from "../utils/customFetchBase";

export const notificationApi = createApi({
    reducerPath: "/api/notification",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getNotifications: build.query<IResponse<any>, void>({
            query: () => ({
                url: "/api/support/notifications",
                method: "GET",
            }),
        }),
        readNotifications: build.mutation<IResponse<any>, string[]>({
            query: (idNotifications) => ({
                url: "/api/support/read-notifications",
                method: "POST",
                body: idNotifications,
            }),
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useLazyGetNotificationsQuery,
    useReadNotificationsMutation,
} = notificationApi;

export const { endpoints, reducerPath, reducer, middleware } = notificationApi;
