import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";

const Goal = ({ goals, setGoals }) => {
  const navigate = useNavigate();
  const [goalType, setGoalType] = useState("");
  const [goalTime, setGoalTime] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);
  const [goalError, setGoalError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/checkgoal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localStorage.getItem("email")),
    }).then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    );
  }, []);

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return parseInt(a.time) - parseInt(b.time);
  });

  const handleAddGoal = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/addgoal", {
        email: localStorage.getItem("email"),
        goalType,
        goalTime,
        date
      });
      const newData = await fetch("http://127.0.0.1:5000/checkgoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localStorage.getItem("email")),
      }).then(res => res.json());
      setData(newData);
      setGoalType("");
      setGoalTime("");
    } catch (error) {
      if (error.response && error.response.data) {
        setGoalError(error.response.data.error || "Goal Error");
      }
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete("http://127.0.0.1:5000/deletegoal", {
        data: {id: id}
      });
      const newData = await fetch("http://127.0.0.1:5000/checkgoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localStorage.getItem("email")),
      }).then(res => res.json());
      setData(newData);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src={logo} 
        alt="StayFit Logo" 
        style={styles.logo} 
        onClick={() => navigate("/")}
      />

      <div style={styles.navButtons}>
        <button onClick={() => navigate("/profile")} style={styles.navButton}>
          ← Back to Profile
        </button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Fitness Goals</h1>
        
        {goalError && <p style={styles.errorText}>{goalError}</p>}
        
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Goal Type (e.g., Running)"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={goalTime}
            onChange={(e) => setGoalTime(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddGoal} style={styles.primaryButton}>
            Add Goal
          </button>
        </div>

        {data.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date ▼</th>
                  <th style={styles.th}>Goal</th>
                  <th style={styles.th}>Duration (min)</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((goal, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{goal[4]}</td>
                    <td style={styles.td}>{goal[2]}</td>
                    <td style={styles.td}>{goal[3]}</td>
                    <td style={styles.td}>
                      <button 
                        onClick={() => handleDeleteGoal(goal[0])}
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
          <p style={styles.placeholder}>No goals logged yet. Add your first goal above!</p>
        )}
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
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e9ecef",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#dee2e6",
    },
  },
  content: {
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  inputGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    transition: "border-color 0.2s",
    ":focus": {
      outline: "none",
      borderColor: "#3a7bd5",
      boxShadow: "0 0 0 3px rgba(58, 123, 213, 0.1)",
    },
  },
  primaryButton: {
    padding: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#20c997",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#12b886",
      transform: "translateY(-1px)",
    },
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "#3a7bd5",
    color: "#fff",
    fontWeight: "600",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #e9ecef",
  },
  tr: {
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#c82333",
    },
  },
  placeholder: {
    fontSize: "1.2rem",
    color: "#6c757d",
    marginTop: "2rem",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.9rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

export default Goal;