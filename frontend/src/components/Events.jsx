import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Events = () => {
  // States for events, errors, and search input.
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // Keyword search input
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Default parameters for the API call.
  const countryCode = "US";
  const radius = ""; // Optionally use if needed.
  const unit = "miles";
  const size = "20";

  // Function to fetch events with an optional keyword filter and page number.
  const fetchEvents = async (keywordParam = "", pageNum = 0) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/tm-events", {
        params: {
          countryCode,
          keyword: keywordParam,
          radius,
          unit,
          size,
          page: pageNum
        },
        withCredentials: false
      });
      // If events data exists, update the events state.
      if (response.data && response.data._embedded && Array.isArray(response.data._embedded.events)) {
        setEvents(response.data._embedded.events);
        setError("");
        // If the API provides page info, update currentPage and totalPages.
        if (response.data.page) {
          setCurrentPage(response.data.page.number);
          setTotalPages(response.data.page.totalPages);
        }
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
    // When a new search is submitted, start at page 0.
    fetchEvents(searchKeyword.trim(), 0);
  };

  // Handle page change via pagination controls.
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    fetchEvents(searchKeyword.trim(), pageNum);
  };

  // Render a dynamic range of page buttons.
  const renderPageButtons = () => {
    const maxButtons = 7; // Adjust how many page buttons to display at a time.
    let start = Math.max(currentPage - Math.floor(maxButtons / 2), 0);
    let end = start + maxButtons;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons, 0);
    }
    const buttons = [];
    for (let i = start; i < end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            ...styles.pageButton,
            backgroundColor: i === currentPage ? "#007bff" : "#fff",
            color: i === currentPage ? "#fff" : "#007bff"
          }}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  // Back button handler to navigate to the profile page.
  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button onClick={handleBack} style={styles.backButton}>
            Back
          </button>
        </div>
        <div style={styles.headerCenter}>
          <h1 style={styles.headerTitle}>Events</h1>
        </div>
      </header>

      {/* Search Form */}
      <div style={styles.searchContainer}>
        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search events (e.g., 5k, concert, festival)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Display error message if any */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display events in a table view */}
      {events.length === 0 && !error ? (
        <p style={styles.loadingText}>Loading events...</p>
      ) : (
        <>
          <div style={styles.tableContainer}>
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
                        {event.url ? (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.link}
                          >
                            View Details
                          </a>
                        ) : (
                          <span style={styles.linkDisabled}>View Details</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div style={styles.pagination}>
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0}
              style={{
                ...styles.pageButton,
                cursor: currentPage === 0 ? "not-allowed" : "pointer"
              }}
            >
              Previous
            </button>
            {renderPageButtons()}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
              style={{
                ...styles.pageButton,
                cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer"
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    color: "#333"
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
    padding: "0.6rem 1.2rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease"
  },
  headerCenter: {
    flex: "1 1 auto",
    textAlign: "center"
  },
  headerTitle: {
    fontSize: "2.8rem",
    margin: 0,
    fontWeight: "700"
  },
  searchContainer: {
    margin: "1rem 0",
    textAlign: "center"
  },
  searchForm: {
    display: "inline-flex",
    width: "100%",
    maxWidth: "500px"
  },
  searchInput: {
    flex: "1 1 auto",
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "5px 0 0 5px",
    border: "1px solid #ccc",
    outline: "none"
  },
  searchButton: {
    padding: "0.8rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "0 5px 5px 0",
    border: "none",
    backgroundColor: "#007bff",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease"
  },
  errorText: {
    color: "#d9534f",
    textAlign: "center",
    fontWeight: "600",
    marginTop: "1rem"
  },
  loadingText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#555",
    marginTop: "2rem"
  },
  tableContainer: {
    overflowX: "auto",
    marginTop: "1rem",
    paddingBottom: "1rem"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden"
  },
  th: {
    border: "none",
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "#ffffff",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "1.1rem"
  },
  tr: {
    borderBottom: "1px solid #f1f1f1",
    transition: "background-color 0.3s ease"
  },
  td: {
    padding: "1rem",
    border: "none",
    fontSize: "1rem"
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "600"
  },
  linkDisabled: {
    color: "#aaa",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "not-allowed"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    gap: "0.5rem",
    flexWrap: "wrap"
  },
  pageButton: {
    padding: "0.5rem 0.8rem",
    borderRadius: "4px",
    border: "1px solid #007bff",
    backgroundColor: "#fff",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease"
  }
};

export default Events;