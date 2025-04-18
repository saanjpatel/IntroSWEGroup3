import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/event-details/${event_id}`);
        setEventDetails(response.data);
      } catch (err) {
        setError("Error fetching event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [event_id]);

  const handleReserveTicket = () => {
    const numberInput = window.prompt("Enter number of tickets to reserve:");
    const tickets = parseInt(numberInput);
    if (!tickets || tickets < 1) {
      alert("Invalid number of tickets!");
      return;
    }

    let ticketPrice = null;
    if (eventDetails?.priceRanges && eventDetails.priceRanges.length > 0) {
      ticketPrice = eventDetails.priceRanges[0].min;
    }

    const reservation = {
      eventId: eventDetails.id,
      eventName: eventDetails.name,
      tickets: tickets,
      ticketPrice: ticketPrice,
      eventDate: eventDetails?.dates?.start?.localDate || "N/A"
    };

    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    storedReservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(storedReservations));
    alert("Reservation saved!");
  };

  if (loading) {
    return <p style={styles.loading}>Loading event details...</p>;
  }
  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  const eventName = eventDetails?.name || "Event Name Not Available";
  const eventDate = eventDetails?.dates?.start?.localDate || "N/A";
  const eventTime = eventDetails?.dates?.start?.localTime || "N/A";
  const venueName = eventDetails?._embedded?.venues?.[0]?.name || "N/A";
  const eventInfo = eventDetails?.info || eventDetails?.pleaseNote || "No description available.";

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>
      <h1 style={styles.title}>{eventName}</h1>
      <p style={styles.detail}>
        <strong>Date:</strong> {eventDate}
      </p>
      <p style={styles.detail}>
        <strong>Time:</strong> {eventTime}
      </p>
      <p style={styles.detail}>
        <strong>Venue:</strong> {venueName}
      </p>
      <div style={styles.infoContainer}>
        <h3>Description</h3>
        <p>{eventInfo}</p>
      </div>
      <button onClick={handleReserveTicket} style={styles.reserveButton}>
        Reserve Ticket
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1.5rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
  detail: {
    fontSize: "1.1rem",
    margin: "0.5rem 0"
  },
  infoContainer: {
    marginTop: "1.5rem",
    padding: "1rem",
    borderTop: "1px solid #ddd"
  },
  reserveButton: {
    display: "block",
    width: "200px",
    margin: "2rem auto 0 auto",
    padding: "0.75rem",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem"
  },
  error: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem",
    color: "red"
  }
};

export default EventDetail;