import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import Chip from "@mui/material/Chip";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ContainerFiltros = styled.div`
  /* ... */
  width: 100%;
  display: flex;
  overflow-x: auto;
`;

const Products = ({ cat, filters, sort }) => {
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFiltrarCategoria = (categoriaEscolhida) => {
    console.log(categoriaEscolhida);
  };
  useEffect(() => {
    console.log(products);
    const allCategories = products.flatMap((product) => product.categories);
    const uniqueCategories = [...new Set(allCategories)];
    setDistinctCategories(uniqueCategories);
    console.log(distinctCategories, products, allCategories, uniqueCategories);
  }, [products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:2323/api/products?category=${cat}`
            : "http://localhost:2323/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <ContainerFiltros>
        {distinctCategories.map((item) => {
          return (
            <Chip
              label={item}
              variant="outlined"
              onClick={() => handleFiltrarCategoria()}
            />
          );
        })}
      </ContainerFiltros>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
