import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import logo from "../../assets/logo_w.png";
import Cart from "../Cart";
import { UserContext } from "../../UserContext"; // Importar el contexto del usuario

const NavbarComponent = ({
  openLoginModal,
  onCategoryClick,
  onShowAllProducts,
  onSearchQueryChange,
  onProductsUpdate,
}) => {
  const { user, setUser } = useContext(UserContext); // Obtener información del usuario
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado
  const [products, setProducts] = useState([]);

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categorias"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Manejar cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (typeof onSearchQueryChange === "function") {
      onSearchQueryChange(query);
    }
  };

  // Manejar selección de categoría
  const handleCategorySelect = async (categoryId) => {
    console.log("Categoría seleccionada:", categoryId);
    try {
      const response = await axios.get(`http://localhost:3001/api/productos`, {
        params: { categoryId },
      });
      setProducts(response.data);
      if (typeof onProductsUpdate === "function") {
        onProductsUpdate(response.data);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
  const handleLogout = () => {
    // Limpia el token y el estado del usuario
    localStorage.removeItem("token");
    setUser(null); // Limpia el usuario del contexto
    setIsLoggedIn(false); // Cambia el estado de logueo
    alert("Has cerrado sesión correctamente.");
    console.log("Sesión cerrada");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo de la tienda"
            width="30"
            height="30"
            className="logo d-inline-block align-top ms-3"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
          <Nav className="ml-auto w-100">
            <Form className="d-flex w-100 ps-3">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="mr-2 w-100"
                aria-label="Buscar productos en la tienda"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" aria-label="Buscar">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                href="#productos"
                onClick={onShowAllProducts}
                aria-label="Ver todos los productos"
              >
                Productos
              </Nav.Link>
              <NavDropdown
                title="Categorías"
                id="collasible-nav-dropdown"
                aria-label="Filtrar por categorías"
              >
                {categories.map((cat) => (
                  <NavDropdown.Item
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat._id)}
                    aria-label={`Filtrar productos por la categoría ${cat.nombre}`}
                  >
                    {cat.nombre}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {user ? (
                <NavDropdown
                  title={user.nombre}
                  id="user-dropdown"
                  aria-label={`Opciones del usuario ${user.nombre}`}
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Salir
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <button
                  className="nav-link btn btn-link"
                  onClick={openLoginModal}
                  aria-label="Abrir modal de inicio de sesión"
                >
                  Ingresar
                </button>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
        <Cart />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
