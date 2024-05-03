import React from "react";
import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ClickerPage from "./Pages/Clicker";
import NavBar from "./components/tabs/tab-component";
import ErrorPage from "./Pages/Err";
import Home from "./Pages/Home";
import ChestPage from "Pages/Chests";
import SlotPage from "Pages/Slot";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clicker" element={<SlotPage />} />
          <Route path="/daily-bonus" element={<ChestPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
