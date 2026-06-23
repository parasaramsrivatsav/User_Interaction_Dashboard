import { useEffect, useState } from "react";
import api from "../api";

function Sessions({ onSelect }) {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    const fetchSessions = async () => {

      try {

        const res = await api.get("/sessions");

        setSessions(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchSessions();

  }, []);

  return (
    <div className="table-section">
      <h2>Sessions</h2>

      {!sessions.length ? (
        <p>No sessions have been recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Total Events</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id}>
                <td>{session._id.substring(0, 20)}...</td>
                <td>{session.totalEvents}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => onSelect(session._id)}
                  >
                    View Journey
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

}

export default Sessions;