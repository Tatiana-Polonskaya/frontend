import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../../../models/api";
import { ISetTariff, ITariff } from "../../../models/tariff";
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
        getUserTraiff: build.query<IResponse<ITariff>, void>({
            query: () => ({
                url: "/api/users/tarifs/info",
                method: "GET",
            }),
        }),
        sendTariff: build.mutation<IResponse<void>, ISetTariff>({
            query: ({ tarif_id, user_id }) => ({
                url: "/api/users/tarifs/set",
                method: "POST",
                params: { tarif_id, user_id },
            }),
        }),
    }),
});

export const {
    useGetTraiffsQuery,
    useGetUserTraiffQuery,
    useSendTariffMutation,
} = tariffApi;

export const { endpoints, reducerPath, reducer, middleware } = tariffApi;
