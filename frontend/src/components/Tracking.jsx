import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Tracking = () => {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/profile")} style={styles.backButton}>
        ← Back to Profile
      </button>
      <h1 style={styles.title}>Fitness Goals Tracking</h1>
      <p style={styles.placeholder}>Fitness tracking functionality will be added here.</p>
      <input
        type="exercise type"
        placeholder="Exercise Type"
        value={exerciseType}
        onChange={(e) => setExerciseType(e.target.value)}
        style={styles.input}
      />
      <input
        type="exercise time"
        placeholder="Exercise Time (In Minutes)"
        value={exerciseTime}
        onChange={(e) => setExerciseTime(e.target.value)}
        style={styles.input}
      />
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
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default Tracking;