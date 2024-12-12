class UserErrors {
  static INVALID_USERNAME = {
    message:
      "Nombre de usuario inválido. Debe tener entre 3 y 20 caracteres alfanuméricos.",
    statusCode: 400,
  };

  static INVALID_EMAIL = {
    message: "Email inválido. Debe tener un formato de correo válido.",
    statusCode: 400,
  };

  static INVALID_PASSWORD = {
    message: "La contraseña debe tener al menos 8 caracteres.",
    statusCode: 400,
  };

  static USERNAME_EXISTS = {
    message: "El nombre de usuario ya existe.",
    statusCode: 400,
  };

  static EMAIL_EXISTS = {
    message: "El correo electrónico ya está registrado.",
    statusCode: 400,
  };

  static USER_NOT_FOUND = {
    message: "Usuario no encontrado.",
    statusCode: 400,
  };

  static INVALID_CREDENTIALS = {
    message: "Credenciales incorrectas.",
    statusCode: 400,
  };

  static SERVER_ERROR = {
    message: "Error interno del servidor.",
    statusCode: 500,
  };

  static MISSING_FIELDS = {
    message: "Complete los campos requeridos.",
    statusCode: 400,
  };
}

module.exports = { UserErrors };
