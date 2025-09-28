import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    type: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        alert: (state, action) => { return { ...state, ...action.payload } },
        reset: () => initialState
    }
});

export const { alert, reset } = alertSlice.actions

const alertReducer = alertSlice.reducer;

export default alertReducer;