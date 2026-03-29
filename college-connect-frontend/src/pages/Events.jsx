// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get("http://localhost:5000/api/events");
        const data = res.data;
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Events error:", err);
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to load events";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <div>Loading events…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!events.length) return <div>No upcoming events found.</div>;

  return (
    <div>
      <h2>Events & Placements</h2>
      <p>Upcoming college events and placement opportunities.</p>

      <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
        {events.map((e) => (
          <div
            key={e._id}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>{e.title}</h3>
              <span
                style={{
                  fontSize: 12,
                  padding: "2px 8px",
                  borderRadius: 12,
                  background: "#eee",
                }}
              >
                {e.type === "placement" ? "Placement" : "Event"}
              </span>
            </div>

            <div style={{ marginTop: 6, fontSize: 14 }}>
              {new Date(e.date).toLocaleString()}
            </div>

            <p style={{ marginTop: 8 }}>{e.description}</p>

            <div style={{ fontSize: 13, color: "#666" }}>
              <div>
                <strong>Location:</strong> {e.location || "Campus"}
              </div>
              <div>
                <strong>Department:</strong> {e.department || "ALL"}
              </div>
              {e.isOnline && <div>Mode: Online</div>}
              {e.link && (
                <div style={{ marginTop: 6 }}>
                  <a href={e.link} target="_blank" rel="noreferrer">
                    More info / Register
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
