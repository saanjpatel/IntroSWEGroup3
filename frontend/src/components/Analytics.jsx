import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [analyticsError, setAnalyticsError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/checkanalytics", {
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
  }, );

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
        <h1 style={styles.title}>Fitness Analytics</h1>

        {analyticsError && <p style={styles.errorText}>{analyticsError}</p>}

        {data.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date ▼</th>
                  <th style={styles.th}>Exercise</th>
                  <th style={styles.th}>Duration (min) Completed</th>
                  <th style={styles.th}>Duration (min) Goal</th>
                </tr>
              </thead>
              <tbody>
                {data.map((analytic, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{analytic[4]}</td>
                    <td style={styles.td}>{analytic[2]}</td>
                    <td style={styles.td}>{analytic[3]}</td>
                    <td style={styles.td}>{analytic[8]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={styles.placeholder}>No exercises or goals logged yet for analytics. </p>
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

export default Analytics;