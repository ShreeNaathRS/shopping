import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Main from './components/containers/Main';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthAxiosWithProps } from './hooks/useAuthAxiosWithProps';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthGuard from "./components/common/AuthGuard";
import { lazyWithSuspense } from "./components/common/lazyWithSuspense"

function App() {

  const [searchText, setSearchText] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const { doAPICall: getProducts } = useAuthAxiosWithProps({ setLoader: setProductsLoading })
  const { userId } = useSelector(state=>state.loggedInUser)

  useEffect(() => {
    getProducts('GET', '/products').then(response => setProducts(response));
  }, [getProducts]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/shop',
          ...lazyWithSuspense(() => import('./components/main/shop/Shop'), {
            products,
            productsLoading,
            searchText,
            setSearchText,
          }),
        },
        {
          path: '/cart',
          ...lazyWithSuspense(() => import('./components/main/cart/Cart')),
        },
        {
          path: '/orders',
          ...lazyWithSuspense(() => import('./components/containers/Orders'), {
            userId,
            wrapper: AuthGuard,
          }),
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router}/>;
}

export default App;
