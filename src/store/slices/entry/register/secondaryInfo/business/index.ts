import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companyName: "",
    TIN: "",
    workPosition: "",
};

const secondaryInfoBusinessSlice = createSlice({
    name: "secondaryBusiness",
    initialState,
    reducers: {
        setCompanyName(state, action) {
            state.companyName = action.payload;
        },
        setTIN(state, action) {
            state.TIN = action.payload;
        },
        setWorkPosition(state, action) {
            state.workPosition = action.payload;
        },
    },
});

export const { setCompanyName, setTIN, setWorkPosition } =
    secondaryInfoBusinessSlice.actions;

export default secondaryInfoBusinessSlice.reducer;
