import "./App.scss";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./UserContext";
import NavbarComponent from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Carousel/Carousel";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import SuccessModal from "./components/Modal/Success";
import ErrorModal from "./components/Modal/Error";
import axios from "axios";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Puedes cargar productos al inicio si lo necesitas
    // Aquí un ejemplo de cómo obtener los productos desde la API si es necesario:
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };
    fetchProducts();
  }, []); // Este efecto se ejecuta solo una vez cuando se monta el componente

  const toggleModal = (modalType) => {
    setIsLoginModalOpen(modalType === "login");
    setIsRegisterModalOpen(modalType === "register");
    setModalContent(modalType);
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
  };

  const handleRegisterSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
    toggleModal("login");
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setModalContent("error");
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/categorias/${categoryId}/productos`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
    }
  };

  /* Envolvemos la home con el provider del context */
  return (
    <UserProvider>
    <CartProvider>
      <NavbarComponent 
              openLoginModal={() => toggleModal("login")}
              openRegisterModal={() => toggleModal("register")}
              onCategoryClick={handleCategoryClick}
              onSearchQueryChange={handleSearchQueryChange}
              />
      <Hero />
      <Home />
      <Footer />
      <Modal
        show={isLoginModalOpen || isRegisterModalOpen}
        onHide={() => toggleModal("")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent === "login" && "Iniciar Sesión"}
            {modalContent === "register" && "Registrarse"}
            {modalContent === "success" && `Bienvenido, ${userName}`}
            {modalContent === "error" && "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "login" && (
            <LoginForm
              onClose={() => toggleModal("")}
              onRegister={() => toggleModal("register")}
              onSuccess={handleLoginSuccess}
              onError={handleError}
            />
          )}
          {modalContent === "register" && (
            <RegisterForm
              onClose={() => toggleModal("")}
              onLogin={() => toggleModal("login")}
              onSuccess={handleRegisterSuccess}
              onError={handleError}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {modalContent === "success" && (
            <SuccessModal
              message="Ha iniciado sesión correctamente"
              onClose={() => toggleModal("")}
            />
          )}
          {modalContent === "error" && (
            <ErrorModal
              message={errorMessage}
              onClose={() => toggleModal("")}
            />
          )}
        </Modal.Body>
      </Modal>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
