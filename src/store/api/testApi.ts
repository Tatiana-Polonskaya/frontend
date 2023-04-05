import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TestServerResponse } from "../../models";

export const testApi = createApi({
    reducerPath: "test/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    endpoints: (build) => ({
        getData: build.query<TestServerResponse, void>({
            query: () => ({
                url: "users", // params, body, cache, etc.
            }),
        }),
    }),
});

export const { useGetDataQuery } = testApi; // custom hook for data fetching
