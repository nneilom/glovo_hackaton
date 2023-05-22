import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ProductContextProvider from "./context/ProductContextProvider";
import CartContextProvider from "./context/CartContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import FavoriteContextProvider from "./context/FavoriteContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <FavoriteContextProvider>
  <ProductContextProvider>
    <AuthContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
    </AuthContextProvider>
  </ProductContextProvider>


  </FavoriteContextProvider>
  

  </BrowserRouter>
);
