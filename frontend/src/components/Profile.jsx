import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1>Profile</h1>
      <p>
<<<<<<< Updated upstream:frontend/src/Profile.jsx
        Update your password?{" "}
=======
        Forgot your password?{" "}
>>>>>>> Stashed changes:frontend/src/components/Profile.jsx
        <Link to="/update-password" style={styles.link}>
          Reset Password
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  link: {
<<<<<<< Updated upstream:frontend/src/Profile.jsx
    color: "#646cff", // adjust to your theme's color if needed
=======
    color: "#646cff",
>>>>>>> Stashed changes:frontend/src/components/Profile.jsx
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Profile;