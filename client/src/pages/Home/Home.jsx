import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.scss";
const apiURL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="isLoading">Loading...</div>
    </>
  );
};

export default Home;
