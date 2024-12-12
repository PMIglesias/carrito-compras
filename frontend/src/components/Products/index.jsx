import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const Products = () => {
  /* Traemos del context la funcion para agregar un producto */
  const { addItemToCart, products } = useContext(CartContext);

  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.imagen_url} alt={product.nombre} />
            <div className={styles.info}>
              <p>{product.nombre}</p>
              <span>${product.precio}</span>
            </div>
            <button
              onClick={() => addItemToCart(product)}
              disabled={product.inCart}
              className={product.inCart ? styles.disabledButton : ""}
            >
              {product.inCart ? "En el carrito" : "Añadir al carrito"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Products;
