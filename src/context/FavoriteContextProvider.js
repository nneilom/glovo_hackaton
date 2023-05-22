import React, { createContext, useContext, useEffect, useState } from 'react'

export const favoritetContext = createContext();
export const useFavorite = () => useContext(favoritetContext);

const FavoriteContextProvider = ({children}) => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);


  const addToFavorites = (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (item) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== item);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const values = {
    removeFromFavorites, addToFavorites,favorites,setFavorites
  }

  return (
    <favoritetContext.Provider  value= {values}>{children}</favoritetContext.Provider>
  )
}

export default FavoriteContextProvider