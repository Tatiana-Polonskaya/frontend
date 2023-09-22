import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../../models/entry/user";

const TOKEN_STORAGE_ID = "AT";

interface IUserState {
    user: IUser | null;
    accessToken: string | null;
}

const initialState: IUserState = {
    user: null,
    accessToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        ...initialState,
        accessToken: localStorage.getItem(TOKEN_STORAGE_ID),
    },
    reducers: {
        logout: () => {
            localStorage.removeItem(TOKEN_STORAGE_ID);
            return initialState;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem(TOKEN_STORAGE_ID, action.payload);
        },
    },
});

export default userSlice.reducer;

export const { logout, setUser, setAccessToken } = userSlice.actions;
