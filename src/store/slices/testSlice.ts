import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value1: 0,
    value2: "thisIsStringValue",
};

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        addToValue1(state, action) {
            state.value1 += action.payload;
        },
        changeValue2(state, action) {
            state.value2 = action.payload;
        },
    },
});

export const { addToValue1, changeValue2 } = testSlice.actions;
export default testSlice.reducer;
