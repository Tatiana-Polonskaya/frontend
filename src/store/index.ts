import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./api/testApi";
import testSlice from "./slices/testSlice";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer,
        test: testSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
