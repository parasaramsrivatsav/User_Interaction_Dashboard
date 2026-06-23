import { useEffect, useState } from "react";
import api from "../api";

function SessionEvents({ sessionId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    setLoading(true);
    setError("");

    api
      .get(`/session/${sessionId}`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load session events.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="table-section">
        <h2>User Journey</h2>
        <p>Select a session to view the event timeline.</p>
      </div>
    );
  }

  return (
    <div className="table-section">
      <h2>User Journey</h2>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}      
      {!loading && !events.length && !error && (
        <p>No events found for this session.</p>
      )}

      {events.map((event) => (
        <div key={event._id} className="event-card">
          <strong>{event.eventType.toUpperCase()}</strong>
          <p>{event.pageUrl}</p>
          <small>{new Date(event.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default SessionEvents;