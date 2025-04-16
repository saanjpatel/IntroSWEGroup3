import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8 || password.length > 24) {
      errors.push("8-24 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("one number");
    }

    if (errors.length > 0) {
      return `Password must contain: ${errors.join(", ")}`;
    }
    return "";
  };

  const handleRegister = async () => {
    const bool_end_with_ufl = email.endsWith("@ufl.edu");
    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (!bool_end_with_ufl) {
      setPasswordError("Email does not end with @ufl.edu!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        email,
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        navigate("/login");
        setPasswordError("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setPasswordError(error.response.data.error || "Registration Error");
      } else {
        setPasswordError("An unexpected error occurred.");
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
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear error when user starts typing
                if (passwordError) setPasswordError("");
              }}
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

          <div style={styles.passwordRequirements}>
            <p style={styles.requirementTitle}>Password must contain:</p>
            <ul style={styles.requirementList}>
              <li style={styles.requirementItem}>8-24 characters</li>
              <li style={styles.requirementItem}>At least one uppercase letter (A-Z)</li>
              <li style={styles.requirementItem}>At least one lowercase letter (a-z)</li>
              <li style={styles.requirementItem}>At least one number (0-9)</li>
            </ul>
          </div>

          <button onClick={handleRegister} style={styles.primaryButton}>
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            style={styles.secondaryButton}
          >
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
    textAlign: "left",
    margin: "-0.5rem 0 0.5rem 0",
  },
  passwordRequirements: {
    width: "107%",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "left",
  },
  requirementTitle: {
    fontWeight: "600",
    color: "#495057",
    marginBottom: "0.5rem",
  },
  requirementList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  requirementItem: {
    color: "#6c757d",
    fontSize: "0.9rem",
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    ":before": {
      content: "'•'",
      marginRight: "0.5rem",
      color: "#6c757d",
    },
  },
};

export default Register;