import React, { useState } from "react";
import "./style/Header.css";
import arrow from "./img/header_img/white-arrow-png-41944.png";
import scooter from "./img/header_img/scooter-1050.svg";
import { Link } from "react-router-dom";
import "../Register/Register.css";
import { useAuth } from "../../context/AuthContextProvider";
import profile from "./img/header_img/2867892_emotion_sad_icon.svg";
import Modal from "react-modal";
import menu from "./img/header_img/2867922_menu_icon.svg";
import { useFavorite } from "../../context/FavoriteContextProvider";
import CardItem from "./CardItem";
import { ADMIN } from "../../helpers/const";
Modal.setAppElement("#root");

const HeaderLogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMenu, setIsModalOpenMenu] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalMenu = () => {
    setIsModalOpenMenu(true);
  };

  const closeModalMenu = () => {
    setIsModalOpenMenu(false);
  };

  const {
    user,
    handleLogout,
    user: { email },
  } = useAuth();
  const { favorites } = useFavorite();

  // для модалки
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const displayedFavorites = favorites.filter((item) =>
    savedFavorites.some((savedItem) => savedItem !== item)
  );

  return (
    <div>
      <div className="logo_box">
        <Link to={"/"}>
          <img
            src="https://res.cloudinary.com/glovoapp/image/fetch/f_svg,q_auto:low/https://glovoapp.com/images/glovo-white.svg"
            alt=""
            className="logoGlovo"
          />
        </Link>
        <div className="profile_header">
          <div className="adress">
            <p>Добавьте свой адрес</p>
            <img src={arrow} alt="" className="img_arrow" />
          </div>
          <button className="profile" onClick={openModal}>
            <img src={profile} alt="" />
          </button>
          <button className="menu" onClick={openModalMenu}>
            <img src={menu} alt="" />
          </button>
        </div>
      </div>
      <div className="banner">
        <img
          src="https://res.cloudinary.com/glovoapp/q_30,h_225,f_auto/e_blur:400/Stores/g0tffeh47dogqnmree1m"
          alt=""
          className="kfcBanner"
          style={{ height: "340px" }}
        />
      </div>
      <div className="second-part-of-header">
        <div className="store-info" style={{ top: "70px" }}>
          <h1>KFC</h1>
          <div className="info">
            <div className="scooter_section">
              <img src={scooter} alt="" />
              <p>80,00 KGS</p>
            </div>
            <div className="rate_section">
              <img
                src="https://res.cloudinary.com/glovoapp/f_auto,q_auto:low/store_ratings/rating_good.png"
                alt=""
              />
              <span>95%</span>
              <span>Хорошо</span>
            </div>
            {email === ADMIN ? (
              <Link to={"/addproducts"}>
                <button>Добавить новый продукт</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="custom-overlay"
        className="custom-modal"
      >
        <div className="triangle"></div>
        <div className="login_box">
          <p>Привет {user.email} !</p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      </Modal>
      {/* <Modal
        isOpen={isModalOpenMenu}
        onRequestClose={closeModalMenu}
        overlayClassName="custom-overlay"
        className="custom-modal"
      >
        <div className="menu_box">
          <div className="triagle_menu"> </div>
          <p>ывыйди плитз</p>
          {favorites.map((item) => (
            <p>{item.name}</p>
          ))}
        </div>
      </Modal> */}
      <Modal
        isOpen={isModalOpenMenu}
        onRequestClose={closeModalMenu}
        overlayClassName="custom-overlay"
        className="custom-modal"
      >
        <div className="menu_box">
          <div className="triagle_menu"> </div>
          <p>Работай плиз</p>
          {displayedFavorites.map(
            (item, index) => item && <CardItem key={index} item={item} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HeaderLogIn;
