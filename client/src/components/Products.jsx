import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import Chip from "@mui/material/Chip";
import "../components/css/Products.css";

const Container = styled.div`
  padding: ${(props) =>
    props.origem === "explorarProdutos" ? "20px 2.5%" : "20px 10%"};
  margin: ${(props) => (props.origem === "explorarProdutos" ? "0px .2%" : "")};

  display: flex;
  /* box-sizing: border-box; */
  flex-wrap: wrap;
  width: 80%;
  max-width: 100vw;
  background: var(--color-background);
  justify-content: space-between;
`;
const ContainerFiltros = styled.div`
  /* ... */
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;

  overflow-x: auto;
`;
const ContainerProdutos = styled.div`
  /* ... */
  display: flex;
  flex-wrap: wrap;
  justify-content: fle;
  gap: 0.5rem;
`;

const Products = ({
  variante,
  cat,
  filters,
  sort,
  origem,
  getMaxPrice,
  indexCarousel,
}) => {
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [arrayTagsSelecionadas, setArrayTagsSelecionadas] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosOriginais, setProdutosOriginais] = useState([]);
  const [produtosAntesFiltragem, setProdutosAntesFiltragem] = useState([]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFiltrarCategoria = (categoriaEscolhida) => {
    if (categoriaEscolhida === "tudo") {
      setProdutosFiltrados([]);
      setArrayTagsSelecionadas([]);
      setArrayTagsSelecionadas((prevState) => ({
        ...prevState,
        tudo: "tudo",
      }));

      // const highestPrice = products.reduce((maxPrice, product) => {
      //   return product.price > maxPrice ? product.price : maxPrice;
      // }, 0);
      // getMaxPrice(highestPrice);
      return;
    } else {
      delete arrayTagsSelecionadas["tudo"];
    }
    if (arrayTagsSelecionadas !== undefined) {
      if (arrayTagsSelecionadas[categoriaEscolhida]) {
        delete arrayTagsSelecionadas[categoriaEscolhida];
        /* contagem de contatos selecioandos */
        // countTagsSelecionadas = countTagsSelecionadas - 1;
      } else {
        arrayTagsSelecionadas[categoriaEscolhida] = categoriaEscolhida;
        /* contagem de contatos selecioandos */
        // countTagsSelecionadas = countTagsSelecionadas + 1;
      }
    } else {
      arrayTagsSelecionadas[0] = categoriaEscolhida;
      /* contagem de contatos selecioandos */
      // countTagsSelecionadas = countTagsSelecionadas + 1;
    }
    setFilteredProducts(
      products.filter(
        (item) =>
          !!item.categories &&
          item.categories.includes(arrayTagsSelecionadas[categoriaEscolhida])
      )
    );
    /*     var highestPrice = filteredProducts.reduce((maxPrice, product) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0);
    getMaxPrice(highestPrice);
    console.log(
      "🚀 ~ file: Products.jsx:151 ~ getProducts ~ highestPrice:",
      highestPrice
    ); */

    var arrayCategoriasSelecionadas = [];
    // console.log('🍔', categorias);
    // console.log('🍔', this.allContactsDepartamentoAtual);

    const keysCategorias = Object.keys(arrayTagsSelecionadas);
    for (let indexCategorias of keysCategorias) {
      arrayCategoriasSelecionadas.push(arrayTagsSelecionadas[indexCategorias]);
    }

    setProdutosFiltrados(
      products.filter((produto) => {
        return produto.categories.some((searchString) =>
          arrayCategoriasSelecionadas.includes(searchString)
        );
      })
    );
    // var highestPrice = produtosFiltrados.reduce((maxPrice, product) => {
    //   return product.price > maxPrice ? product.price : maxPrice;
    // }, 0);
    // getMaxPrice(highestPrice);

    if (arrayCategoriasSelecionadas.length === 0)
      setArrayTagsSelecionadas((prevState) => ({
        ...prevState,
        tudo: "tudo",
      }));
  };
  useEffect(() => {
    setArrayTagsSelecionadas((prevState) => ({
      ...prevState,
      tudo: "tudo",
    }));
    const allCategories = products.flatMap((product) => product.categories);
    const uniqueCategories = [...new Set(allCategories)];
    setDistinctCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:2424/api/products?category=${cat}`
            : "http://localhost:2424/api/products"
        );
        const highestPrice = res.data.reduce((maxPrice, product) => {
          return product.price > maxPrice ? product.price : maxPrice;
        }, 0);
        setProducts(res.data);
        getMaxPrice(highestPrice);
        setProdutosOriginais(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  /* -------------------------------------------------------------------------- */
  /*                              Filtrar por variações de [cor,tamanho]                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!filters || filters.variacoes === undefined) return;
    cat &&
      !!filters &&
      filters.variacoes !== undefined &&
      setProdutosFiltrados(
        produtosOriginais.filter((item) =>
          Object.entries(filters).every(([key, value], i) => {
            if (key === "price" || key === "flagPrice") return products;
            // key = variacoes
            //Here the value is an array 'variacoes' so to check colors use filter to get all the elements of 'variacoes' array;
            //Also assuming that the color you are passing will be available here as item[key]
            /* if (filters.marcas) {
              return item[key].includes(value);
            } else */

            if (filters?.variacoes[0]?.size && filters?.variacoes[0]?.color) {
              var allSizes = item[key].map((i) => i.size);
              var allColors = item[key].map((i) => i.color);
              var allTeste = Object.entries(item[key].map((i) => i));
              var allTesteValue = Object.entries(value[0]);
              const entries = Object.entries(item[key]);

              const matches = item[key].some((current) =>
                value.some((combination) =>
                  Object.entries(combination).every(
                    ([keyCombination, valueCombination]) =>
                      current[keyCombination] === valueCombination
                  )
                )
              );

              return matches;
            } else if (filters?.variacoes[0]?.color) {
              var allColors = item[key].map((i) => i.color);

              return value.some((val) => allColors.includes(val.color));
            } else if (filters?.variacoes[0]?.size) {
              var allSizes = item[key].map((i) => i.size);

              return value.some((val) => allSizes.includes(val.size));
            } else {
              return item[key].includes(value);
            }
          })
        )
      );
    setProdutosAntesFiltragem(produtosFiltrados);
    if (!filters.flagPrice) {
      const highestPrice = produtosFiltrados.reduce((maxPrice, product) => {
        return product.price > maxPrice ? product.price : maxPrice;
      }, 0);
      getMaxPrice(highestPrice);
    }
  }, [products, cat, filters]);
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                              Filtrar por mais recente                             */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                              Filtrar por preço                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    /* console.log("al", !!filters, !!filters.price); */
    // console.log("al", filters, filters.price);
    // if (!!filters && !!filters.price) {
    //   console.log(produtosFiltrados);
    //   console.log(products);
    //   console.log(produtosOriginais);
    //   console.log(filteredProducts);
    //   if (produtosFiltrados.length > 0) {
    //     console.log("produtosFiltrados");
    //     setProdutosFiltrados((prev) =>
    //       produtosFiltrados.filter((a) => {
    //         console.log(a.price);
    //         return a.price >= filters.price[0] && a.price <= filters.price[1];
    //       })
    //     );
    //     return;
    //   } else if (filteredProducts.length > 0) {
    //     console.log("filteredProducts");
    //     setFilteredProducts((prev) =>
    //       filteredProducts.filter((a) => {
    //         console.log(a.price);
    //         return a.price >= filters.price[0] && a.price <= filters.price[1];
    //       })
    //     );
    //     return;
    //   } else if (products.length > 0) {
    //     console.log("products");
    //     setProducts((prev) =>
    //       produtosOriginais.filter((a) => {
    //         console.log(a.price);
    //         return a.price >= filters.price[0] && a.price <= filters.price[1];
    //       })
    //     );
    //     return;
    //   }
    //   console.log(produtosFiltrados);
    //   console.log(products);
    //   /*  const highestPrice = filteredProducts.reduce((maxPrice, product) => {
    //     return product.price > maxPrice ? product.price : maxPrice;
    //   }, 0);
    //   getMaxPrice(highestPrice); */
    // }
  }, [filters]);
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <Container origem={origem}>
      {origem !== "CarouselHomePageNovidades" &&
        origem !== "explorarProdutos" && (
          <ContainerFiltros>
            <Chip
              className="chipsFiltro"
              label={"tudo"}
              style={{
                background: !arrayTagsSelecionadas["tudo"]
                  ? "var(--color-background)"
                  : "var(--color-text)",
                color: !arrayTagsSelecionadas["tudo"]
                  ? "var(--color-text)"
                  : "var(--color-background)",
              }}
              variant={!arrayTagsSelecionadas["tudo"] ? "outlined" : "filled"}
              onClick={() => handleFiltrarCategoria("tudo")}
            />
            {distinctCategories.map((item) => {
              return (
                <Chip
                  className="chipsFiltro"
                  label={item}
                  style={{
                    backgroundColor: !arrayTagsSelecionadas[item]
                      ? "var(--color-background)"
                      : "var(--color-text)",
                    color: !arrayTagsSelecionadas[item]
                      ? "var(--color-text)"
                      : "var(--color-background)",
                  }}
                  variant={!arrayTagsSelecionadas[item] ? "outlined" : "filled"}
                  onClick={() => handleFiltrarCategoria(item)}
                />
              );
            })}
          </ContainerFiltros>
        )}
      <ContainerProdutos>
        {produtosFiltrados.length > 0
          ? produtosFiltrados.map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/*  <b>produtosFiltrados</b> */}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : cat && !!filters && filters.variacoes !== undefined
          ? filteredProducts.map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/*  <b>filteredProducts</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 0 && variante.variante === "singleRow"
          ? products.slice(0, 4).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 1 && variante.variante === "singleRow"
          ? products.slice(4, 8).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 2 && variante.variante === "singleRow"
          ? products.slice(8, 12).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 0 && variante.variante === ""
          ? products.slice(0, 8).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 1 && variante.variante === ""
          ? products.slice(8, 16).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : indexCarousel === 2 && variante === ""
          ? products.slice(16, 32).map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )
          : products.map(
              (item) =>
                item.price >= filters?.price[0] &&
                item.price <= filters?.price[1] && (
                  <>
                    {/* <b>products</b> */}{" "}
                    <Product item={item} key={item.id} />
                  </>
                )
            )}
      </ContainerProdutos>
    </Container>
  );
};

export default Products;
