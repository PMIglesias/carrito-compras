const Cart = require("../model/Cart");
const mongoose = require("mongoose");

const putProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { query } = req.query;
    const { stock } = req.body;

    // Validar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ mensaje: "ID de producto inválido" });
    }

    // Validar que el query sea válido
    if (!["add", "del"].includes(query)) {
      return res
        .status(400)
        .json({ mensaje: "Query inválida. Usa 'add' o 'del'" });
    }

    // Buscar el producto en la base de datos
    const productBuscado = await Cart.findById(productId);

    if (!productBuscado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Modificar el stock según la operación
    let nuevoStock = productBuscado.stock;
    if (query === "add") {
      nuevoStock += 1;
    } else if (query === "del") {
      if (nuevoStock <= 0) {
        return res
          .status(400)
          .json({ mensaje: "El stock no puede ser menor a 0" });
      }
      nuevoStock -= 1;
    }

    // Actualizar el producto
    const productoActualizado = await Cart.findByIdAndUpdate(
      productId,
      { stock: nuevoStock }, // Solo actualizar el stock
      { new: true } // Retornar el documento actualizado
    );

    res.json({
      mensaje: `El producto '${productoActualizado.nombre}' fue actualizado`,
      producto: productoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
};

module.exports = putProduct;
