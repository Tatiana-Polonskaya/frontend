import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    lastName: "",
    email: "",
};

export const primaryInfoSlice = createSlice({
    name: "primary",
    initialState,
    reducers: {
        resetPrimaryInfo: () => initialState,
        setName(state, action) {
            state.name = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
    },
});

export default primaryInfoSlice.reducer;

export const { setName, setLastName, setEmail, resetPrimaryInfo } =
    primaryInfoSlice.actions;
