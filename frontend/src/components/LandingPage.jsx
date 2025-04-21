import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SFLogo.png";
import dev1 from "../assets/saanjhs.jpg";
import dev2 from "../assets/peytonhs.jpg";
import dev3 from "../assets/aidenhs.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const teamSectionRef = useRef(null);

  const developers = [
    {
      id: 1,
      name: "Saanj Patel",
      role: "Product Manager",
      image: dev1,
    },
    {
      id: 2,
      name: "Peyton Hecht",
      role: "Scrum Master",
      image: dev2,
    },
    {
      id: 3,
      name: "Aiden Everage",
      role: "Developer Team Member",
      image: dev3,
    },
  ];

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="StayFit Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />

      <div style={styles.navButtons}>
        <button
          onClick={() =>
            teamSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          style={styles.navButton}
        >
          About Us
        </button>
        <button onClick={() => navigate("/register")} style={styles.navButton}>
          Register
        </button>
        <button onClick={() => navigate("/login")} style={styles.navButton}>
          Login
        </button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>StayFit</h1>
        <p style={styles.subtitle}>Your personal fitness companion</p>
      </div>

      <div style={styles.curveBackground}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#3a7bd5"
            fillOpacity="0.1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div ref={teamSectionRef} style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>About Us</h2>
        <div style={styles.developersContainer}>
          {developers.map((developer) => (
            <div key={developer.id} style={styles.developerCard}>
              <div style={styles.headshotCircle}>
                <img
                  src={developer.image}
                  alt={developer.name}
                  style={styles.headshotImage}
                />
              </div>
              <h3 style={styles.developerName}>{developer.name}</h3>
              <p style={styles.developerRole}>{developer.role}</p>
            </div>
          ))}
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
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    height: "50px",
    cursor: "pointer",
    zIndex: 10,
  },
  navButtons: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    display: "flex",
    gap: "1rem",
    zIndex: 10,
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#6c757d",
    marginBottom: "2rem",
    fontWeight: "300",
  },
  curveBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    zIndex: 0,
  },
  aboutSection: {
    position: "relative",
    backgroundColor: "rgba(58, 123, 213, 0.1)",
    padding: "4rem 2rem",
    textAlign: "center",
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#3a7bd5",
    marginBottom: "3rem",
    fontFamily: "'Poppins', sans-serif",
  },
  developersContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  developerCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "250px",
  },
  headshotCircle: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
  },
  headshotImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  developerName: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#212529",
    marginBottom: "0.5rem",
  },
  developerRole: {
    fontSize: "1rem",
    color: "#6c757d",
    fontWeight: "400",
  },
};

export default LandingPage;
