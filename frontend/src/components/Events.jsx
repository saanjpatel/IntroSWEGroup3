import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  // States for events, errors, and the search input.
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // Default parameters for the API call.
  const countryCode = "US";
  const keyword = "";
  const radius = ""; // Optionally use if needed.
  const unit = "miles";
  const size = "20";
  const page = "0";

  // Function to fetch events with an optional city parameter.
  const fetchEvents = async (cityParam = "") => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/tm-events", {
        params: { countryCode, keyword, radius, unit, size, page, city: cityParam },
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

  // Initial fetch without a city filter.
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle the search form submission and trigger a new fetch.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents(searchCity.trim());
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Local Events</h1>
        <p style={styles.headerSubtitle}>
          Discover local events near you in the United States.
        </p>
      </header>

      {/* Search Form */}
      <div style={styles.searchContainer}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Enter a city (e.g., New York)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      </div>

      {/* Display Error If Any */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display Events in a Table View */}
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
              // Format the event date.
              const eventDate =
                event.dates && event.dates.start && event.dates.start.localDate
                  ? event.dates.start.localDate
                  : "N/A";
              // Get the venue name if available.
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
                    <a href={event.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
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