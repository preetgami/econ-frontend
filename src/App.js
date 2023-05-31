import './App.css';
import Mainnavigation from './navigation/Mainnavigation';
import React, { useCallback, useState, Suspense } from 'react';

//import Allproducts from './pages/Allproducts';
//import Basket from './pages/Basket';
//import Checkout from "./pages/Checkout"
//import About from "./pages/About"
//import Authenticate from './user/pages/Auth';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Authcontex } from './shared/context/auth-context';
import useAuth from './shared/context/auth-hook';
import Footer from './pages/Footer';
import Checkoutsuccess from './payments/Checkout-success';

let BASKET = []

const Allproducts = React.lazy(() => import('./pages/Allproducts'))

const Basket = React.lazy(() => import('./pages/Basket'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const About = React.lazy(() => import('./pages/About'))
const Authenticate = React.lazy(() => import('./user/pages/Auth'))


function App() {
  const { token, login, logout, userId } = useAuth()





  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Allproducts />} />

        <Route path="/:userId/basket" element={<Basket />} />



        <Route path="/about" element={<About />} />
        <Route path='/checkout-success' element={<Checkoutsuccess />} />

        <Route path="/:userId/checkout" element={<Checkout />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes >
    )
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Allproducts />} />
        <Route path='/checkout-success' element={<Checkoutsuccess />} />

        <Route path="/about" element={<About />} />

        <Route path="/auth" element={<Authenticate />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>)
  }
  return (
    <Authcontex.Provider value={{ isLoggedIn: !!token, token: token, login: login, logout: logout, userId: userId }}>
      <Router  >
        {/* switch enables one route only to be used */}
        <Mainnavigation />
        <main >
          {!token && <div className='disp5'>👆  log in from  here</div>}
          <Suspense fallback={<div className='disp'>we need a moment to load!</div>}>
            {routes}
          </Suspense>
        </main>

      </Router>
    </Authcontex.Provider>
  );
}

export default App;
