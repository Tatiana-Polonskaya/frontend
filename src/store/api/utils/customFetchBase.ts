import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { IResponse } from "../../../models/api";
import { ILoginResponse } from "../../../models/entry/login";
import { logout, setAccessToken } from "../../slices/user";
import { RootState } from "../..";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    // console.log("customFetchBase result",result)
    const data = result.data as IResponse<any>;

    // condition for token refreshing
    if (
        data &&
        !data.success &&
        (data.error?.code === 10009 || data.error?.code === 403)
        // || [4, 5].includes(+(result.meta!.response!.status / 100).toFixed(0)) // check if status code starts with 4 or 5
    ) {
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

export default customFetchBase;
