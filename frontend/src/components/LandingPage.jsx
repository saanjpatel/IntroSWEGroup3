import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/register")} style={styles.linkButton}>
          Register
        </button>
        <span style={styles.separator}>|</span>
        <button onClick={() => navigate("/login")} style={styles.linkButton}>
          Login
        </button>
      </div>
      <h1 style={styles.title}>StayFit</h1>
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
  header: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  title: {
    fontSize: "3rem",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  separator: {
    margin: "0 10px",
    color: "#007bff",
  },
};

export default LandingPage;