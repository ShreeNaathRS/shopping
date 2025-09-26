import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    name: '',
    email: '',
    roles: [],
    token: '',
    exp: null
}

const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: () => initialState
    }
});

export const { login, logout } = loggedInUserSlice.actions

const loggedInUserReducer = loggedInUserSlice.reducer;

export default loggedInUserReducer;