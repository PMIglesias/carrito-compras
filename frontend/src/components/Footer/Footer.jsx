import React from "react";

const Footer = () => {
  return (
    <footer
      id="contacto"
      className="bg-light text-center text-lg-start"
      aria-label="Pie de página"
    >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-8 col-md-6 mb-4 mb-md-0">
            <h5
              className="text-uppercase"
              aria-label="Información sobre la empresa"
            >
              Sobre Nosotros
            </h5>
            <p>
              PC Hard ofrece una amplia selección de productos de calidad,
              asegurando una excelente experiencia de compra.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-lg-end">
            <h5 className="text-uppercase" aria-label="Información de contacto">
              Contáctanos
            </h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="mailto:contacto@pchard.com"
                  className="text-dark"
                  aria-label="Enviar correo a contacto@pchard.com"
                >
                  Correo: contacto@pchard.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+541111111111"
                  className="text-dark"
                  aria-label="Llamar al teléfono +54 11 1111-1111"
                >
                  Teléfono: +54 11 1111-1111
                </a>
              </li>
              <li>
                <button
                  className="text-dark btn btn-link p-0"
                  aria-label="Ver dirección física de la tienda"
                >
                  Dirección: Av. ...
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3 bg-dark text-light"
        aria-label="Información de derechos de autor"
      >
        © 2024 PC Hard. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
