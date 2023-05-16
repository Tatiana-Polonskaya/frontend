import { combineReducers } from "@reduxjs/toolkit";
import secondaryInfoPersonalSlice from "./personal";
import secondaryInfoBusinessSlice from "./business";

const secondaryInfoReducer = combineReducers({
    personal: secondaryInfoPersonalSlice,
    business: secondaryInfoBusinessSlice,
});

export default secondaryInfoReducer;
