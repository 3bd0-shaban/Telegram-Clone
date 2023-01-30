import { createSlice } from "@reduxjs/toolkit"
const UserSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        token: null,
        // isLogged: localStorage.getItem('Logged?') ? true : false,
        // isAdmin: localStorage.getItem('admin?') ? true : false
    },
    reducers: {
        setCredentials(state, action) {
            const { auth, accessToken } = action.payload;
            state.user = auth;
            state.token = accessToken;
            // state.isLogged = localStorage.getItem('Logged?') ? true : false;
            // state.isAdmin = localStorage.getItem('Admin?') ? true : false;
        },
        LogOut(state) {
            state.user = {};
            state.token = null;
            // state.isLogged = false;
            // state.isAdmin = false;
        },
    }
})
export const { setCredentials, LogOut } = UserSlice.actions;
export default UserSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
