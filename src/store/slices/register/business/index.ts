import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    lastName: "",
    email: "",
    companyName: "",
    TIN: "",
    workPosition: "",
};

const businessRegisterSlice = createSlice({
    name: "register/business",
    initialState,
    reducers: {
        resetBusinessInfo: () => initialState,
        setName(state, action) {
            state.name = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
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

export const {
    setName,
    setLastName,
    setEmail,
    setCompanyName,
    setTIN,
    setWorkPosition,
    resetBusinessInfo,
} = businessRegisterSlice.actions;

export default businessRegisterSlice.reducer;
