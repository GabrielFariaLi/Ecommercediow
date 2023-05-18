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

const Products = ({ cat, filters, sort, origem }) => {
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [arrayTagsSelecionadas, setArrayTagsSelecionadas] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

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
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    console.log(filters);
    console.log(products);
    cat &&
      filters !== {} &&
      setProdutosFiltrados(
        products.filter((item) =>
          Object.entries(filters).every(([key, value], i) => {
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
              filters?.variacoes[0]?.tamanho &&
              filters?.variacoes[0]?.cor &&
              filters?.variacoes[0]?.price
            ) {
              var allSizes = item[key].map((i) => i.tamanho);
              var allColors = item[key].map((i) => i.cor);
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
            }
            if (filters?.variacoes[0]?.tamanho && filters?.variacoes[0]?.cor) {
              var allSizes = item[key].map((i) => i.tamanho);
              var allColors = item[key].map((i) => i.cor);
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
            } else if (filters?.variacoes[0]?.cor) {
              console.log(
                "isso me retorna oq? (estou NO IF DAS CORES) -> " +
                  filters?.variacoes[0]?.cor
              );
              var allColors = item[key].map((i) => i.cor);

              return value.some((val) => allColors.includes(val.cor));
            } else if (filters?.variacoes[0]?.tamanho) {
              var allSizes = item[key].map((i) => i.tamanho);

              return value.some((val) => allSizes.includes(val.tamanho));
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
              <Product item={item} key={item.id} />
            ))
          : cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item.id} />)}
      </ContainerProdutos>
    </Container>
  );
};

export default Products;
