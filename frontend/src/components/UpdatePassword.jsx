import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import logo from "../src/assets/SFLogo.png"; // Make sure to add your logo file
=======
>>>>>>> Stashed changes

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
<<<<<<< Updated upstream
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
=======
>>>>>>> Stashed changes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      new_password,
      confirm_password,
    };

    try {
      const response = await fetch("http://localhost:5000/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password updated successfully! You can now log in with your new password.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Unexpected Error. Please try again");
      console.error("Update password error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.container}>
<<<<<<< Updated upstream
      <img 
        src={logo} 
        alt="StayFit Logo" 
        style={styles.logo} 
        onClick={() => navigate("/")}
      />

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Update Password</h2>
          
          {message && (
            <p style={message.includes("successfully") ? styles.successMessage : styles.errorMessage}>
              {message}
            </p>
          )}
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={new_password}
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirm_password}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.primaryButton}>
                Reset Password
              </button>
              <button 
                type="button" 
                onClick={handleCancel} 
                style={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
=======
      <div style={styles.card}>
        <h2>Update Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <br />
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password: </label>
            <br />
            <input
              type="password"
              value={new_password}
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password: </label>
            <br />
            <input
              type="password"
              value={confirm_password}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" style={styles.button}>
            Reset Password
          </button>
          <button type="button" onClick={handleCancel} style={styles.button}>
            Cancel
          </button>
        </form>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

const styles = {
  container: {
<<<<<<< Updated upstream
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
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 4rem)",
  },
  card: {
    padding: "2.5rem",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#212529",
    marginBottom: "1.5rem",
    textAlign: "center",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#495057",
  },
  input: {
    padding: "0.9rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    width: "100%",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#3a7bd5",
      boxShadow: "0 0 0 3px rgba(58, 123, 213, 0.1)",
    },
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    padding: "0.9rem",
    paddingRight: "px", // Space for eye button
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    width: "100%",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      borderColor: "#3a7bd5",
      boxShadow: "0 0 0 3px rgba(58, 123, 213, 0.1)",
    },
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#6c757d",
    padding: "0",
    margin: "0",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  primaryButton: {
    padding: "0.9rem 1.5rem",
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
  secondaryButton: {
    padding: "0.9rem 1.5rem",
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
  successMessage: {
    color: "#28a745",
    backgroundColor: "#e8f5e9",
    padding: "0.75rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  errorMessage: {
    color: "#dc3545",
    backgroundColor: "#fce8e6",
    padding: "0.75rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    textAlign: "center",
=======
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
  card: {
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
>>>>>>> Stashed changes
  },
};

export default UpdatePassword;