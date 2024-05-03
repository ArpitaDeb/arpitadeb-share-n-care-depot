import "./Profile.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const apiURL = process.env.REACT_APP_API_URL;

const Profile = ({ setIsUserLoggedIn }) => {
  const { userId, userRole, logOut } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${apiURL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    fetchProfile();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <>Loading user details...</>;
  }

  return (
    <main className="profile-page">
      {userRole === "admin" || userRole === "user" ? (
        <>
          <h2>Welcome back, {user.name}!</h2>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("userId");
              localStorage.removeItem("userRole");
              setIsUserLoggedIn(false);
            }}
          >
            Log out
          </button>{" "}
        </>
      ) : (
        <div>
          <p>You don't have permission to access this page.</p>
        </div>
      )}
    </main>
  );
};

export default Profile;
