const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria_id: { type: Number, required: true },
  imagen_url: { type: String, required: true },
});

module.exports = model("Product", ProductSchema);