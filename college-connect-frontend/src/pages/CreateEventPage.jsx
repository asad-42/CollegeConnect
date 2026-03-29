// src/pages/CreateEventPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import "./CreateEventPage.css";

export default function CreateEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    type: "event", // event | placement
    department: "ALL",
    date: "",
    time: "",
    location: "",
    isOnline: false,
    link: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createEvent(eventData);
      navigate("/dashboard/events");
    } catch (err) {
      console.error("Create event error:", err?.response || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to create event. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="create-event-page">
      <div className="event-card">
        <h2 className="event-title">
          Create New Event <span>🎯</span>
        </h2>
        <p className="event-subtitle">
          Fill in the details below to publish a new event or placement update.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="event-form">
          {/* Section: Basic Info */}
          <div className="form-section">
            <h4>Basic Information</h4>

            <div className="form-grid">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={eventData.type}
                  onChange={handleChange}
                >
                  <option value="event">Event</option>
                  <option value="placement">Placement</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section: Schedule */}
          <div className="form-section">
            <h4>Schedule</h4>

            <div className="form-grid">
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={eventData.department}
                  onChange={handleChange}
                >
                  <option value="ALL">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Time</label>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="form-section">
            <h4>Location & Access</h4>

            <div className="form-group">
              <label>Venue / Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="e.g. CSE Auditorium / Seminar Hall"
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                name="isOnline"
                checked={eventData.isOnline}
                onChange={handleChange}
              />
              <span>Online Event</span>
            </div>

            <div className="form-group">
              <label>Registration / Meeting Link (optional)</label>
              <input
                type="url"
                name="link"
                value={eventData.link}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Action */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
