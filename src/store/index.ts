import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./api/register";
import { accountApi } from "./api/account";

import testSlice from "./slices/testSlice";
import profileSlice from "./slices/profileSlice";
import diarySlice from "./slices/diary";
import entryReducer from "./slices/entry";
import userReducer from "./slices/user";
import registerReducer from "./slices/register";
import surveyReducer from "./slices/survey";
import { userApi } from "./api/user";

import { reportApi } from "./api/report";
import { reportTestApi } from "./api/reportTest";

import { surveyApi } from "./api/survey";
import { videoApi } from "./api/userVideo";
import { diaryApi } from "./api/diary";
import { apiWithDifAnswers } from "./api/apiWithDifAnswers";
import { chatApi } from "./api/chat";
import { notificationApi } from "./api/notification";
import { tariffApi } from "./api/tariff";

export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

        [reportApi.reducerPath]: reportApi.reducer,
        [apiWithDifAnswers.reducerPath]: apiWithDifAnswers.reducer,

        [surveyApi.reducerPath]: surveyApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [diaryApi.reducerPath]: diaryApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [reportTestApi.reducerPath]: reportTestApi.reducer,
        [tariffApi.reducerPath]: tariffApi.reducer,

        register: registerReducer,
        test: testSlice,
        profile: profileSlice,
        entry: entryReducer,
        user: userReducer,
        survey: surveyReducer,
        diary: diarySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            registerApi.middleware,
            accountApi.middleware,
            userApi.middleware,
            apiWithDifAnswers.middleware,
            reportApi.middleware,
            diaryApi.middleware,
            surveyApi.middleware,
            videoApi.middleware,
            chatApi.middleware,
            notificationApi.middleware,
            reportTestApi.middleware,
            tariffApi.middleware,
        ),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
