import { createSlice } from "@reduxjs/toolkit";

type Type = {
    birthday?: string;
    city?: string;
};

const initialState: Type = {
    birthday: undefined,
    city: undefined,
};

const secondaryInfoPersonalSlice = createSlice({
    name: "secondaryPersonal",
    initialState,
    reducers: {
        setBirthday(state, action) {
            state.birthday = action.payload;
        },
        setCity(state, action) {
            state.city = action.payload;
        },
    },
});

export const { setBirthday, setCity } = secondaryInfoPersonalSlice.actions;

export default secondaryInfoPersonalSlice.reducer;
