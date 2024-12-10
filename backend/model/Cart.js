const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagen_url: { type: String, required: true }
});

module.exports = model("Cart", CartSchema);
