import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/Product/AddProduct";
import PartnersMain from "./components/Partners_page/PartnersMain";
import EditCardPage from "./components/Product/EditCardPage";
import CardForm from "./components/Product/CardForm";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/products" element={<PartnersMain />} />
        <Route path="/" element={<PartnersMain />} />
        <Route path="/edit/:id" element={<EditCardPage />} />
        <Route path="/form" element={<CardForm />} />
      </Routes>
    </>
  );
};

export default App;
