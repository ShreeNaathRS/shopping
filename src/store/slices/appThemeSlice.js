import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const appThemeSlice = createSlice({
    name: 'appDarkTheme',
    initialState,
    reducers: {
        switchTheme: state => !state
    }
});

export const { switchTheme } = appThemeSlice.actions

const darkModeReducer = appThemeSlice.reducer;

export default darkModeReducer;