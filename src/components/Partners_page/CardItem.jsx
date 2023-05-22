import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContextProvider";
import { useProducts } from "../../context/ProductContextProvider";
import plus from "./img/header_img/plus-new.svg";
import "./style/Header.css";
import { useAuth } from "../../context/AuthContextProvider";
import { ADMIN } from "../../helpers/const";
import favoriteOutline from "./img/header_img/heart.png";
import favoriteFill from "./img/header_img/favorite.png";
import { useFavorite } from "../../context/FavoriteContextProvider";

const CardItem = ({ item }) => {
  const { deleteProduct } = useProducts();
  const { addProductToCart } = useCart();

  // const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const { removeFromFavorites, addToFavorites, favorites } = useFavorite();

  const {
    user: { email },
  } = useAuth();

  return (
    <div className="main_wrapper">
      <div className="card_box">
        <img src={item.image} alt="" />
        <div className="text_title">
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      </div>
      {email === ADMIN ? (
        <div className="price">
          <span>{item.price},00 KGS</span>
          <button onClick={() => deleteProduct(item.id)}>delete</button>
          <button onClick={() => navigate(`/edit/${item.id}`)}>edit</button>
          <button onClick={() => addProductToCart(item)}>
            <img src={plus} alt="" />
          </button>
        </div>
      ) : (
        <div className="price">
          <span>{item.price},00 KGS</span>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button onClick={() => addProductToCart(item)}>
              <img src={plus} alt="" />
            </button>
            {favorites.includes(item) ? (
              <button onClick={() => removeFromFavorites(item)}>
                <img src={favoriteFill} alt="" />
              </button>
            ) : (
              <button onClick={() => addToFavorites(item)}>
                <img src={favoriteOutline} alt="" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
