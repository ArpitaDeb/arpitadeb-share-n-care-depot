import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const SignUp = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;

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
      navigate('/')
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
        </label>
        <label htmlFor="email" className="sign__field">
          Email:
          <input className="sign__input" type="email" name="email" />
        </label>
        <label htmlFor="password" className="sign__field">
          Password:
          <input className="sign__input" type="password" name="password" />
        </label>
        <label htmlFor="phone" className="sign__field">
          Phone:
          <input className="sign__input" type="tel" name="phone" />
        </label>
        <button className="sign__button" type="submit">
          SignUp
        </button>
        <div className="signup">
          <p>
            Already have an account?{" "}
            <Link to={"/"}>
              login<span>!</span>
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
export default SignUp;