const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://admin:wQhUu7yTb5UY6C9H@cluster.rjsgh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = db