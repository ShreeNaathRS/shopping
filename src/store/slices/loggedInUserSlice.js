import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    name: '',
    email: '',
    roles: [],
    token: ''
}

const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        login: (state, action) => {
            const { userId, name, email, roles, token } = action.payload
            return {
                ...state,
                userId,
                name,
                email,
                roles,
                token
            }
        },
        logout: () => initialState
    }
});

export const { login, logout } = loggedInUserSlice.actions

const loggedInUserReducer = loggedInUserSlice.reducer;

export default loggedInUserReducer;