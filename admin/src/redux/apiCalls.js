import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUtilizadorInicio,
  getUtilizadorSucesso,
  getUtilizadorFalha,
  deleteUtilizadorInicio,
  deleteUtilizadorSucesso,
  deleteUtilizadorFalha,
  updateUtilizadorInicio,
  updateUtilizadorSucesso,
  updateUtilizadorFalha,
  addUtilizadorInicio,
  addUtilizadorSucesso,
  addUtilizadorFalha,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
} from "./orderRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Usuarios                                  */
/* -------------------------------------------------------------------------- */
export const getUtilizadores = async (dispatch) => {
  dispatch(getUtilizadorInicio());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUtilizadorSucesso(res.data));
  } catch (err) {
    dispatch(getUtilizadorFalha());
  }
};

export const deleteUtilizador = async (id, dispatch) => {
  dispatch(deleteUtilizadorInicio());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUtilizadorSucesso(id));
  } catch (err) {
    dispatch(deleteUtilizadorFalha());
  }
};

export const updateUtilizador = async (id, utilizador, dispatch) => {
  dispatch(updateUtilizadorInicio());
  try {
    const res = await userRequest.put(`/users/${id}`, utilizador);
    dispatch(updateUtilizadorSucesso({ id, utilizador }));
  } catch (err) {
    dispatch(updateUtilizadorFalha());
  }
};
export const addUtilizador = async (utilizador, dispatch) => {
  dispatch(addUtilizadorInicio());
  try {
    const res = await userRequest.post(`/users`, utilizador);
    dispatch(addUtilizadorSucesso(res.data));
  } catch (err) {
    dispatch(addUtilizadorFalha());
  }
};
/* -------------------------------------------------------------------------- */
/*                                     fim                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Produtos                                  */
/* -------------------------------------------------------------------------- */

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    console.log("🚀 ~ file: apiCalls.js:58 ~ addProduct ~ product:", product);
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

/* -------------------------------------------------------------------------- */
/*                                     fim                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Pedidos                                   */
/* -------------------------------------------------------------------------- */

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, product, dispatch) => {
  dispatch(updateOrderStart());
  try {
    // update
    dispatch(updateOrderSuccess({ id, product }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
export const addOrder = async (product, dispatch) => {
  dispatch(addOrderStart());
  try {
    console.log("🚀 ~ file: apiCalls.js:58 ~ addOrder ~ product:", product);
    const res = await userRequest.post(`/products`, product);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};

/* -------------------------------------------------------------------------- */
/*                                     fim                                    */
/* -------------------------------------------------------------------------- */
