import "./Profile.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);

  // useEffect (as soon as the component mounts)
  useEffect(() => {
    const fetchProfile = async () => {
      // get the token from local storage
      const token = localStorage.getItem("authToken");

      // make a GET request to /profile
      // add it as a header
      const response = await axios.get("http://localhost:8080/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      setUser(response.data);
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <>Loading user details...</>;
  }

  return (
    <main className="profile-page">
      <h2>Welcome back, {user.name}!</h2>

      <p>You have {user.likes} likes.</p>

      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("authToken");
          setIsUserLoggedIn(false);
        }}
      >
        Log out
      </button>
    </main>
  );
}
