import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../../assets/images/hero.png";
import member from "../../assets/images/member.jpg";
import hand_icon from "../../assets/images/hand_icon.png";
import arrow_icon from "../../assets/images/arrow.png";

import "./Home.scss";
import StartStep from "../../components/StartStep/StartStep";
const apiURL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/inventory");
  };
  const startSteps = {
    step1: "Join Us! Begin by registering an account on our website. Visit the ShareNCare with a valid photo ID to activate your account.",
    step2: "Explore inventory and borrow items hassle-free! Use our website to Reserve items and pick them up during operating hours.",
    step3: "Use & Return! Enjoy flexible borrowing times. Simply drop them off for the next borrower. Returns are accepted every evening",
  };
  return (
    <>
      <div className="hero">
        <div className="hero__left">
          <h2>Purchasing is an option for certain individuals,</h2>
          <div>
            <div className="hero__hand-icon">
              <p>While borrowing is accessible to everyone.</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>Discover the item you desire,</p>
            <p>Borrow what you require.</p>
          </div>
          <Link to="/inventory">
            <div className="hero__latest-btn">
              <div>Browse Collection</div>
              <img src={arrow_icon} alt="" />
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
          <div className="offers__step-left">
          <h2>Join Us! Begin by registering an account on our website. Visit the ShareNCare with a valid photo ID to activate your account.
          </h2>
          </div>
          <div className="offers__step-right">
            <img src={member} alt="member" />
          </div>
        </div>
      </div>
      <div className="newsletter">
        <h2></h2>
        <p></p>
        <div>
          <StartStep />
        </div>
      </div>
    </>
  );
};

export default Home;
