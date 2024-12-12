E-commerce de Productos Tecnológicos
Este proyecto es una tienda online dedicada a la venta de productos tecnológicos como periféricos, monitores, componentes internos, y más. Implementa un stack MERN (MongoDB, Express, React, Node.js) y está diseñado para ser una solución completa de e-commerce con categorías, productos, y gestión dinámica de datos.

Notas
Para realizar pruebas locales, es necesario tener instalado MongoDB y Node.js 18 o superior.
Ejecuta npm install para instalar o actualizar las dependencias del proyecto.
Para conectar una base de datos y hacer pruebas locales, ejecuta el backend con el comando npm start.
Esto actualizará todas las dependencias necesarias y conectará con la base de datos definida en el archivo .env.
Configuración de la Base de Datos
La configuración de la base de datos se realiza mediante un archivo .env, donde podrás definir los parámetros de conexión.
Un ejemplo de archivo .env sería:

env
Copiar código
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<nombreBaseDeDatos>
PORT=4001


json
Copiar código
[
  {
    "_id": "674a6608f56841f96e1e231c",
    "nombre": "Periféricos",
    "descripcion": "Dispositivos periféricos como ratones y teclados"
  },
  {
    "_id": "674a6608f56841f96e1e231d",
    "nombre": "Monitores",
    "descripcion": "Pantallas y monitores"
  }
]
GET /api/categorias/:id/productos
Devuelve un arreglo con los productos de una categoría específica.
Parámetros requeridos:

id: ID de la categoría.
Estructura devuelta:

json
Copiar código
[
  {
    "_id": "675a6608f56841f96e1e231f",
    "nombre": "Teclado Mecánico RGB",
    "descripcion": "Un teclado mecánico de alto rendimiento.",
    "precio": 10000,
    "stock": 25,
    "categoria_id": "674a6608f56841f96e1e231c"
  }
]
Productos
GET /api/productos
Devuelve un arreglo con todos los productos disponibles.
Estructura devuelta:

json
Copiar código
[
  {
    "_id": "675a6608f56841f96e1e231f",
    "nombre": "Teclado Mecánico RGB",
    "descripcion": "Un teclado mecánico de alto rendimiento.",
    "precio": 10000,
    "stock": 25,
    "categoria_id": "674a6608f56841f96e1e231c"
  },
  {
    "_id": "675a6608f56841f96e1e2320",
    "nombre": "Monitor 4K",
    "descripcion": "Monitor UHD de 27 pulgadas.",
    "precio": 50000,
    "stock": 15,
    "categoria_id": "674a6608f56841f96e1e231d"
  }
]
POST /api/productos
Crea un nuevo producto.
Datos requeridos:

json
Copiar código
{
  "nombre": "Tarjeta Gráfica RTX 3060",
  "descripcion": "GPU de alto rendimiento para gamers y creadores.",
  "precio": 120000,
  "stock": 10,
  "categoria_id": "674a6608f56841f96e1e2320"
}
Respuesta:

json
Copiar código
{
  "_id": "675a6608f56841f96e1e2321",
  "nombre": "Tarjeta Gráfica RTX 3060",
  "descripcion": "GPU de alto rendimiento para gamers y creadores.",
  "precio": 120000,
  "stock": 10,
  "categoria_id": "674a6608f56841f96e1e2320"
}
Estructura del Proyecto
plaintext
Copiar código
Ecommerce/
├── models/
│   ├── categoria.js          # Modelo de categorías
│   └── product.js            # Modelo de productos
├── routes/
│   ├── categorias.js         # Rutas para categorías
│   └── productos.js          # Rutas para productos
├── client/                   # Aplicación frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── .env                      # Variables de entorno
├── server.js                 # Configuración del servidor
└── README.md                 # Documentación del proyecto
