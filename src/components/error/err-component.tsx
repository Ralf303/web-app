import React from "react";
import "../../styles/error.css";

function ErrComponent() {
  return (
    <div className="error-container">
      <h1 className="error-header">404</h1>
      <p className="error-text">Страница не найдена</p>
    </div>
  );
}

export default ErrComponent;
