# UserAnalyticsApp

A simple user analytics dashboard with React, Node.js, Express, and MongoDB.

## Project structure

- `backend/` — Express API and MongoDB data layer
- `frontend/` — Vite + React dashboard
- `tracker/` — event tracking starter script

## Setup

### Backend

1. Open `backend/`.
2. Copy `.env` or use `backend/.env.example`.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Run the backend:
   ```bash
   npm start
   ```

### Frontend

1. Open `frontend/`.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```

## Notes

- The frontend uses `VITE_API_BASE_URL` if configured.
- Backend API health check is available at `/api/health`.
- The backend exposes analytics, sessions, top pages, session details, and heatmap endpoints.
- The `demo-page` is a separate sample page that sends `page_view` and `click` events to the backend.
- The dashboard is the same app that reads those events from the backend and displays them.
 - To generate demo events, open `demo-page/index.html` in the browser or serve it via Live Server.
 - The demo page loads `tracker/tracker.js`, which sends events to `http://localhost:5000/api/track`.
 - Each event is saved into MongoDB with the schema defined in `backend/models/Event.js`.

Demo (simplified)
------------------

- The demo has been simplified to the essentials: a minimal product list and interactions that generate `page_view` and `click` events. See `demo-page/index.html`.
- Local images are stored under `demo-page/assets/` (SVG files) so the demo is fully offline-friendly.
- The demo page includes the tracker script at `tracker/tracker.js` which posts to `http://localhost:5000/api/track` by default.

Serving and testing the demo
1. Serve the project root so the demo page can load the tracker script correctly:

```bash
npx http-server . -p 5500
```

2. Open the demo in your browser:

```
http://127.0.0.1:5500/demo-page/index.html
```

3. Start the backend (ensure MongoDB is running locally or configured via `MONGO_URI`):

```bash
cd backend
npm install
npm start
```

4. Open the dashboard (Vite dev server), usually at `http://localhost:5173/`, and open the demo in another tab to generate events and watch them appear in Sessions/Top Pages/Heatmap.

If your frontend dev server runs on a different port, update the "Back to Dashboard" link in `demo-page/index.html` to match the dashboard URL.
