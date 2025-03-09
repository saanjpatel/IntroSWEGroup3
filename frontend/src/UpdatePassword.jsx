import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Update Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label><br />
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password: </label><br />
            <input
              type="password"
              value={new_password}
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password: </label><br />
            <input
              type="password"
              value={confirm_password}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
<<<<<<< Updated upstream:frontend/src/UpdatePassword.jsx
=======
    backgroundColor: "#f0f0f0",  // optional global background color
>>>>>>> Stashed changes:frontend/src/components/UpdatePassword.jsx
  },
  card: {
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default UpdatePassword;