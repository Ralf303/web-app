import { Outlet, Link, useLocation } from "react-router-dom";
import "../../styles/navBar.css";
import { HomeSvg } from "../../img/home";
import ChestSvg from "img/chest";
import { GpuSvg } from "img/gpu";
import { MainSvg } from "img/main";

function NavBar() {
  const location = useLocation();
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-list">
          <div className="navbar-item">
            <Link
              to="/gpu"
              className={`navbar-link ${
                location.pathname === "/gpu" ? "active" : ""
              }`}
            >
              <GpuSvg pathname={`${location.pathname}`} />
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/home"
              className={`navbar-link ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <HomeSvg pathname={`${location.pathname}`} />
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <MainSvg pathname={`${location.pathname}`} />
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/daily-bonus"
              className={`navbar-link ${
                location.pathname === "/daily-bonus" ? "active" : ""
              }`}
            >
              <ChestSvg pathname={`${location.pathname}`} />
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
