import React, { useState } from "react";
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  const handleImageClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
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
            <li className="navigation__item">
              {localStorage.getItem("authToken") ? (
                  <button
                    className="navigation__item navigation__button"
                    onClick={()=>{localStorage.removeItem('authToken');window.location.replace("/");}}
                  >
                    LogOut
                  </button>
              ) : (
                <Link to="/login">
                  <button
                    className="navigation__item navigation__button"
                  >
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
            
              /* 
              // className={`navigation__item navigation__button ${
                    //   location.pathname === "/logout"
                    //     ? "navigation__button--active"
                    //     : ""
                    // }`}{localStorage.getItem("auth-token") ? (
                <div className="navigation__item-logout">
                  <div className="relative">
                    <button onClick={handleImageClick}>
                      <img
                        src={userimg}
                        alt="avatar"
                        className={`navigation__item-avatar ${
                          isDropdownVisible ? "avatar--active" : ""
                        }`}
                      />
                    </button>
                    {isDropdownVisible && (
                      <div className="navigation__item-dropdown-content">
                        <Link to="/profile">My Profile</Link>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`navigation__item-handlog navigation__button ${
                      location.pathname === "/logout"
                        ? "navigation__button--active" : ""
                    }`}
                  >
                    Logout
                  </button>
                </div> */
                // <div className="navigation__item-logout">
                //   <div className="relative">
                //     <button onClick={handleImageClick}>
                //       <img
                //         src={userimg}
                //         alt="avatar"
                //         className={`navigation__item-avatar ${
                //           isDropdownVisible ? "avatar--active" : ""
                //         }`}
                //       />
                //     </button>
                //     {isDropdownVisible && (
                //       <div className="navigation__item-dropdown-content">
                //         <Link to="/profile">My Profile</Link>
                //       </div>
                //     )}
                //   </div>}
                

