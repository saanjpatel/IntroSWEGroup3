import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tracking = ({ exercises, setExercises }) => {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Sort exercises: date (newest first) → name (A-Z) → time (ascending)
  const sortedExercises = [...exercises].sort((a, b) => {
    // First sort by date (newest first)
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    
    // If dates are equal, sort by exercise name (A-Z)
    if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
    if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
    
    // If names are equal, sort by duration (shortest first)
    return parseInt(a.time) - parseInt(b.time);
  });

  const handleAddExercise = () => {
    if (exerciseType && exerciseTime) {
      const newExercise = {
        id: Date.now(),
        type: exerciseType.trim(),
        time: exerciseTime,
        date: date
      };
      setExercises([...exercises, newExercise]);
      setExerciseType("");
      setExerciseTime("");
    }
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/profile")} style={styles.backButton}>
        ← Back to Profile
      </button>
      <h1 style={styles.title}>Fitness Goals Tracking</h1>
      
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Exercise Type (e.g., Running)"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={exerciseTime}
          onChange={(e) => setExerciseTime(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddExercise} style={styles.addButton}>
          Add Exercise
        </button>
      </div>

      {sortedExercises.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date ▼</th>
                <th style={styles.th}>Exercise</th>
                <th style={styles.th}>Duration (min)</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExercises.map((exercise) => (
                <tr key={exercise.id} style={styles.tr}>
                  <td style={styles.td}>{exercise.date}</td>
                  <td style={styles.td}>{exercise.type}</td>
                  <td style={styles.td}>{exercise.time}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => handleDeleteExercise(exercise.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.placeholder}>No exercises logged yet. Add your first exercise above!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "500px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  addButton: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  tableContainer: {
    width: "100%",
    maxWidth: "800px",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#007bff",
    color: "#fff",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  deleteButton: {
    padding: "5px 10px",
    borderRadius: "3px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  placeholder: {
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "20px",
  },
};

export default Tracking;