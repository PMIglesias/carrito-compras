const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const { UserErrors } = require("../error");

const router = Router();

// Clave secreta para JWT (idealmente debería estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION = "1h";

// Ruta de registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Validación manual
    if (!nombre || !apellido || !email || !password) {
      return res.status(UserErrors.MISSING_FIELDS.statusCode).json({
        message: UserErrors.MISSING_FIELDS.message,
      });
    }

    if (
      nombre.length < 3 ||
      nombre.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(nombre)
    ) {
      return res.status(UserErrors.INVALID_NAME.statusCode).json({
        message: UserErrors.INVALID_NAME.message,
      });
    }

    if (
      apellido.length < 3 ||
      apellido.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(apellido)
    ) {
      return res.status(UserErrors.INVALID_LASTNAME.statusCode).json({
        message: UserErrors.INVALID_LASTNAME.message,
      });
    }

    if (!/.+@.+\..+/.test(email)) {
      return res.status(UserErrors.INVALID_EMAIL.statusCode).json({
        message: UserErrors.INVALID_EMAIL.message,
      });
    }

    if (password.length < 8) {
      return res.status(UserErrors.INVALID_PASSWORD.statusCode).json({
        message: UserErrors.INVALID_PASSWORD.message,
      });
    }

    // Verificar si el correo electrónico ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(UserErrors.EMAIL_EXISTS.statusCode).json({
        message: UserErrors.EMAIL_EXISTS.message,
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(UserErrors.SERVER_ERROR.statusCode).json({
      error: UserErrors.SERVER_ERROR.message,
      details: error.message,
    });
  }
});

// Ruta de inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(UserErrors.MISSING_FIELDS.statusCode).json({
        message: UserErrors.MISSING_FIELDS.message,
      });
    }

    // Buscar usuario por email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(UserErrors.USER_NOT_FOUND.statusCode).json({
        message: UserErrors.USER_NOT_FOUND.message,
      });
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(UserErrors.INVALID_CREDENTIALS.statusCode).json({
        message: UserErrors.INVALID_CREDENTIALS.message,
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, nombre: user.nombre }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error durante el inicio de sesión:", err);
    res.status(UserErrors.SERVER_ERROR.statusCode).json({
      error: UserErrors.SERVER_ERROR.message,
      details: err.message,
    });
  }
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido o expirado" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Token no proporcionado" });
  }
};

module.exports = router;
