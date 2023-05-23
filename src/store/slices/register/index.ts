import personalRegisterReducer from "./personal";
import businessRegisterReducer from "./business";
import { combineReducers } from "@reduxjs/toolkit";

const registerReducer = combineReducers({
    personal: personalRegisterReducer,
    business: businessRegisterReducer,
});

export default registerReducer