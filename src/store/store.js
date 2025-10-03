import { configureStore } from '@reduxjs/toolkit';

import productCartReducer from './slices/productCartSlice';
import darkModeReducer from './slices/appThemeSlice';
import loggedInUserReducer from './slices/loggedInUserSlice';
import alertReducer from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    cart: productCartReducer,
    appDarkTheme: darkModeReducer,
    loggedInUser: loggedInUserReducer,
    alert: alertReducer,
  },
});
