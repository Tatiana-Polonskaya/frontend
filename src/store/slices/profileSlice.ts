import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Виктор",
    lastName: "Петрович",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
});

export default profileSlice.reducer;
