import React, { useEffect } from "react";
import "../Partners_page/style/Header.css";
import { useCart } from "../../context/CartContextProvider";
import pluss from "../Partners_page/img/header_img/plus-new.svg";
import minus from "../Partners_page/img/header_img/minus.svg";
import { Link } from "react-router-dom";

export default function CartFull() {
  const {
    getCart,
    cart,
    changeProductCount,
    deleteCartProduct,
    calcTotalPrice,
  } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const cartCleaner = () => {
    localStorage.removeItem("cart");
    getCart();
  };

  const handleDecrease = (item) => {
    if (item.count > 1) {
      const updatedCount = item.count - 1;
      const updatedSubPrice = updatedCount * item.item.price;
      changeProductCount(updatedCount, item.item.id, updatedSubPrice);
    } else {
      deleteCartProduct(item.item.id);
    }
  };

  const handleIncrease = (item) => {
    const updatedCount = item.count + 1;
    const updatedSubPrice = updatedCount * item.item.price;

    changeProductCount(updatedCount, item.item.id, updatedSubPrice);
  };
  const getTotalProductCount = (products) => {
    let totalCount = 0;
    products.forEach((item) => {
      totalCount += item.count;
    });
    return totalCount;
  };

  return (
    <div className="cart-section_full">
      <div className="cart-header">
        <h2>Ваш заказ</h2>
      </div>
      <div className="box-fullcart">
        {cart.products.map((item) => (
          <div key={item.item.id}>
            <div className="cart-textbox">
              <p>{item.count}X</p>
              <p>{item.item.name}</p>
              <span>{item.item.price}</span>
            </div>
            <div className="btn_cart">
              <button onClick={() => handleDecrease(item)}>
                <img src={minus} alt="" />
              </button>
              <button onClick={() => handleIncrease(item)}>
                <img src={pluss} alt="" />
              </button>
            </div>
          </div>
        ))}
        <Link to={"/form"}>
          <button className="buybtn">
            Заказать продукты ({getTotalProductCount(cart.products)}) за&nbsp;
            {calcTotalPrice(cart.products)} KGS
          </button>
        </Link>
      </div>
    </div>
  );
}
