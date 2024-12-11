const Cart = require("../model/Cart");

const addProductCart = async (req, res) => {
  try {
    const { nombre, imagen_url, precio } = req.body;

    // Verificar si el producto ya está en el carrito
    const productoExistente = await Cart.findOne({ nombre });

    if (productoExistente) {
      // Si el producto ya está, incrementa el stock
      productoExistente.stock += 1;

      const productoActualizado = await productoExistente.save();
      return res.json({
        mensaje: `El stock del producto '${productoActualizado.nombre}' fue actualizado`,
        producto: productoActualizado,
      });
    }

    // Si no está en el carrito, lo agrega
    const nuevoProducto = new Cart({
      nombre,
      imagen_url,
      precio,
      stock: 1, // Stock inicial
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json({
      mensaje: `El producto '${productoGuardado.nombre}' fue agregado al carrito`,
      producto: productoGuardado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al agregar producto al carrito", error });
  }
};

module.exports = addProductCart;
