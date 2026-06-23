import { useEffect, useState } from "react";
import api from "../api";

function DashboardCards() {

  const [data, setData] = useState({
    totalSessions: 0,
    totalClicks: 0,
    totalPageViews: 0,
    totalEvents: 0
  });

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res =
          await api.get("/summary");

        setData(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  return (

    <div className="cards">

      <div className="card">
        <h3>Total Sessions</h3>
        <h1>{data.totalSessions}</h1>
      </div>

      <div className="card">
        <h3>Total Clicks</h3>
        <h1>{data.totalClicks}</h1>
      </div>

      <div className="card">
        <h3>Page Views</h3>
        <h1>{data.totalPageViews}</h1>
      </div>

      <div className="card">
        <h3>Total Events</h3>
        <h1>{data.totalEvents}</h1>
      </div>

    </div>

  );
}

export default DashboardCards;