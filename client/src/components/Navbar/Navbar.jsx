import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/ShareNCareLogo.png";
import userimg from "../../assets/images/healthicons_ui-user-profile.svg";

import "./Navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (route) => {
    navigate(route);
  };

  const userRole = localStorage.getItem("userRole");
  const isLoggedIn = localStorage.getItem("authToken");

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
            <li className="navigation__item">
            {userRole === "admin" &&
              <button
                className={`navigation__item navigation__button ${
                  location.pathname === "/upload"
                    ? "navigation__button--active"
                    : ""
                }`}
                onClick={() => handleNavigation("/upload")}
              >
                Add Product
              </button> }
            </li>
            <li className="navigation__item">
              {isLoggedIn ? (
                <div className="navigation__item-avatar-container">
                <img
                src={userimg}
                alt="avatar"
                className="navigation__item-avatar" />
                <button
                  className="navigation__item navigation__button"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole");
                    navigate("/");
                  }}
                >
                  LogOut
                </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="navigation__item navigation__button">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;