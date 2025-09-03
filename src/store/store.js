import productCartReducer from "./slices/productCartSlice";
import darkModeReducer from "./slices/appThemeSlice";
import loggedInUserReducer from "./slices/loggedInUserSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        productCartCounter: productCartReducer,
        appDarkTheme: darkModeReducer,
        loggedInUser: loggedInUserReducer
    }
})