import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../..";
import { Mutex } from "async-mutex";
import { logout, setAccessToken } from "../../slices/user";
import { IResponse } from "../../../models/api";
import { ILoginResponse } from "../../../models/entry/login";

const mutex = new Mutex();

const baseQ = fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    },
});

const myFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQ(args, api, extraOptions);

    // condition for token refreshing
    if ((result.error?.data as any)?.message === 'You are not logged in'){
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQ(
                    {
                        credentials: "include",
                        url: "/api/users/account/refresh",
                        method: "POST",
                    },
                    api,
                    extraOptions
                );
                const refreshResultData =
                    refreshResult.data as IResponse<ILoginResponse>;
                if (refreshResultData.success) {
                    api.dispatch(
                        setAccessToken(refreshResultData.data!.access_token)
                    );
                    result = await baseQ(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                    window.location.href = "/"; /// to login page
                }
            } catch (e) {
                api.dispatch(logout());
                window.location.href = "/"; /// to login page
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQ(args, api, extraOptions);
        }
    }
    return result;
};


export const apiWithDifAnswers = createApi({
    reducerPath: "api/apiWithDifAnswers",
    baseQuery: myFetchBase,
    endpoints: (build) => ({
        getVideoById: build.query<string, string>({
            query: (id) => ({
                url: `/api/video/test/${id}`,
                method: "GET",
                responseHandler: async (response) => {
                    let temp = response.blob();
                    const res = await temp;
                    return URL.createObjectURL(res);
                },
            }),
        }),
        getImageById: build.query<string, string>({
            query: (id) => ({
                url: `/api/users/account/avatar/${id}`,
                method: "GET",
                responseHandler: async (response) => {
                    let temp = response.blob();
                    const res = await temp;
                    return URL.createObjectURL(res);
                },
            }),
            keepUnusedDataFor: 1,
        }),
    }),
});

export const {
    useGetVideoByIdQuery,
    useGetImageByIdQuery,
    useLazyGetImageByIdQuery
} = apiWithDifAnswers;

export const { endpoints, reducerPath, reducer, middleware } = apiWithDifAnswers;
