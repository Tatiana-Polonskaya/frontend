import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { IActionTariff, IOrderTariff, ITariff } from "../../../models/tariff";
import customFetchBase from "../utils/customFetchBase";

export const tariffApi = createApi({
    reducerPath: "/api/tariff",
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getTraiffs: build.query<IResponse<ITariff[]>, void>({
            query: () => ({
                url: "/api/users/tarifs",
                method: "GET",
            }),
        }),
        getUserTraiff: build.query<IResponse<ITariff[]>, void>({
            query: () => ({
                url: "/api/users/tarifs/info",
                method: "GET",
            }),
        }),
        setTrialtariff: build.mutation<IResponse<void>, string>({
            query: (user_id) => ({
                url: "/api/users/tarifs/trial",
                method: "POST",
                params: { user_id },
            }),
        }),
        sendPaidTariff: build.mutation<IResponse<void>, IOrderTariff>({
            query: (params) => ({
                url: "/api/users/tarifs/order",
                method: "POST",
                params: params,
            }),
        }),
        actionForm: build.mutation<IResponse<void>, IActionTariff>({
            query: (params) => ({
                url: "https://speechup.server.paykeeper.ru/create/",
                method: "POST",
                params: params,
            }),
        }),
    }),
});

export const {
    useGetTraiffsQuery,
    useGetUserTraiffQuery,
    useSetTrialtariffMutation,
    useActionFormMutation,
    useSendPaidTariffMutation,
} = tariffApi;

export const { endpoints, reducerPath, reducer, middleware } = tariffApi;
