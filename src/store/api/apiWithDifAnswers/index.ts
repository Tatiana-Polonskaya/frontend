import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../..";
import { Mutex } from "async-mutex";
import { logout, setAccessToken } from "../../slices/user";
import { IResponse } from "../../../models/api";
import { ILoginResponse } from "../../../models/entry/login";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
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
    let result = await baseQuery(args, api, extraOptions);
    console.log("myFetchBase result",result.meta!.response)

    // condition for token refreshing
    if ((result.error?.data as any)?.message === 'You are not logged in'){
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery(
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
                    result = await baseQuery(args, api, extraOptions);
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
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};


export const apiWithDifAnswers = createApi({
    reducerPath: "api/apiWithDifAnswers",
    baseQuery: myFetchBase,
    endpoints: (build) => ({
        getVideoById: build.query<any, string>({
            query: (id) => ({
                url: `/api/video/test/${id}`,
                method: "GET",
                transform: async (response:any) => {
                    let fileBlob = response.blob();
                    console.log("fileBlob", fileBlob)
                    return fileBlob;
                },
            }),
            transformResponse: async (response: any)=>{
                console.log("transformResponse",response)
                return await response.body.blob();
            }
        }),
    }),
});

export const {
    useGetVideoByIdQuery
} = apiWithDifAnswers;

export const { endpoints, reducerPath, reducer, middleware } = apiWithDifAnswers;
