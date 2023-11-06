import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    utilizadores: [],
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
    logout: (state) => {
      state.currentUser = null;
    },
    //GET ALL
    getUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores = action.payload;
    },
    getUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores.splice(
        state.utilizadores.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores[
        state.utilizadores.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.utilizadr;
    },
    updateUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores.push(action.payload);
    },
    addUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
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
} = userSlice.actions;
export default userSlice.reducer;
