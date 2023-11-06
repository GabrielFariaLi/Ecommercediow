import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGOUT
    logoutSucesso: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    logoutInicio: (state) => {
      state.isFetching = true;

      state.error = false;
    },
    logoutFalha: (state) => {
      state.isFetching = false;

      state.error = true;
    },
    //REGISTRAR
    registrarInicio: (state) => {
      state.isFetching = true;
      state.emailExistente = false;
    },
    registrarSucesso: (state, action) => {
      state.isFetching = false;
      //state.utilizadorAtual = action.payload;
      state.emailExistente = false;
    },
    registrarFalha: (state) => {
      state.isFetching = false;
      state.error = true;
      state.emailExistente = true;
    },
    //EDITAR
    editarInicio: (state) => {
      state.isFetching = true;
      state.emailExistente = false;
    },
    editarSucesso: (state, action) => {
      state.isFetching = false;
      //state.utilizadorAtual = action.payload;
      state.emailExistente = false;
    },
    editarFalha: (state) => {
      state.isFetching = false;
      state.error = true;
      state.emailExistente = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSucesso,
  logoutInicio,
  logoutFalha,
  registrarInicio,
  registrarSucesso,
  registrarFalha,
  editarInicio,
  editarSucesso,
  editarFalha,
} = userSlice.actions;
export default userSlice.reducer;
