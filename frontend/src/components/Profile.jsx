import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [logOutMsg, setLogOutMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/logout", {
        email: localStorage.getItem("email"),
      });
      if (response.status === 200) {
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setLogOutMsg(error.response.data.error || "Logout error");
      } else {
        setLogOutMsg("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const handleUpdatePassword = () => {
    navigate("/update-password");
  };

  const confirmDelete = async () => {
    setShowDeletePopup(false);
    try {
      const response = await axios.post("http://127.0.0.1:5000/delete", {
        email: localStorage.getItem("email"),
      });
      if (response.status === 200) {
        localStorage.removeItem("email");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setDeleteMsg(error.response.data.error || "Deletion error");
      } else {
        setDeleteMsg("An unexpected error occurred.");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div style={styles.container}>
      {/* Top Section with Light Grey Background */}
      <div style={styles.topSection}>
        <div style={styles.buttonGroup}>
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
      </div>

      {/* Profile Section */}
      <div style={styles.profileContent}>
        <div style={styles.profileSection}>
          <div style={styles.profilePicCircle}>Profile Pic</div>
          <div style={styles.namePlaceholder}>John Doe</div>
        </div>

        {/* Tracking Button */}
        <button onClick={() => navigate("/tracking")} style={styles.trackingButton}>
          Tracking
        </button>
      </div>

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
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  topSection: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: "10px",
    backgroundColor: "#e0e0e0", // Light grey background
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
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
    backgroundColor: "#28a745", // Green color for update password
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
  profileContent: {
    marginTop: "80px", // Space for the top section
    padding: "20px",
    width: "100%",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  profilePicCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    color: "#000",
  },
  namePlaceholder: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  trackingButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
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
    zIndex: 1001,
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