import { createSlice } from "@reduxjs/toolkit";


export interface User {
    id: string | null;
    email: string | null;
    password: string | null | any;
    avatar?: any | null;
    fullName?: string | null;
}





const initialState: User = {
    id: null,
    email: null,
    password: null,
    avatar: null,
    fullName: null
};




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.password = action.payload.password;
            state.avatar = action.payload.avatar;
            state.fullName = action.payload.fullName;
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.password = null;
            state.avatar = null;
            state.fullName = null;
        }
    },
});



export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;