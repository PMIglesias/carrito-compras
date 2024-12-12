import React from "react";
import success from "../../assets/success_b.png"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

function SuccessModal({ message }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={success} alt="Success" width="200" height="200" />
      <br />
      <p>{message}</p>
    </div>
  );
}

export default SuccessModal;
