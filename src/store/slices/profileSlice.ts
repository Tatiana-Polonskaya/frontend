import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/entry/user";


const initialStateForProfile:IUser = {
    id: "dudud-dudud-dudud-dudud-dudud",
    firstname: "Виктор",
    lastname: "Петрович",
    birthday: "09.09.2009",
    phone: "89998887766",
    city: "Москва",
    email: "example@mail.ru",
    registration_data: "2023-06-09",
    status: "no_active",
    tarif_active: false,
    loads_count: 0,
    loads_limit: 0,
    tarif_duration: 0,
    trial_used: false,
}

export const initialProfileState = {
    name: "Виктор",
    lastName: "Петрович",
};

const profileSlice = createSlice({
    name: "profile",
    initialState: {user: initialStateForProfile, avatar:`/api/users/account/avatar/${initialStateForProfile.id}`},
    reducers: {
        setProfile:(state, action: PayloadAction<IUser>)=>{
            state.user = action.payload;
            state.avatar = `/api/users/account/avatar/${action.payload.id}`;
        },
        setProfileAvatar:(state, action: PayloadAction<string>)=>{
            state.avatar = action.payload;
        }
    },
});

export default profileSlice.reducer;

export const { setProfile, setProfileAvatar } = profileSlice.actions;
