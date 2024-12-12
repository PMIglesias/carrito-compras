const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Formato de correo inválido"],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const UserModel = model("Usuario", userSchema, "usuarios");

module.exports = { UserModel };
