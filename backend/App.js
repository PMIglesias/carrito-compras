const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");

const db = require("./database");
const controllers = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRouter); // Rutas de usuarios

/* GET */
app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);

/* POST */
app.post("/products-cart", controllers.addProductCart);

/* PUT */
app.put("/products-cart/:productId", controllers.putProduct);

/* DELETE */
app.delete("/products-cart/:productId", controllers.deleteProduct);

app.listen(4000, () => {
  console.log("Server funcionando en el puerto 4000");
  // Conectar a la base de datos
  db();
});

module.exports = app;
