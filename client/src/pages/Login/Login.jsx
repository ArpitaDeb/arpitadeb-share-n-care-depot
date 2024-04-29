import "./Login.scss";
import axios from "axios";

export default function Login({ setIsUserLoggedIn }) {
  const handleSubmit = async (event) => {
    // prevent default behaviour
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log(username, password);

    try {
      // send username/password in a POST request to the API
      const response = await axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      });
      console.log(response);

      localStorage.setItem("authToken", response.data);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>

        <label className="login__field">
          Username:
          <input className="login__input" type="text" name="username" />
        </label>

        <label className="login__field">
          Password:
          <input className="login__input" type="password" name="password" />
        </label>

        <button className="login__button">Log in</button>
      </form>
    </main>
  );
}
