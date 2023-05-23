const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },

    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    variacoes: [
      {
        size: { type: String },
        color: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    precoAntigo: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
