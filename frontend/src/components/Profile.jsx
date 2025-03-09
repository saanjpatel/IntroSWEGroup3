import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1>Profile</h1>
      <p>
        Forgot your password?{" "}
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
    color: "#646cff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Profile;