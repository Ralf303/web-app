import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Snowfall from "react-snowfall";
import NavBar from "./components/tabs/tab-component";
import ErrorPage from "./Pages/Err";
import Main from "./Pages/Main";
import ChestPage from "Pages/Chests";
import SlotPage from "Pages/Slot";
import Home from "Pages/Home";
import Gpu from "Pages/Gpu";

function App() {
  return (
    <BrowserRouter>
      <Snowfall snowflakeCount={35} speed={[0.1, 0.3]} wind={[-1, 1.5]} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/slot" element={<SlotPage />} />
          <Route path="/gpu" element={<Gpu />} />
          <Route path="/daily-bonus" element={<ChestPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
