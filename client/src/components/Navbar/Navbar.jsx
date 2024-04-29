import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo/ShareNCareLogo.png"

import "./Navbar.scss";

function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__container">
      <div className="site-header__logo-container">
        <Link to="/">
          <img src={Logo} className="site-header__logo" alt="Logo" />
        </Link>
      </div>
      <div className="site-header__navbar">
        <nav className="navbar">
          <Link to="/" className="navbar__btn">
            Warehouses{" "}
          </Link>
          <Link to="/inventory" className="navbar__btn">
            Inventory
          </Link>
        </nav>
      </div>
      </div>
    </header>
  );
}

export default Navbar;
