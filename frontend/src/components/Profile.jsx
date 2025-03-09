import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const handleUpdatePassword = () => {
    navigate("/update-password");
  };

  const confirmDelete = () => {
    setShowDeletePopup(false);
    navigate("/");
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
        <button onClick={handleUpdatePassword} style={styles.updateButton}>
          Update Password
        </button>
        <button onClick={handleDeleteAccount} style={styles.deleteButton}>
          Delete Account
        </button>
      </div>
      <h1>Profile</h1>

      {/* Delete Account Confirmation Popup */}
      {showDeletePopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDelete} style={styles.confirmButton}>
              Confirm
            </button>
            <button onClick={cancelDelete} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
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
    position: "relative",
  },
  header: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "10px",
  },
  logoutButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  updateButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",  // Green color for update password
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  deleteButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s, color 0.3s",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  confirmButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#ff4444",
    color: "#fff",
    cursor: "pointer",
    margin: "0 10px",
  },
  cancelButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    margin: "0 10px",
  },
};

export default Profile;