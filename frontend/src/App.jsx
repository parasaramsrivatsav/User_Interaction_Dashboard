import { useState } from "react";

import DashboardCards from "./components/DashboardCards";
import Sessions from "./components/Sessions";
import SessionEvents from "./components/SessionEvents";
import TopPages from "./components/TopPages";
import Heatmap from "./components/Heatmap";

import "./styles/dashboard.css";

function App() {

  const [selectedSession, setSelectedSession] =
    useState("");

  return (
    <>
      <div className="dashboard">

        <header className="dashboard-header">
          <h1>User Analytics Dashboard</h1>
          <p>
            Session Tracking, User Journey &
            Click Heatmap Analytics
          </p>
          <p className="dashboard-note">
            Generate interactions in the demo page, then view the captured sessions,
            events, and heatmap analytics here.
          </p>

          <div className="demo-access-card">
            <div>
              <p className="demo-access-title">Demo page preview</p>
              <p className="demo-access-text">
                Open the demo page to create page views and click events. The tracker sends events to the backend at <code>http://localhost:5000/api/track</code>, and the backend stores them in MongoDB.
              </p>
            </div>
            <a
              className="open-demo-btn"
              href="http://127.0.0.1:5500/demo-page/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Open Demo Page
            </a>
          </div>
        </header>

      <DashboardCards />

      <Sessions
        onSelect={setSelectedSession}
      />

      <SessionEvents
        sessionId={selectedSession}
      />

      <TopPages />

      <Heatmap />

    </div>

      <footer className="footer">
        Built with React, Node.js, Express and MongoDB
      </footer>
    </>
  );
}

export default App;