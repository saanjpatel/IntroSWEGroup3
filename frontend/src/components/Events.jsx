import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const location = "Gainesville, FL";
  const query = "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("eventbrite_token");
        if (!token) {
          setError("Not authenticated with Eventbrite. Please authenticate.");
          return;
        }
        const response = await axios.get("https://www.eventbriteapi.com/v3/events/search/", {
          params: { "location.address": location, q: query },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.data && Array.isArray(response.data.events)) {
          if (response.data.events.length > 0) {
            setEvents(response.data.events);
            setError("");
          } else {
            setEvents([]);
            setError("No events found.");
          }
        } else if (response.data.error) {
          setEvents([]);
          setError(response.data.error);
        } else {
          setEvents([]);
          setError("Unexpected response format.");
        }
      } catch (err) {
        setError(
          err.response && err.response.data
            ? err.response.data.error || "Error fetching events."
            : "An unexpected error occurred while fetching events."
        );
      }
    };

    fetchEvents();
  }, [location, query]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Campus Events</h1>
        <p style={styles.headerSubtitle}>
          Discover exciting events happening on campus in Gainesville.
        </p>
      </header>
      <main style={styles.main}>
        {error ? (
          <p style={styles.errorText}>{error}</p>
        ) : events.length === 0 ? (
          <p style={styles.loadingText}>Loading events...</p>
        ) : (
          <div style={styles.grid}>
            {events.map((event) => (
              <div key={event.id} style={styles.card}>
                <h2 style={styles.eventTitle}>
                  {event.name && event.name.text ? event.name.text : "Untitled Event"}
                </h2>
                <p style={styles.eventDesc}>
                  {event.description && event.description.text
                    ? event.description.text.substring(0, 120) + "..."
                    : "No description available."}
                </p>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.button}
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #ECE9E6, #FFFFFF)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "2rem 1rem",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
  },
  headerTitle: {
    fontSize: "2.5rem",
    margin: "0.5rem 0"
  },
  headerSubtitle: {
    fontSize: "1.2rem",
    margin: "0.5rem 0"
  },
  main: {
    flex: 1,
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  loadingText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#555",
    marginTop: "2rem"
  },
  errorText: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginTop: "2rem",
    color: "red"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  eventTitle: {
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
    color: "#007bff"
  },
  eventDesc: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "1rem",
    flexGrow: 1
  },
  button: {
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold"
  }
};

export default Events;