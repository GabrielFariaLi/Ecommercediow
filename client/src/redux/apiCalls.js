import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSucesso,
  logoutInicio,
  logoutFalha,
  registrarInicio,
  registrarSucesso,
  registrarFalha,
  editarInicio,
  editarSucesso,
  editarFalha,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

import { resetarCarrinhoSucesso } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const logout = async (dispatch) => {
  dispatch(logoutInicio());
  try {
    dispatch(logoutSucesso()); //payload in redux
  } catch (err) {
    dispatch(logoutFalha());
  }
};
export const registrarUtilizador = async (dispatch, utilizador) => {
  dispatch(registrarInicio());
  try {
    console.log(utilizador);
    const res = await userRequest.post("/auth/register", utilizador);
    dispatch(registrarSucesso(res.data)); //payload in redux
  } catch (err) {
    dispatch(registrarFalha());
  }
};
export const editarUtilizador = async (dispatch, utilizador) => {
  console.log(
    "🚀 ~ file: apiCalls.js:44 ~ editarUtilizador ~ utilizador:",
    utilizador
  );
  dispatch(editarInicio());
  const dataFormatada = {
    name: utilizador.inputs.nameInput,
    telefone: utilizador.inputs.telefoneInput,
    email: utilizador.inputs.emailInput,
    cpf: utilizador.inputs.cpfInput,
    endereco: {
      identificacao: utilizador.inputs.indentificacaoInput,
      logradouro: utilizador.inputs.logradouroInput,
      numero: utilizador.inputs.numeroInput,
      complemento: utilizador.inputs.complementoInput,
      bairro: utilizador.inputs.bairroInput,
      referencia: utilizador.inputs.referenciaInput,
      cidade: utilizador.inputs.cidadeInput,
      uf: utilizador.inputs.ufInput,
      cep: utilizador.inputs.cepInput,
    },

    img: "D32WDW",
  };
  console.log(
    "🚀 ~ file: apiCalls.js:69 ~ editarUtilizador ~ dataFormatada:",
    dataFormatada
  );
  try {
    const res = await publicRequest.put(
      `/users/profile/${utilizador.inputs.idUtilizador}`,
      dataFormatada
    );
    dispatch(editarSucesso(res.data)); //payload in redux
  } catch (err) {
    dispatch(editarFalha());
  }
};

export const resetarCarrinho = async (dispatch) => {
  dispatch(resetarCarrinhoSucesso());
  try {
    dispatch(resetarCarrinhoSucesso()); //payload in redux
  } catch (err) {
    dispatch(resetarCarrinhoSucesso());
  }
};
