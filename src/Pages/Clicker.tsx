import React, { useState } from "react";
import "../styles/App.css";
import Clicker from "../components/clicker/clicker-component";
import "../styles/clicker.css";

function ClickerPage() {
  return (
    <div className="App">
      <Clicker />
    </div>
  );
}

export default ClickerPage;
