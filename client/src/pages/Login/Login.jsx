import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login({ setIsUserLoggedIn }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
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
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <label htmlFor="email" className="login__field">
          Email:
          <input className="login__input" type="email" name="email" />
        </label>
        <label htmlFor="password" className="login__field">
          Password:
          <input className="login__input" type="password" name="password" />
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
}
