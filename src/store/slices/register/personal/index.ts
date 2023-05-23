import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRegisterPersonal {
    name: string;
    lastName: string;
    birthday: string;
    city?: string;
    email: string;
    tel: string;
}

const initialState: IRegisterPersonal = {
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    tel: "",
};

const personalRegisterSlice = createSlice({
    name: "register/personal",
    initialState,
    reducers: {
        clearPersonalRegister: () => initialState,
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setLastName(state, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        setBirthday(state, action: PayloadAction<string>) {
            state.birthday = action.payload;
        },
        setCity(state, action: PayloadAction<string | undefined>) {
            state.city = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setTel(state, action: PayloadAction<string>) {
            state.tel = action.payload;
        },
    },
});

export default personalRegisterSlice.reducer;

export const {
    clearPersonalRegister,
    setName,
    setLastName,
    setBirthday,
    setCity,
    setEmail,
    setTel,
} = personalRegisterSlice.actions;
