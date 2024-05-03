import React, { useState } from "react";
import "../styles/App.css";
import ErrComponent from "../components/error/err-component";

function ErrorPage() {
  return (
    <div className="App">
      <ErrComponent />
    </div>
  );
}

export default ErrorPage;
