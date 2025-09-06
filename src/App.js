import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Footer from './components/containers/Footer';
import Header from './components/containers/Header';
import Main from './components/containers/Main';
import { useEffect, useRef, useState } from 'react';
import productAxios from './service'
import { useSelector } from 'react-redux';
import HeaderLoginModal from './components/header/HeaderLoginModal';

function App() {

  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const hasFetched = useRef(false)
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', setViewportHeight);

  useEffect(()=>{
    if(hasFetched.current){
      return
    }
    setViewportHeight();
    hasFetched.current = true
    const fetchProducts = async () => {
      try{
        const response = (await productAxios.get("/products"));
        setProducts(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchProducts()
  }, [])

  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <div className={`app apply-theme ${appDarkTheme? 'dark': 'light'}`}>
      <Header setSearchText={setSearchText} />
      <Main products={products} searchText={searchText} setSearchText={setSearchText}/>
      <Footer/>
    </div>
  );
}

export default App;
