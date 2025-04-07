import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SFLogo.png"; // Adjust path to your logo file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Logo in top left */}
      <img 
        src={logo} 
        alt="StayFit Logo" 
        style={styles.logo} 
        onClick={() => navigate("/")}
      />

      {/* Navigation buttons in top right */}
      <div style={styles.navButtons}>
        <button onClick={() => navigate("/weather")} style={styles.navButton}>
          Check Weather
        </button>
        <button onClick={() => navigate("/register")} style={styles.navButton}>
          Register
        </button>
        <button onClick={() => navigate("/login")} style={styles.navButton}>
          Login
        </button>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.title}>StayFit</h1>
        <p style={styles.subtitle}>Your personal fitness companion</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    height: "50px",
    cursor: "pointer",
  },
  navButtons: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    display: "flex",
    gap: "1rem",
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#e9ecef",
      color: "#212529",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 8rem)",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#6c757d",
    marginBottom: "2rem",
    fontWeight: "300",
  },
};

export default LandingPage;