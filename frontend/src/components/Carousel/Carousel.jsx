import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/carousel1.png"; // Importa la imagen
import image2 from "../../assets/carousel2.png"; // Importa la imagen
import image3 from "../../assets/carousel3.png"; // Importa la imagen

const Hero = () => {
  return (
    <div style={{ marginTop: '60px' }}>  {/* Aquí se agrega el margin-top */}
      <Carousel aria-label="Carrusel de imágenes promocionales">
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="Imagen de componente de PC" aria-label="Componente de PC en oferta" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Imagen de periférico de PC" aria-label="Periférico de PC en oferta" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
  className="d-block w-100 img-fluid"
  src={image3}
  alt="Imagen de torre de PC"
  aria-label="Torre de PC con especificaciones avanzadas"
  style={{ height: '356px', objectFit: 'cover' }} // Ajusta la altura a 300px y mantiene la proporción
/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Hero;