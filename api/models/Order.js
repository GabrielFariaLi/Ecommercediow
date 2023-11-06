const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        variacao: [
          {
            size: { type: String },
            color: { type: String },
            quantity: { type: Number },
          },
        ],
      },
    ],
    amount: { type: Number, required: true },
    address: {
      cep: { type: String, required: true },
      numero: { type: String, required: true },
      logradouro: { type: String, required: true },
      complemento: { type: String, required: true },
      bairro: { type: String, required: true },
      referencia: { type: String, required: true },
      cidade: { type: String, required: true },
      uf: { type: String, required: true },
    },

    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
