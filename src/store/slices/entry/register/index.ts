import { combineReducers, createSlice } from "@reduxjs/toolkit";
import primaryReducer from "./primaryInfo";
import secondaryInfoReducer from "./secondaryInfo";
import { RegisterStep } from "../../../../models/entry";

const initialState = {
    step: RegisterStep.PrimaryInfo,
};

const registerSlice = createSlice({
    name: "generic",
    initialState,
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },
    },
});

const registerReducer = combineReducers({
    generic: registerSlice.reducer,
    primary: primaryReducer,
    secondary: secondaryInfoReducer,
});

export default registerReducer;

export const { setStep } = registerSlice.actions;
