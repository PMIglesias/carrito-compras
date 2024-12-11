import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/products");
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsCart = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/products-cart");
      setCartItems(data.productsCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      await getProductsCart();
    };
    fetchData();
  }, []);

  const addItemToCart = async (product) => {
    try {
      const { nombre, imagen_url, precio } = product;
      await axios.post("http://localhost:4000/products-cart", {
        nombre,
        imagen_url,
        precio,
      });
      await getProductsCart(); // Solo actualiza el carrito
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const editItemToCart = async (id, query, stock) => {
    try {
      if (query === "del" && stock === 1) {
        await axios.delete(`http://localhost:4000/products-cart/${id}`);
      } else {
        await axios.put(
          `http://localhost:4000/products-cart/${id}?query=${query}`,
          { stock }
        );
      }
      await getProductsCart(); // Solo actualiza el carrito
    } catch (error) {
      console.error("Error editing cart item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, editItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
