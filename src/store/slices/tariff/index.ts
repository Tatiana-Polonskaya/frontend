import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type LocalTariff = {
    id: string;
    price: number;
};

const tariffSlice = createSlice({
    name: "tariff",
    initialState: { id: "", price: 0 },
    reducers: {
        updateTariffAnswers: (state, action: PayloadAction<LocalTariff>) => {
            state.id = action.payload.id;
            state.price = action.payload.price;
        },
        updatePrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
    },
});

export default tariffSlice.reducer;

export const { updateTariffAnswers, updatePrice } = tariffSlice.actions;
