import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IAimItem } from "../../../models/aim";

const initialState: IAimItem = {
    title: "",
    is_done: false,
    progress: 0,
    created_at: "",
    tasks: [],
    parameters: [],
    motivating_phrase: "",
};

const diarySlice = createSlice({
    name: "diary",
    initialState: { userAims: [initialState] },
    reducers: {
        updateUserAims: (state, action: PayloadAction<IAimItem[]>) => {
            state.userAims = action.payload;
        },
    },
});

export default diarySlice.reducer;

export const { updateUserAims } = diarySlice.actions;
