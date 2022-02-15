//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Styles
import './index.css';
//App
import App from './App';
//Routes
import Home from './Routes/Home';
import Create from './Routes/Create';
import DressRoom from './Routes/DressRoom';
import ProductDetails from './Routes/ProductDetails';
import NotFound from './Routes/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App nest the underlying element, meaning app is always showing on each page. 
        Child element is switched in the 'Outled' tag in app.js */}
        <Route path="/" element={<App />}>
          {/* Children to app */}
          <Route path="/" element={<Home />} />
          <Route path="female" element={<DressRoom />} />
          <Route path="male" element={<DressRoom />} />
          <Route path="create" element={<Create />} />
          <Route path="product/:id" element={<ProductDetails />} />
          {/* The "*" has special meaning here. It will match only when no other routes do. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
