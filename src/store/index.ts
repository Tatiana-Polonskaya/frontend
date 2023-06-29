import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./api/register";
import { accountApi } from "./api/account";

import testSlice from "./slices/testSlice";
import profileSlice from "./slices/profileSlice";
import entryReducer from "./slices/entry";
import userReducer from "./slices/user";
import registerReducer from "./slices/register";
import surveyReducer from "./slices/survey";
import { userApi } from "./api/user";

import { reportApi } from "./api/report";

import { surveyApi } from "./api/survey";
import { videoApi } from "./api/userVideo";


export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

        [reportApi.reducerPath]: reportApi.reducer,

        [surveyApi.reducerPath]: surveyApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,

        register: registerReducer,
        test: testSlice,
        profile: profileSlice,
        entry: entryReducer,
        user: userReducer,
        survey: surveyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            registerApi.middleware,
            accountApi.middleware,
            userApi.middleware,

            reportApi.middleware

            surveyApi.middleware,
            videoApi.middleware,

        ),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
