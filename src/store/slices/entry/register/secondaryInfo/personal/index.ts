import { createSlice } from "@reduxjs/toolkit";

type Type = {
    birthday?: string;
    city?: string;
};

const initialState: Type = {};

const secondaryInfoPersonalSlice = createSlice({
    name: "secondaryPersonal",
    initialState,
    reducers: {
        resetSecondaryInfoPersonal: () => initialState,
        setBirthday(state, action) {
            state.birthday = action.payload;
        },
        setCity(state, action) {
            state.city = action.payload;
        },
    },
});

export const { setBirthday, setCity, resetSecondaryInfoPersonal } =
    secondaryInfoPersonalSlice.actions;

export default secondaryInfoPersonalSlice.reducer;
