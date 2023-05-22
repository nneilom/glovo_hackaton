import React, { useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import "./AddProduct.css";
import kfc from "../../assets/kfc.png";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  const handleInp = (e) => {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  };
  return (
    <div>
      <div className="glav_div">
        <div className="logo">
          <img src={kfc} alt="" />
        </div>
        <div>
          <h2 className="edit_h4" variant="h4">
            Изменения продукта
          </h2>
        </div>
        <div>
          <input
            className="edit_kar"
            sx={{ marginBottom: "10px" }}
            fullWidth
            id="outlined-basic"
            placeholder="Картинка продукта"
            variant="outlined"
            size="small"
            name="picture"
            onChange={handleInp}
          />
        </div>
        <div>
          <input
            className="edit_nazvanie"
            sx={{ marginBottom: "10px" }}
            fullWidth
            id="outlined-basic"
            placeholder="Название"
            variant="outlined"
            size="small"
            name="name"
            onChange={handleInp}
          />
        </div>
        <div>
          <input
            className="edit_sena"
            sx={{ marginBottom: "10px" }}
            fullWidth
            id="outlined-basic"
            placeholder="Цена"
            variant="outlined"
            size="small"
            name="price"
            onChange={handleInp}
          />
        </div>
        <div>
          <input
            className="edit_opi"
            sx={{ marginBottom: "10px" }}
            fullWidth
            id="outlined-basic"
            placeholder="Описание"
            variant="outlined"
            size="small"
            name="description"
            onChange={handleInp}
          />
        </div>
        <div>
          <button
            className="edit_btn"
            onClick={() => addProduct(product)}
            fullWidth
            variant="outlined"
          >
            Добавить новый продукт
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
