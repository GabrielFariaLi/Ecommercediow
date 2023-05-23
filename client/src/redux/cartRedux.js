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
      state.quantity += 1; // referente ao numero de itens no carrinho
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantidadeEscolhida;
    },

    resetarCarrinhoSucesso: (estado_anterior, action) => {
      estado_anterior.quantity = 0; // referente ao badge nº de items no carrinho
      estado_anterior.products = []; // PAYLOAD = novo produto
      estado_anterior.total = 0;
    },

    atualizarProduto: (state, action) => {
      console.log("🚀 ~ file: cartRedux.js:42 ~ action:", action);
      state.products.map((item) => {
        console.log(item);
        if (item.id === action.payload.id) {
          console.log("🙀", item);
          item.variacoes.map((variacoes) => {
            console.log("🐼", variacoes);
            if (
              variacoes.color === action.payload.corEscolhida &&
              variacoes.size === action.payload.tamanhoEscolhido
            ) {
              state.total -= item.price * item.quantidadeEscolhida;
              console.log("🙀🐼🌍", item);
              action.payload.modo === "+"
                ? (variacoes.quantity += 1)
                : (variacoes.quantity -= 1);
              item.quantidadeEscolhida = variacoes.quantity;

              state.total += item.price * item.quantidadeEscolhida;
            }
          });
        }
      });
      // state.quantity += 1;
      // state.products.push(action.payload);
      // state.total += action.payload.price * action.payload.quantity;
    },
    deletarProdutoUnicoDoCarrinho: (state, action) => {
      state.products.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantidadeEscolhida;
    },
  },
});

export const {
  addProduct,
  deletarProdutoUnicoDoCarrinho,
  resetarCarrinhoSucesso,
  atualizarProduto,
} = cartSlice.actions;
export default cartSlice.reducer;
