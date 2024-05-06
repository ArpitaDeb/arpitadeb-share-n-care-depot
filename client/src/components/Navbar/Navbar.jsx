import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/ShareNCareLogo.png";

import "./Navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <header className="navigation">
      <div className="navigation__wrapper">
        <Link to="/">
          <img className="navigation__logo" src={Logo} alt="logo" />
        </Link>
        <nav className="navigation__navbar">
          <ul className="navigation__list">
            <li className="navigation__item">
              <button
                className={`navigation__item navigation__button ${
                  location.pathname === "/" ? "navigation__button--active" : ""
                }`}
                onClick={() => handleNavigation("/")}
              >
                Home
              </button>
            </li>
            <li className="navigation__item">
              <button
                className={`navigation__item navigation__button ${
                  location.pathname === "/inventory"
                    ? "navigation__button--active"
                    : ""
                }`}
                onClick={() => handleNavigation("/inventory")}
              >
                Collection
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
