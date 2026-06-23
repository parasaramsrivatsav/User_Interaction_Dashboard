import { useEffect, useMemo, useState } from "react";
import api from "../api";

function Heatmap() {
  const [url, setUrl] = useState("");
  const [points, setPoints] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("No heatmap requests yet.");
  const [selectedCoords, setSelectedCoords] = useState(null);

  useEffect(() => {
    api
      .get("/top-pages")
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const heatmapPoints = useMemo(() => {
    const grouped = {};

    points.forEach((point) => {
      const x = Math.round(point.clickX / 20) * 20;
      const y = Math.round(point.clickY / 20) * 20;

      const key = `${x}-${y}`;

      if (grouped[key]) {
        grouped[key].count += 1;
      } else {
        grouped[key] = {
          ...point,
          clickX: x,
          clickY: y,
          count: 1,
        };
      }
    });

    return Object.values(grouped);
  }, [points]);

  const loadHeatmap = async (selectedUrl = null) => {
    setError("");

    let requestedUrl = (selectedUrl ?? url).trim();

    if (!requestedUrl) {
      setError("Please enter a page URL");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(
        `/heatmap?pageUrl=${encodeURIComponent(requestedUrl)}`
      );

      console.log("Heatmap Results:", res.data);

      setPoints(res.data);

      setDebugInfo(
        `Loaded ${res.data.length} click events`
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load heatmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-section">
      <h2>Click Heatmap</h2>

      <div className="heatmap-action-row">
        <input
          type="text"
          className="heatmap-input"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          placeholder="Enter Page URL"
        />

        <button
  type="button"
  className="view-btn"
  onClick={() => {
    console.log("BUTTON CLICKED");
    loadHeatmap();
  }}
>
  {loading ? "Loading..." : "Generate Heatmap"}
</button>
      </div>

      {pages.length > 0 && (
        <div className="previous-pages-row">
          {pages.slice(0, 5).map((page) => (
            <button
              key={page._id}
              className="page-chip"
              onClick={() =>
                loadHeatmap(page._id)
              }
            >
              {page._id}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <div className="debug-panel">
        <strong>Status:</strong>
        <p className="debug-text">
          {debugInfo}
        </p>
        <p className="heatmap-click-coords">
          {selectedCoords
            ? `Selected coordinates: x ${selectedCoords.x}, y ${selectedCoords.y}`
            : "Click a heatmap point to view coordinates."}
        </p>
      </div>
      <div className="heatmap-legend">
        <div className="heatmap-legend-left">
          <span>Legend:</span>
          <div className="heatmap-summary">
            <div className="heatmap-info">
              <span>Total Clicks</span>
              <strong>{points.length}</strong>
            </div>

            <div className="heatmap-info">
              <span>Hotspots</span>
              <strong>{heatmapPoints.length}</strong>
            </div>

            <div className="heatmap-info">
              <span>Current URL</span>
              <strong>{url}</strong>
            </div>
          </div>
        </div>

        <div className="heatmap-legend-right">
          <div className="legend-item">
            <span className="legend-dot legend-dot-small"></span>
            <small>1 Click</small>
          </div>

          <div className="legend-item">
            <span className="legend-dot legend-dot-medium"></span>
            <small>2–3 Clicks</small>
          </div>

          <div className="legend-item">
            <span className="legend-dot legend-dot-large"></span>
            <small>4+ Clicks</small>
          </div>
        </div>
      </div>
      <div className="heatmap-container" onClick={() => setSelectedCoords(null)}>

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            zIndex: 9999,
          }}
        >
          Points: {points.length}
          <br />
          Hotspots: {heatmapPoints.length}
        </div>

        {heatmapPoints.map((point) => {
          const left = point.pageWidth
            ? `${
                (point.clickX /
                  point.pageWidth) *
                100
              }%`
            : `${Math.min(
                point.clickX,
                900
              )}px`;

          const top = point.pageHeight
            ? `${
                (point.clickY /
                  point.pageHeight) *
                100
              }%`
            : `${Math.min(
                point.clickY,
                450
              )}px`;

          const size = Math.min(
            60,
            18 + point.count * 8
          );

          return (
            <div
              key={`${point.clickX}-${point.clickY}`}
              className="heat-dot"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCoords({ x: point.clickX, y: point.clickY });
              }}
              style={{
                left,
                top,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.min(
                  0.9,
                  0.35 +
                    point.count * 0.12
                ),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Heatmap;