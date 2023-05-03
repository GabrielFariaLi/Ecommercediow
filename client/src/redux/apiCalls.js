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
} from "./userRedux";
import { publicRequest } from "../requestMethods";

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
    const res = await publicRequest.post("/auth/register", utilizador);
    dispatch(registrarSucesso(res.data)); //payload in redux
  } catch (err) {
    dispatch(registrarFalha());
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
