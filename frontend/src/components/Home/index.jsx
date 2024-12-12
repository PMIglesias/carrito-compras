import React from "react";
import Cart from "../Cart";
import Products from "../Products";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className="my-4 text-center">Nuestros Productos</h1>

      <Products />
    </div>
  );
};

export default Home;
