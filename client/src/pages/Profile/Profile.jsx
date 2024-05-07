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
        <div className="profile-page__wrapper">
          <h2 className="profile-page__greet">
            Thank you for using our service! {user.name}!
          </h2>
          <p className="profile-page__para">
            {" "}
            We've sent a confirmation email with reservation details to your
            registered email address.
          </p>
          <p className="profile-page__para">
            {" "}
            Our platform aims to empower borrowers by reducing barriers to
            accessing a variety of items within our community. 
          </p>{" "}
          <p className="profile-page__para">Please feel free to browse more.</p>
        </div>
      ) : (
        <div>
          <p>You don't have permission to access this page.</p>
        </div>
      )}
    </main>
  );
};

export default Profile;
