import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";

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

  const handleViewEvents = () => {
    // Navigate to the events page that uses Ticketmaster API data.
    navigate("/events");
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
      {/* Header with logo and navigation buttons */}
      <div style={styles.header}>
        <img
          src={logo}
          alt="StayFit Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
        <div style={styles.navButtons}>
          <button onClick={handleLogout} style={styles.navButton}>
            Logout
          </button>
          <button onClick={handleUpdatePassword} style={styles.navButton}>
            Update Password
          </button>
          <button onClick={handleDeleteAccount} style={styles.deleteButton}>
            Delete Account
          </button>
          <button onClick={handleViewEvents} style={styles.navButton}>
            View Ticketmaster Events
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div style={styles.profileSection}>
        <div style={styles.profilePicCircle}>Profile Pic</div>
        <div style={styles.profileInfo}>
          <h2 style={styles.name}>
            {localStorage.getItem("email") || "User"}
          </h2>
          <button onClick={() => navigate("/tracking")} style={styles.primaryButton}>
            Tracking
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Popup */}
      {showDeletePopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h3 style={styles.popupTitle}>Confirm Account Deletion</h3>
            <p style={styles.popupText}>
              Are you sure you want to permanently delete your account?
            </p>
            <div style={styles.popupButtons}>
              <button onClick={cancelDelete} style={styles.secondaryButton}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={styles.dangerButton}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    gap: "1rem",
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
  },
  deleteButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginTop: "2rem",
  },
  profilePicCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#e9ecef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#6c757d",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  name: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#212529",
    margin: 0,
  },
  primaryButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#20c997",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
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
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  popupTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#212529",
  },
  popupText: {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "2rem",
  },
  popupButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  secondaryButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  dangerButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};

export default Profile;