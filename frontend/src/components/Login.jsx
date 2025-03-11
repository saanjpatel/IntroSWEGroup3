import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // POST request to Flask backend
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('email', email);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error || "Login error");
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>StayFit</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      <button onClick={() => navigate("/register")} style={styles.linkButton}>
        Sign Up
      </button>
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
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "320px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    margin: "5px 0",
  },
};

export default Login;
