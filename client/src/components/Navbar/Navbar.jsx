import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/ShareNCareLogo.png"

import "./Navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  
  const handleButtonOnClick = () => {
    navigate('/');
    
  };
  const handleOnClick = () => {
    navigate('/inventory');
  };
  return (
    <header className="navigation">
      <div className="navigation__wrapper">
      <Link to="/">
      <img className="navigation__logo" src={Logo} alt="logo" />
      </Link>
      <nav className="navigation__navbar">
        <ul className="navigation__list">
          <li className="navigation__active">
            <button onClick={handleButtonOnClick} className="navigation__item navigation__button"> About Us{" "}</button>
          </li>
          <li className="navigation__item">
            <button onClick={handleOnClick} className="navigation__item navigation__button"> Browse Inventory</button>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Navbar;
