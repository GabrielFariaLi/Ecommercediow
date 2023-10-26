const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    telefone: { type: String },
    cpf: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    endereco: {
      identificacao: { type: String },
      logradouro: { type: String },
      numero: { type: String },
      complemento: { type: String },
      bairro: { type: String },
      referencia: { type: String },
      cidade: { type: String },
      uf: { type: String },
      cep: { type: String },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
