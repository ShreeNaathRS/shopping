import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    roles: [],
    token: ''
}

const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        login: (state, action) => {
            const { name, roles, token } = action.payload
            return {
                ...state,
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