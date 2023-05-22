import "./style/Header.css";
import searchh from "./img/header_img/icons8-search.svg";
import CardItem from "./CardItem";
import "./style/Header.css";
import square from "./img/header_img/sections-square.svg";
import { useProducts } from "../../context/ProductContextProvider";
import { useEffect, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { ADMIN } from "../../helpers/const";
import { useAuth } from "../../context/AuthContextProvider";

const StoreSection = () => {
  const { getProducts, state } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  // !filter

  const [filterValue, setFilterValue] = useState("");
  const products = state.products;
  const categories = [
    "Баскет",
    "Курица",
    "Сэндвич",
    "Гарнир",
    "Напитки",
    "Агрессивные СОУСЫ, ДОПОЛНИТЕЛЬНЫЕ ПРОДУКТЫ",
  ]; // Ручное добавление категорий
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = filterValue
    ? products.filter((product) => product.category === filterValue)
    : products;

  // !

  //!pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const count = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleChange = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredProducts.slice(begin, end);
  }
  // search
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    getProducts();
    setSearchParams({
      q: search,
    });
  }, [search]);

  const {
    user: { email },
  } = useAuth();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", search);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="store__page">
        <div className="square">
          <img src={square} alt="" />
          <p>Разделы</p>
        </div>
        <div className="filter">
          <ul>
            <li>
              <button onClick={() => handleFilterChange("")}>Все</button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button onClick={() => handleFilterChange(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="store-section">
        <div className="search-input">
          <div className="search">
            <form onSubmit={handleSearchSubmit} style={{ display: "flex" }}>
              <button type="submit" className="search-input__button">
                <img src={searchh} alt="" />
              </button>
              <input
                type="text"
                placeholder="Искать в KFC"
                className="search-input__field"
                onChange={(e) => handleSearchChange(e)}
                value={search}
              />
            </form>
          </div>
        </div>
        {email === ADMIN ? (
          <Grid item md={9}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                my: "2rem",
                justifyContent: "space-evenly",
              }}
            >
              {currentData().length > 0 ? (
                currentData().map((product) => (
                  <CardItem key={product.id} item={product} />
                ))
              ) : (
                <p>No products available</p>
              )}
            </Box>
            <Pagination
              count={count}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
            />
          </Grid>
        ) : (
          <div className="card_wrapper">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardItem key={product.id} item={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StoreSection;
