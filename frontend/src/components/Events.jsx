import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Events = () => {
  // States for events, errors, and search input.
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // Keyword search input

  const navigate = useNavigate();

  // Default parameters for the API call.
  const countryCode = "US";
  const radius = ""; // Optionally use if needed.
  const unit = "miles";
  const size = "20";
  const page = "0";

  // Function to fetch events with an optional keyword filter.
  const fetchEvents = async (keywordParam = "") => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/tm-events", {
        params: { countryCode, keyword: keywordParam, radius, unit, size, page },
        withCredentials: false
      });
      // Ticketmaster returns events in _embedded.events if available.
      if (response.data && response.data._embedded && Array.isArray(response.data._embedded.events)) {
        setEvents(response.data._embedded.events);
        setError("");
      } else if (response.data.fault) {
        setEvents([]);
        setError(response.data.fault.faultstring || "Error fetching events.");
      } else {
        setEvents([]);
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data.fault?.faultstring || "Error fetching events."
          : "An unexpected error occurred while fetching events."
      );
    }
  };

  // Initial fetch without any keyword filter.
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle the search form submission.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents(searchKeyword.trim());
  };

  // Back button handler to navigate to the profile page.
  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button onClick={handleBack} style={styles.backButton}>Back</button>
        </div>
        <div style={styles.headerCenter}>
          <h1 style={styles.headerTitle}>Local Events</h1>
        </div>
      </header>

      {/* Search Form */}
      <div style={styles.searchContainer}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter a keyword (e.g., 5k, concert, festival)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      </div>

      {/* Display error message if any */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display events in a table view */}
      {events.length === 0 && !error ? (
        <p style={styles.loadingText}>Loading events...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Event Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Venue</th>
              <th style={styles.th}>Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const eventDate =
                event.dates && event.dates.start && event.dates.start.localDate
                  ? event.dates.start.localDate
                  : "N/A";
              const venue =
                event._embedded &&
                event._embedded.venues &&
                event._embedded.venues[0] &&
                event._embedded.venues[0].name
                  ? event._embedded.venues[0].name
                  : "N/A";

              return (
                <tr key={event.id} style={styles.tr}>
                  <td style={styles.td}>{event.name || "Untitled Event"}</td>
                  <td style={styles.td}>{eventDate}</td>
                  <td style={styles.td}>{venue}</td>
                  <td style={styles.td}>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #ECE9E6, #FFFFFF)",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem"
  },
  headerLeft: {
    flex: "0 0 auto"
  },
  backButton: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#e9ecef",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease"
  },
  headerCenter: {
    flex: "1 1 auto",
    textAlign: "center"
  },
  headerTitle: {
    fontSize: "2.5rem",
    margin: 0
  },
  searchContainer: {
    margin: "1rem 0",
    textAlign: "center"
  },
  searchInput: {
    padding: "0.5rem",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "0.5rem",
    fontSize: "1rem"
  },
  searchButton: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#20c997",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem"
  },
  errorText: {
    color: "red",
    textAlign: "center"
  },
  loadingText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#555",
    marginTop: "2rem"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem"
  },
  th: {
    border: "1px solid #ddd",
    padding: "0.75rem",
    backgroundColor: "#f2f2f2",
    textAlign: "left"
  },
  tr: {
    borderBottom: "1px solid #ddd"
  },
  td: {
    padding: "0.75rem",
    border: "1px solid #ddd"
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold"
  }
};

export default Events;