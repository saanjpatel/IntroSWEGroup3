import React from "react";
import { useNavigate } from "react-router-dom";

const Tracking = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/profile")} style={styles.backButton}>
        ← Back to Profile
      </button>
      <h1 style={styles.title}>Fitness Goals Tracking</h1>
      <p style={styles.placeholder}>Fitness tracking functionality will be added here.</p>
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
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  placeholder: {
    fontSize: "1.2rem",
    color: "#666",
  },
};

export default Tracking;