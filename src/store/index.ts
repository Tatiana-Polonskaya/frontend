import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./api/register";
import { accountApi } from "./api/account";

import testSlice from "./slices/testSlice";
import profileSlice from "./slices/profileSlice";
import entryReducer from "./slices/entry";

export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        test: testSlice,
        profile: profileSlice,
        entry: entryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            registerApi.middleware,
            accountApi.middleware
        ),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
