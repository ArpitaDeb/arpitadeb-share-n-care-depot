import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/images/hero.png";
import member from "../../assets/images/member.jpg";
import borrow from "../../assets/images/borrow.png";
import one from "../../assets/images/One.jpg";
import two from "../../assets/images/Two.jpg";
import three from "../../assets/images/Three.jpg";
import use from "../../assets/images/use.PNG"
import hand_icon from "../../assets/images/hand_icon.png";
import arrow_icon from "../../assets/images/arrow.png";

import "./Home.scss";

const Home = () => {
 
  return (
    <>
      <div className="hero">
        <div className="hero__left">
          <h2>Purchasing is an option for certain individuals,</h2>
          <div>
            <div className="hero__hand-icon">
              <p>While borrowing is accessible to everyone.</p>
              <img src={hand_icon} alt="hand" />
            </div>
            <p>Discover the item you desire,</p>
            <p>Borrow what you require.</p>
          </div>
          <Link to="/inventory">
            <div className="hero__latest-btn">
              <div>Browse Collection</div>
              <img src={arrow_icon} alt="collection" />
            </div>
          </Link>
        </div>
        <div className="hero__right">
          <img src={hero} alt="hero" />
        </div>
      </div>
      <div className="offers">
        <div className="offers__start">
          <h1>How to Start</h1>
          <p>Borrowing is hassle-free, secure, and at no cost!</p>
        </div>
        <div className="offers__step">
          <div className="offers__step-number">
            <img src={one} className="offers__step-number" alt="one" />
          </div>
          <div className="offers__step-para">
            <h2>
              Join Us! Begin by registering an account on our website. Visit the
              ShareNCare with a valid photo ID to activate your account.
            </h2>
          </div>
          <div className="offers__step-image">
            <img src={member} alt="member" />
          </div>
        </div>
        <div className="offers__step">
        <div className="offers__step-number">
            <img src={two} className="offers__step-number" alt="two" />
          </div>
          <div className="offers__step-para">
            <h2>
              Explore inventory and borrow items hassle-free! Use our website to
              Reserve items and pick them up during operating hours.
            </h2>
          </div>
          <div className="offers__step-image">
            <img src={borrow} alt="borrow" />
          </div>
        </div>
        <div className="offers__step">
          <div className="offers__step-number">
            <img src={three} className="offers__step-number" alt="three" />
          </div>
          <div className="offers__step-para">
            <h2>
            Use & Return! Enjoy flexible borrowing times.
            Simply drop them off for the next borrower. Returns are accepted every evening.
            </h2>
          </div>
          <div className="offers__step-image">
            <img src={use} alt="use" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
