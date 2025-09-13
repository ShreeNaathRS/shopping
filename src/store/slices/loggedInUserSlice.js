import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    name: '',
    roles: [],
    token: ''
}

const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        login: (state, action) => {
            const { userId, name, roles, token } = action.payload
            return {
                ...state,
                userId,
                name,
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