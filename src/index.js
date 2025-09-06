import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import swDev from './sw-dev';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' Component={App} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// swDev()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();