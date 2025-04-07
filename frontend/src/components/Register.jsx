import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png"; // Adjust path to your logo file

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async() => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/register", {
          email,
          password,
          confirmPassword
        });
        const bool_end_with_ufl = email.endsWith("@ufl.edu")
        if (password === confirmPassword && bool_end_with_ufl && response.status === 200) {
          navigate("/login");
          setPasswordError("");
        }
        else if (password !== confirmPassword && !bool_end_with_ufl) {
          setPasswordError("Passwords do not match and email does not end with @ufl.edu!");
        }
        else if (password !== confirmPassword) {
          setPasswordError("Passwords do not match!");
        }
        else if (!bool_end_with_ufl) {
          setPasswordError("Email does not end with @ufl.edu!");
        }
    } catch (error){
      if (error.response && error.response.data) {
        setPasswordError(error.response.data.error || "Registration Error")
      }
      else {
        setPasswordError("An unexpected error occurred.")
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Logo in top left */}
      <img 
        src={logo} 
        alt="StayFit Logo" 
        style={styles.logo} 
        onClick={() => navigate("/")}
      />

      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.title}>StayFit</h1>
        
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Add Your @ufl.edu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          <div style={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          
          <button onClick={handleRegister} style={styles.primaryButton}>
            Register
          </button>
          
          <button onClick={() => navigate("/login")} style={styles.secondaryButton}>
            Already Have an Account?
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
    padding: "8px", // Added padding for better click area
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
    textAlign: "left",
    margin: "-0.5rem 0 0.5rem 0",
  },
};

export default Register;