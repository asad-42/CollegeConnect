// src/pages/CreateAnnouncement.jsx
import React, { useState } from "react";
import { createAnnouncement } from "../services/announcementService";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./CreateAnnouncement.css";

export default function CreateAnnouncement() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [department, setDepartment] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // prevent access if not faculty/admin
  if (!user || (user.role !== "faculty" && user.role !== "admin")) {
    return (
      <div className="announcement-access-denied">
        Access denied. Only faculty or admin can create announcements.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        title,
        content,
        department: department || null,
        isGlobal,
        pinned: false,
      };

      await createAnnouncement(payload);
      navigate("/dashboard/announcements");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-announcement-page">
      <div className="announcement-card">
        <h2 className="announcement-title">Create Announcement 📢</h2>
        <p className="announcement-subtitle">
          Publish important updates and notices for students and faculty.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="announcement-form">
          {/* Section: Basic Info */}
          <div className="form-section">
            <h4>Announcement Details</h4>

            <div className="form-group">
              <label>Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          {/* Section: Scope */}
          <div className="form-section">
            <h4>Visibility</h4>

            <div className="form-group">
              <label>Department (leave empty for college-wide)</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
              />
              <span>Global (college-wide)</span>
            </div>
          </div>

          {/* Action */}
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
