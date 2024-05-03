import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// import pickaxeSvg from "../../img/pickaxe.svg";
import "../../styles/navBar.css";
import { PickaxeSvg } from "../../img/pickaxe";
import { HomeSvg } from "../../img/home";
import ChestSvg from "img/chest";
import { SlotSvg } from "img/slot";

function NavBar() {
  const location = useLocation();
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-list">
          <div className="navbar-item">
            <Link
              to="/clicker"
              className={`navbar-link ${
                location.pathname === "/clicker" ? "active" : ""
              }`}
            >
              <SlotSvg pathname={`${location.pathname}`} />
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <HomeSvg pathname={`${location.pathname}`} />
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
