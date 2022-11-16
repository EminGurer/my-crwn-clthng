import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ProductsProvider } from './contexts/products.context';
import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
