import { createSlice } from "@reduxjs/toolkit";
import { PageType, RegisterStep, UserType } from "../../../models/entry";

const initialState = {
    userType: UserType.Personal,
    registerStep: RegisterStep.PrimaryInfo,
};

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload;
        },
        setStep(state, action) {
            state.registerStep = action.payload;
        },
    },
});

export default entrySlice.reducer;

export const { setUserType, setStep } = entrySlice.actions;
