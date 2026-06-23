# UserAnalyticsApp

A modern full-stack User Analytics Dashboard built with React, Node.js, Express, and MongoDB. The platform collects user interaction events and visualizes them through professional analytics dashboards, charts, funnels, heatmaps, and session insights.

---

## Features

### Core Analytics

* Real-time event tracking
* Page view monitoring
* Click tracking
* Session analytics
* User activity timeline
* Top visited pages
* Session details explorer
* Heatmap visualization
* API-driven analytics dashboard

---

## Advanced Dashboard Visualizations

### User Growth Trend

Track user growth over time using interactive line charts.

Features:

* Daily Active Users
* Weekly Active Users
* Monthly Active Users
* Trend comparison

---

### Events Breakdown

Visualize event distribution using pie charts.

Supported Events:

* Page Views
* Clicks
* Signups
* Purchases
* Custom Events

---

### Active Hours Analytics

Identify peak engagement periods.

Displays:

* Visits by Hour
* Most Active Time Slots
* User Traffic Patterns

---

### Device Analytics

Analyze visitors by device type.

Supported Categories:

* Desktop
* Mobile
* Tablet

Visualization:

* Donut Chart
* Percentage Distribution

---

### User Location Insights

Track geographical audience distribution.

Displays:

* Top Countries
* Top Regions
* Visitor Percentages
* Location Ranking

---

### Most Clicked Elements

Track engagement on UI components.

Examples:

* Buy Buttons
* CTA Buttons
* Navigation Links
* Product Cards
* Login Buttons

---

### Session Duration Analysis

Measure user engagement quality.

Categories:

* 0–1 Minute
* 1–5 Minutes
* 5–10 Minutes
* 10+ Minutes

---

### Conversion Funnel

Visualize user journey through the application.

Flow Example:

Visitor
↓
Page View
↓
Product View
↓
Add To Cart
↓
Checkout
↓
Purchase

---

### Top Referrers

Analyze traffic sources.

Examples:

* Google
* LinkedIn
* Twitter/X
* Facebook
* Direct Traffic

---

### Recent Activity Feed

Live timeline of user actions.

Examples:

* User viewed product
* User clicked CTA
* User started checkout
* User completed purchase

---

## Project Structure

```text
UserAnalyticsApp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── charts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── vite.config.js
│
├── tracker/
│   └── tracker.js
│
├── demo-page/
│   ├── assets/
│   └── index.html
│
└── README.md
```

---

## Technology Stack

### Frontend

* React.js
* Vite
* Recharts
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Tracking

* Custom JavaScript Tracker
* REST API Event Collection

---

## Setup

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

Health Check:

```text
http://localhost:5000/api/health
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/useranalytics
```

Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Event Tracking

The tracker automatically captures:

* Page Views
* Click Events
* Product Interactions
* User Sessions

Example:

```javascript
trackEvent("page_view", {
  page: window.location.pathname
});

trackEvent("click", {
  element: "buy_button"
});
```

---

## Demo Application

A lightweight demo application is included to generate analytics data.

### Start Demo Server

```bash
npx http-server . -p 5500
```

### Open Demo

```text
http://127.0.0.1:5500/demo-page/index.html
```

### Tracker Integration

```html
<script src="../tracker/tracker.js"></script>
```

Events are sent to:

```text
http://localhost:5000/api/track
```

---

## Dashboard Widgets

Current Dashboard Includes:

* KPI Cards
* User Growth Line Chart
* Event Breakdown Pie Chart
* Active Hours Bar Chart
* Device Analytics Donut Chart
* Conversion Funnel
* User Locations
* Session Duration Histogram
* Most Clicked Elements Table
* Top Referrers Chart
* Recent Activity Feed
* Heatmap Visualization
* Session Explorer

---

## Future Enhancements

* Real-time WebSocket Updates
* AI-Based User Insights
* Predictive Analytics
* Cohort Analysis
* User Segmentation
* Export Reports (PDF/Excel)
* Dark Mode
* Role-Based Access Control
* Cloud Deployment
* Multi-Tenant Analytics

---

## Author

Srivatsav

B.Tech Information Technology

Full Stack Developer | AI/ML Enthusiast | Data Analytics

---

## License
Srivatsav Parasaram
