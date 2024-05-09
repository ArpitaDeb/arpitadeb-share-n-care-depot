import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isValidEmail } from "../../utils/validator";
import "./Login.scss";

const apiURL = process.env.REACT_APP_API_URL;
const Login = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    let formErrors = {};
    let hasErrors = false;

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

    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userRole', response.data.role);
   
      setIsUserLoggedIn(true);
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <label htmlFor="email" className="login__field">
          Email:
          <input className="login__input" type="email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label htmlFor="password" className="login__field">
          Password:
          <input className="login__input" type="password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <button className="login__button" type="submit">Log in</button>
        <div className="signup">
          <p>
            Doesn&apos;t have an account?{" "}
            <Link to={'/signup'}>
              Sign Up<span>!</span>
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
