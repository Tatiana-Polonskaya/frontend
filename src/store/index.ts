import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./api/register";
import { accountApi } from "./api/account";

import testSlice from "./slices/testSlice";
import profileSlice from "./slices/profileSlice";
import entryReducer from "./slices/entry";
import userReducer from "./slices/user";
import { userApi } from "./api/user";

export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        test: testSlice,
        profile: profileSlice,
        entry: entryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            registerApi.middleware,
            accountApi.middleware,
            userApi.middleware
        ),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
