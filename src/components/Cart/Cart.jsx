import React from "react";
import "../Partners_page/style/Header.css";
import astronaut from "../Partners_page/img/header_img/astronaut-grey-scale.svg";

const Cart = () => {
  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>Ваш заказ</h2>
      </div>
      <div className="astronaut">
        {" "}
        <img src={astronaut} alt="" />
      </div>
      <div className="box_box">
        <div className="text_box">
          <div className="text">
            Пока что корзина пуста. Добавленные вами продукты будут отображаться
            здесь!
          </div>
        </div>
        <div className="line"></div>
        <span>
          Закажите на &nbsp;
          <b>400,00 &nbsp;KGS</b>, &nbsp;чтобы сэкономить <b>40,00 KGS</b> на
          сборах!
        </span>
      </div>
    </div>
  );
};

export default Cart;
