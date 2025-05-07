import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SFLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, 
  faFlagCheckered, 
  faChartColumn 
} from "@fortawesome/free-solid-svg-icons";

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
    navigate("/events");
  };

  const handleReservedEvents = () => {
    navigate("/reservations");
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
          <button onClick={handleViewEvents} style={styles.navButton}>
            View Ticketmaster Events
          </button>
          <button onClick={handleReservedEvents} style={styles.navButton}>
            Reserved Events
          </button>
          <button onClick={handleDeleteAccount} style={styles.deleteButton}>
            Delete Account
          </button>
        </div>
      </div>

      <div style={styles.profileInfoSection}>
        <div style={styles.profilePicCircle}>
          <span style={styles.profilePicText}>Profile Pic</span>
        </div>
        <h2 style={styles.name}>
          {localStorage.getItem("email") || "User"}
        </h2>
      </div>

      <div style={styles.actionsSection}>
        <h3 style={styles.sectionTitle}>Your Dashboard</h3>
        <div style={styles.actionButtons}>
          <button
            onClick={() => navigate("/tracking")}
            style={styles.primaryButton}
          >
            <FontAwesomeIcon icon={faChartLine} style={styles.buttonIcon} />
            <span>Tracking</span>
          </button>
          <button
            onClick={() => navigate("/goal")}
            style={styles.primaryButton}
          >
            <FontAwesomeIcon icon={faFlagCheckered} style={styles.buttonIcon} />
            <span>Goals</span>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            style={styles.primaryButton}
          >
            <FontAwesomeIcon icon={faChartColumn} style={styles.buttonIcon} />
            <span>Analytics</span>
          </button>
        </div>
      </div>

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
    alignItems: "center",
    marginLeft: "auto",
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
  profileInfoSection: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "3rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e9ecef",
  },
  profilePicCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#e9ecef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#6c757d",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  profilePicText: {
    fontSize: "0.8rem",
    color: "#6c757d",
    textAlign: "center",
    padding: "0 5px",
    lineHeight: "1.2",
    wordBreak: "break-word",
  },
  name: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#212529",
    margin: 0,
  },
  actionsSection: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#495057",
    marginBottom: "1.5rem",
  },
  actionButtons: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "1.5rem 2rem",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#20c997",
    color: "white",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    minWidth: "150px",
  },
  buttonIcon: {
    fontSize: "1.8rem",
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