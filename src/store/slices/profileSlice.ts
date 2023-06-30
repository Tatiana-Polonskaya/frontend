import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialProfileState = {
    name: "Виктор",
    lastName: "Петрович",
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialProfileState,
    reducers: {
        setNameProfile:(state, action: PayloadAction<string>)=>{
            state.name = action.payload;
        },
        setLastNameProfile:(state, action: PayloadAction<string>)=>{
            state.lastName = action.payload;
        },
    },
});

export default profileSlice.reducer;

export const { setNameProfile, setLastNameProfile } = profileSlice.actions;
