import "./EditCard.css";
import kfc from "../../assets/kfc.png";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContextProvider";

const EditCard = () => {
  const { saveEditedProduct, getProductDetails, productDetails } =
    useProducts();
  console.log(productDetails);

  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  useEffect(() => {
    setProduct(productDetails);
  }, [productDetails]);

  const [product, setProduct] = useState(productDetails);

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
      <div className="glav_div1">
        <div className="logo">
          <img src={kfc} alt="" />
        </div>
        <h2 className="edit_h5" variant="h4">
          Изменения продукта
        </h2>
        <input
          className="edit_kar1"
          sx={{ marginBottom: "10px" }}
          fullWidth
          id="outlined-basic"
          label="Картинка продукта"
          variant="outlined"
          size="small"
          name="image"
          onChange={handleInp}
          value={product.image || ""}
        />
        <input
          className="edit_nazvanie1"
          sx={{ marginBottom: "10px" }}
          fullWidth
          id="outlined-basic"
          label="Название"
          variant="outlined"
          size="small"
          name="name"
          onChange={handleInp}
          value={product.name || ""}
        />

        <input
          className="edit_sena1"
          sx={{ marginBottom: "10px" }}
          fullWidth
          id="outlined-basic"
          label="Цена"
          variant="outlined"
          size="small"
          name="price"
          onChange={handleInp}
          value={product.price || ""}
        />
        <input
          className="edit_opi1"
          sx={{ marginBottom: "10px" }}
          fullWidth
          id="outlined-basic"
          label="Описание"
          variant="outlined"
          size="small"
          name="description"
          onChange={handleInp}
          value={product.description || ""}
        />

        <button
          className="edit_btn1"
          onClick={() => saveEditedProduct(product)}
          fullWidth
          variant="outlined"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCard;
