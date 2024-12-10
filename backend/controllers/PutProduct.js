const Cart = require("../model/Cart");

const putProduct = async (req, res) => {
  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  /* Buscamos el producto en el carrito */
  const productBuscado = await Cart.findById(productId);

  /* Si no hay query 'add' o 'del' */
  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

    /* Si esta el producto en el carrito y quiero agregar */
  } else if (productBuscado && query === "add") {
    body.stock += body.stock + 1;

      // Verifica que body.name no sea null
    if (!body.nombre) {
      return res.status(400).json({ mensaje: "El nombre del producto no puede ser nulo" });
    }

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) => {
      if (product) {
        res.json({
          mensaje: `El producto: ${product.nombre} fue actualizado`,
          product,
        });
      } else {
        res.status(404).json({ mensaje: "Producto no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ mensaje: "Error al actualizar el producto", error });
    });

    /* Si esta el producto en el carrito y quiero sacar */
  } else if (productBuscado && query === "del") {
    body.stock -= 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) =>
      res.json({
        mensaje: `El producto: ${product.nombre} fue actualizado`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "Ocurrio un error" });
  }
};

module.exports = putProduct;
