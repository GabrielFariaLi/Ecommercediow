import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    excluirProduto: (estado_anterior, action) => {
      estado_anterior.quantidade -= 2;
      estado_anterior.produtos = estado_anterior.produtos.filter(
        (item) => item.id_variacao_root !== action.id
      );
      estado_anterior.total -= action.totalPrice;
    },
    excluirProdutoDois: (state, { payload }) => {
      state.quantidade -= 1;
      state.produtos = state.produtos.filter(
        (x) => x.id_variacao_root !== payload.id
      );
      state.total -= payload.totalPrice;
    },
    resetarCarrinhoSucesso: (estado_anterior, action) => {
      estado_anterior.quantidade = 0;
      estado_anterior.produtos = []; // PAYLOAD = novo produto
      estado_anterior.total = 0;
    },
    atualizarProduto: (state, { payload }) => {
      state.produtos = state.produtos.map((product) =>
        product.id_variacao_root === payload.id
          ? { ...product, quantidade: payload.quantidade + product.quantidade }
          : product
      );
      state.total += payload.quantidade < 1 ? -payload.preco : payload.preco;
    },
  },
});

export const {
  addProduct,
  excluirProduto,
  excluirProdutoDois,
  resetarCarrinhoSucesso,
  atualizarProduto,
} = cartSlice.actions;
export default cartSlice.reducer;
