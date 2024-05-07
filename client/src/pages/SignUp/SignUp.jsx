import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone } from "../../utils/validator";
import "./SignUp.scss";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const SignUp = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;

    let formErrors = {};
    let hasErrors = false;

    if (!name) {
      formErrors.name = "Username is required";
      hasErrors = true;
    }

    if (!email) {
      formErrors.email = "Email is required";
      hasErrors = true;
    } else if (!isValidEmail(email)) {
      formErrors.email = "Invalid email format";
      hasErrors = true;
    }

    if (!password) {
      formErrors.password = "Password is required";
      hasErrors = true;
    }

    if (!phone) {
      formErrors.phone = "Phone is required";
      hasErrors = true;
    } else if (!isValidPhone(phone)) {
      formErrors.phone = "Invalid phone number";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/auth/signup`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
      });
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userRole', response.data.role);
      setIsUserLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="sign-page">
      <form className="sign" onSubmit={handleSubmit}>
        <h1 className="sign__title">SignUp</h1>
        <label htmlFor="name" className="sign__field">
          Username:
          <input className="sign__input" type="text" name="name" />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label htmlFor="email" className="sign__field">
          Email:
          <input className="sign__input" type="email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label htmlFor="password" className="sign__field">
          Password:
          <input className="sign__input" type="password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <label htmlFor="phone" className="sign__field">
          Phone:
          <input className="sign__input" type="tel" name="phone" />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>
        <button className="sign__button" type="submit">
          SignUp
        </button>
        <div className="signup">
          <p>
            Already have an account?{" "}
            <Link to={"/login"}>
              login<span>!</span>
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
