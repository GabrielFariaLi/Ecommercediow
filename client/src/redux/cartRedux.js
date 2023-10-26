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
      console.log(action.payload);
      console.log(JSON.parse(JSON.stringify(state.products)));

      let produtoJaAdicionado = state.products.find((produto) => {
        if (
          produto._id === action.payload._id &&
          produto.corEscolhida === action.payload.corEscolhida &&
          produto.tamanhoEscolhido === action.payload.tamanhoEscolhido
        ) {
          return produto;
        }
        return false;
      });
      if (!!produtoJaAdicionado) {
        action.payload = { ...action.payload, modo: "+" };

        /* atualizar produto */
        state.products.map((item) => {
          if (
            item.id === action.payload.id &&
            item.corEscolhida === action.payload.corEscolhida &&
            item.tamanhoEscolhido === action.payload.tamanhoEscolhido
          ) {
            item.variacoes.map((variacoes) => {
              if (
                variacoes.color === action.payload.corEscolhida &&
                variacoes.size === action.payload.tamanhoEscolhido
              ) {
                state.total -= item.price * item.quantidadeEscolhida;
                action.payload.modo === "+"
                  ? (variacoes.quantity += 1)
                  : (variacoes.quantity -= 1);
                item.quantidadeEscolhida = variacoes.quantity;

                state.total += item.price * item.quantidadeEscolhida;
              }
              return variacoes;
            });
          }
          return item;
        });
      } else {
        state.quantity += 1; // referente ao numero de itens no carrinho
        state.products.push(action.payload);
        state.total +=
          action.payload.price * action.payload.quantidadeEscolhida;
      }
    },

    resetarCarrinhoSucesso: (estado_anterior, action) => {
      estado_anterior.quantity = 0; // referente ao badge nº de items no carrinho
      estado_anterior.products = []; // PAYLOAD = novo produto
      estado_anterior.total = 0;
    },

    atualizarProduto: (state, action) => {
      console.log("➕", action.payload);
      console.log("➕ state", JSON.parse(JSON.stringify(state)));
      if (
        action.payload.quantidadeEscolhida === 1 &&
        action.payload.modo === "-"
      ) {
        deletarProdutoUnicoDoCarrinho(action.payload);
        return;
      }
      let produtosAtualizados = state.products.map((item) => {
        if (
          item.id === action.payload.id &&
          item.corEscolhida === action.payload.corEscolhida &&
          item.tamanhoEscolhido === action.payload.tamanhoEscolhido
        ) {
          item.variacoes.map((variacoes) => {
            if (
              variacoes.color === action.payload.corEscolhida &&
              variacoes.size === action.payload.tamanhoEscolhido
            ) {
              state.total -= item.price * item.quantidadeEscolhida;
              action.payload.modo === "+"
                ? (variacoes.quantity += 1)
                : (variacoes.quantity -= 1);
              item.quantidadeEscolhida = variacoes.quantity;

              state.total += item.price * item.quantidadeEscolhida;
            }
            return variacoes;
          });
        }
        return item;
      });
      console.log(
        JSON.parse(JSON.stringify(produtosAtualizados)),
        "➕ produtosAtualizados"
      );

      // state.quantity += 1;
      // state.products.push(action.payload);
      // state.total += action.payload.price * action.payload.quantity;
    },
    deletarProdutoUnicoDoCarrinho: (state, action) => {
      console.log(action.payload._id);
      console.log(action.payload.corEscolhida);
      console.log(action.payload.tamanhoEscolhido);
      const updatedProducts = state.products.filter((item) => {
        console.log(item.corEscolhida);
        console.log(item.tamanhoEscolhido);
        return (
          (item.corEscolhida !== action.payload.corEscolhida ||
            item.tamanhoEscolhido !== action.payload.tamanhoEscolhido) &&
          item._id === action.payload._id
        );
        /* return item.variacoes.map((variacoes) => {
          if (
            variacoes.color !== action.payload.corEscolhida &&
            variacoes.size !== action.payload.tamanhoEscolhido &&
            item._id !== action.payload._id
          ) {
            console.log(item);
            return item;
          }
        }); */
      });
      console.log(
        "🚀 ~ file: cartRedux.js:60 ~ updatedProducts ~ updatedProducts:",
        updatedProducts
      );
      const updatedQuantity = state.quantity - 1;
      const updatedTotal =
        state.total - action.payload.price * action.payload.quantidadeEscolhida;

      return {
        ...state,
        products: updatedProducts,
        quantity: updatedQuantity,
        total: updatedTotal,
      };
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
