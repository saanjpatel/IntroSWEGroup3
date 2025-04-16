import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  // Load reservations from localStorage on mount
  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>
      <h1 style={styles.title}>My Reservations</h1>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Event Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Tickets</th>
              <th style={styles.th}>Min Price</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td style={styles.td}>{reservation.eventName}</td>
                <td style={styles.td}>{reservation.eventDate}</td>
                <td style={styles.td}>{reservation.tickets}</td>
                <td style={styles.td}>
                  {reservation.ticketPrice ? `$${reservation.ticketPrice}` : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1.5rem",
    fontFamily: "Arial, sans-serif"
  },
  backButton: {
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    border: "1px solid #ddd",
    padding: "0.5rem",
    textAlign: "left",
    background: "#007bff",
    color: "#fff"
  },
  td: {
    border: "1px solid #ddd",
    padding: "0.5rem"
  }
};

export default Reservations;