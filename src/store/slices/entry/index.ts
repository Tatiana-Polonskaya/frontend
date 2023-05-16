import { combineReducers } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { PageType, UserType } from "../../../models/entry";

import registerReducer from "./register";

const initialState = {
    userType: UserType.Personal,
};

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload;
        },
    },
});

export const entryReducer = combineReducers({
    entry: entrySlice.reducer,
    register: registerReducer,
});
export default entryReducer;

export const { setUserType } = entrySlice.actions;
