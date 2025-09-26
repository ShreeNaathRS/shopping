import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Footer from './components/containers/Footer';
import Header from './components/containers/Header';
import Main from './components/containers/Main';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthAxiosWithProps } from './hooks/useAuthAxiosWithProps';

function App() {

  const [searchText, setSearchText] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const onGetProdcutsSuccess = useCallback(response => setProducts(response), [setProducts])
  const { doAPICall: getProducts } = useAuthAxiosWithProps({ onSuccess: onGetProdcutsSuccess, setLoader: setProductsLoading })

  useEffect(() => {
    getProducts('GET', '/products');
  }, [getProducts]);

  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <div className={`app apply-theme ${appDarkTheme? 'dark': 'light'}`}>
      <Header setSearchText={setSearchText} />
      <Main products={products} productsLoading={productsLoading} searchText={searchText} setSearchText={setSearchText}/>
      <Footer/>
    </div>
  );
}

export default App;
