import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password === confirmPassword) {
      // For now, just navigate to the login page
      navigate("/login");
      setPasswordError(""); // Clear any previous error
    } else {
      setPasswordError("Passwords do not match!"); // Set error message
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>StayFit</h1>
      <input
        type="email"
        placeholder="Add Your @ufl.edu Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
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
          type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
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
      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>
      <button onClick={() => navigate("/login")} style={styles.linkButton}>
        Already Have an Account?
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
  passwordContainer: {
    position: "relative",
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
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    margin: "5px 0",
  },
};

export default Register;