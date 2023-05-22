import React, { createContext, useContext, useReducer } from "react";
import {
  calcSubPrice,
  calcTotalPrice,
} from "../helpers/function";
import { CART } from "../helpers/const";

export const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const INIT_STATE = {
  cart: {
    products: [],
    totalPrice: 0,
  },
  cartLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART:
      return { ...state, cart: action.payload };

    case CART.GET_CART_LENGTH:
      return { ...state, cartLength: action.payload };

    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let productToFind = cart.products.find((elem) => elem.item.id === product.id);

    if (!productToFind) {
      let newProduct = {
        item: product,
        count: 1,
        subPrice: calcSubPrice({ item: product, count: 1 }),
      };
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.map((elem) => {
        if (elem.item.id === product.id) {
          return {
            ...elem,
            count: elem.count + 1,
            subPrice: calcSubPrice({ item: product, count: elem.count + 1 }),
          };
        }
        return elem;
      });
    }

    cart.totalPrice = calcTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({ type: CART.GET_CART, payload: cart });
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      let newCart = cart.products.filter((elem) => elem.item.id === id);
      return newCart.length > 0;
    }

    return false;
  };

  const changeProductCount = (count, id, subPrice) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.products = cart.products.map((product) => {
      if (product.item.id === id) {
        product.count = count;
        product.subPrice = subPrice;
      }
      return product;
    });

    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const deleteCartProduct = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.filter((elem) => elem.item.id !== id);

    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const values = {
    addProductToCart,

    getCart,
    checkProductInCart,
    changeProductCount,
    deleteCartProduct,
    calcTotalPrice,
    cart: state.cart,
    cartLength: state.cartLength,
  };

  return (
    <cartContext.Provider value={values}>{children}</cartContext.Provider>
  );
};

export default CartContextProvider;
