import './main.css'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Alert from "../common/Alert";
import CenteredIndicator from '../common/CenteredIndicator';

const Main = ({setSearchText}) => {
  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <>
      <Alert />
      <div className={`app apply-theme ${appDarkTheme? 'dark': 'light'}`}>
        <Header setSearchText={setSearchText} />
        <main className='main'>
          <Suspense fallback={<CenteredIndicator loader={true} />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default Main
