// src/components/Weather.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.homeButton}>
        🏠 Home
      </button>
      <h1 style={styles.title}>Current Weather</h1>
      <div style={styles.weatherCard}>
        <p style={styles.weatherInfo}>Temperature: 25°C</p>
        <p style={styles.weatherInfo}>Weather: Sunny</p>
        <p style={styles.weatherInfo}>Humidity: 60%</p>
      </div>
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
    position: "relative",
  },
  homeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  weatherCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  weatherInfo: {
    fontSize: "1.2rem",
    margin: "10px 0",
  },
};

export default Weather;