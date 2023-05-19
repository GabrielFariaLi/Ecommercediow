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

const Products = ({ cat, filters, sort, origem, getMaxPrice }) => {
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [arrayTagsSelecionadas, setArrayTagsSelecionadas] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosOriginais, setProdutosOriginais] = useState([]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFiltrarCategoria = (categoriaEscolhida) => {
    console.log(
      "🚀 ~ file: Products.jsx:32 ~ handleFiltrarCategoria ~ categoriaEscolhida:",
      categoriaEscolhida
    );
    if (categoriaEscolhida === "tudo") {
      setProdutosFiltrados([]);
      setArrayTagsSelecionadas([]);
      setArrayTagsSelecionadas((prevState) => ({
        ...prevState,
        tudo: "tudo",
      }));
      console.log(
        "🚀 ~ file: Products.jsx:35 ~ handleFiltrarCategoria ~ arrayTagsSelecionadas:",
        arrayTagsSelecionadas
      );
      const highestPrice = products.reduce((maxPrice, product) => {
        return product.price > maxPrice ? product.price : maxPrice;
      }, 0);
      getMaxPrice(highestPrice);
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
    console.log(categoriaEscolhida);
    console.log(products);
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
    console.log(
      "🚀 ~ file: Products.jsx:57 ~ produtosFiltrados=products.filter ~ arrayTagsSelecionadas:",
      arrayTagsSelecionadas
    );
    var arrayCategoriasSelecionadas = [];
    // console.log('🍔', categorias);
    // console.log('🍔', this.allContactsDepartamentoAtual);

    const keysCategorias = Object.keys(arrayTagsSelecionadas);
    for (let indexCategorias of keysCategorias) {
      arrayCategoriasSelecionadas.push(arrayTagsSelecionadas[indexCategorias]);
    }

    console.log(
      "🚀 ~ file: Products.jsx:72 ~ produtosFiltrados=products.filter ~ arrayCategoriasSelecionadas:",
      arrayCategoriasSelecionadas
    );
    setProdutosFiltrados(
      products.filter((produto) => {
        return produto.categories.some((searchString) =>
          arrayCategoriasSelecionadas.includes(searchString)
        );
      })
    );
    var highestPrice = produtosFiltrados.reduce((maxPrice, product) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0);
    getMaxPrice(highestPrice);
    console.log(produtosFiltrados);
    console.log(filteredProducts);

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
            ? `http://localhost:2424/api/products?category=${cat}`
            : "http://localhost:2424/api/products"
        );
        const highestPrice = res.data.reduce((maxPrice, product) => {
          return product.price > maxPrice ? product.price : maxPrice;
        }, 0);
        setProducts(res.data);
        getMaxPrice(highestPrice);
        setProdutosOriginais(res.data);
        console.log(
          "🚀 ~ file: Products.jsx:151 ~ getProducts ~ highestPrice:",
          highestPrice
        );
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  /* -------------------------------------------------------------------------- */
  /*                              Filtrar por variações de [cor,tamanho]                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    console.log(filters);
    console.log(products);
    if (filters === {} || filters.variacoes === undefined) return;
    cat &&
      filters !== {} &&
      filters.variacoes !== undefined &&
      setProdutosFiltrados(
        products.filter((item) =>
          Object.entries(filters).every(([key, value], i) => {
            if (key === "price") return products;
            // key = variacoes
            //Here the value is an array 'variacoes' so to check colors use filter to get all the elements of 'variacoes' array;
            //Also assuming that the color you are passing will be available here as item[key]
            /* if (filters.marcas) {
              return item[key].includes(value);
            } else */
            console.log(
              "*******************************************************"
            );
            console.log("ITEM ATUAL SENDO PERCORRIDO ->", item);

            console.log("FIltro sendo aplicado ->", filters);

            console.log(key, value);
            console.log(
              "*******************************************************"
            );

            if (
              filters?.variacoes[0]?.size &&
              filters?.variacoes[0]?.color &&
              filters?.variacoes[0]?.price
            ) {
              var allSizes = item[key].map((i) => i.size);
              var allColors = item[key].map((i) => i.color);
              var allTeste = Object.entries(item[key].map((i) => i));
              var allTesteValue = Object.entries(value[0]);
              const entries = Object.entries(item[key]);

              const matches = item[key].some((current) => {
                console.log(
                  "🚀 ~ file: Products.jsx:189 ~ Object.entries ~ current:",
                  current
                );
                return value.some((combination) =>
                  Object.entries(combination).every(
                    ([keyCombination, valueCombination]) =>
                      current[keyCombination] === valueCombination
                  )
                );
              });

              console.log(matches);
              return matches;
            }
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

              console.log(matches);
              return matches;
            } else if (filters?.variacoes[0]?.color) {
              console.log(
                "isso me retorna oq? (estou NO IF DAS CORES) -> " +
                  filters?.variacoes[0]?.color,
                item,
                key,
                item[key]
              );
              var allColors = item[key].map((i) => i.color);

              return value.some((val) => allColors.includes(val.color));
            } else if (filters?.variacoes[0]?.size) {
              var allSizes = item[key].map((i) => i.size);

              return value.some((val) => allSizes.includes(val.size));
            } else if (filters?.variacoes[0]?.price) {
              console.log(
                item[key],
                key,
                filters?.variacoes[0]?.price[1],
                filters?.variacoes[0]?.price[0]
              );
              return (
                item["price"] <= filters?.variacoes[0]?.price[1] &&
                item["price"] >= filters?.variacoes[0]?.price[0]
              );
            } else {
              return item[key].includes(value);
            }
            return;
          })
        )
      );
    const highestPrice = produtosFiltrados.reduce((maxPrice, product) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0);
    getMaxPrice(highestPrice);
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
    console.log("al", !!filters, !!filters.price);
    console.log("al", filters, filters.price);

    if (!!filters && !!filters.price) {
      console.log(produtosFiltrados);
      console.log(products);
      console.log(produtosOriginais);
      setProducts((prev) =>
        produtosOriginais.filter((a) => {
          console.log(a.price);
          return a.price >= filters.price[0] && a.price <= filters.price[1];
        })
      );
      console.log(produtosFiltrados);
      console.log(products);
      /*  const highestPrice = filteredProducts.reduce((maxPrice, product) => {
        return product.price > maxPrice ? product.price : maxPrice;
      }, 0);
      getMaxPrice(highestPrice); */
    }
  }, [filters]);
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <Container origem={origem}>
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
      <ContainerProdutos>
        {produtosFiltrados.length > 0
          ? produtosFiltrados.map((item) => (
              <>
                <b>produtosFiltrados</b>
                <Product item={item} key={item.id} />
              </>
            ))
          : cat && filters !== {} && filters.variacoes !== undefined
          ? filteredProducts.map((item) => (
              <>
                <b>filteredProducts</b> <Product item={item} key={item.id} />
              </>
            ))
          : products.slice(0, 8).map((item) => (
              <>
                <b>products</b> <Product item={item} key={item.id} />
              </>
            ))}
      </ContainerProdutos>
    </Container>
  );
};

export default Products;
