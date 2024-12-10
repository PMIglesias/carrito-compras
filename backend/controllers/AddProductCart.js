const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addProductCart = async (req, res) => {
  const { nombre, imagen_url, precio } = req.body;

    // Verifica que nombre no sea null
  if (!nombre) {
    return res.status(400).json({ mensaje: "El nombre del producto no puede ser nulo" });
  }
  
  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Product.findOne({ nombre });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = nombre !== "" && imagen_url !== "" && precio !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ nombre });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ nombre, imagen_url, precio, stock: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, nombre, imagen_url, precio },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};

module.exports = addProductCart;
