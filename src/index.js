import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Footer from './pages/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div classname="main-stuff">
      <App />
      <footer className='footer-stuff'><Footer /></footer>
    </div>
  </React.StrictMode>
);
