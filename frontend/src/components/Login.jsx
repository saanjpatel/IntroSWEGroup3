import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
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
      <img 
        src={logo} 
        alt="StayFit Logo" 
        style={styles.logo} 
        onClick={() => navigate("/")}
      />

      <div style={styles.content}>
        <h1 style={styles.title}>StayFit</h1>
        
        <div style={styles.formGroup}>
          {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{...styles.input, paddingRight: '40px'}}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          <button onClick={handleLogin} style={styles.primaryButton}>
            Login
          </button>
          
          <button onClick={() => navigate("/register")} style={styles.secondaryButton}>
            Sign Up
          </button>
        </div>
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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 8rem)",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
  passwordContainer: {
    position: "relative",
    width: "107%",
    display: "flex",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#6c757d",
    padding: "8px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    width: "107%",
    padding: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#20c997",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#12b886",
      transform: "translateY(-1px)",
    },
  },
  secondaryButton: {
    width: "107%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.9rem",
    textAlign: "center",
    margin: "0 0 1rem 0",
  },
};

export default Login;