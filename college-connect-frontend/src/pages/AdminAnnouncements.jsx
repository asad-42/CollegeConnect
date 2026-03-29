// src/pages/AdminAnnouncements.jsx
import React, { useEffect, useState } from "react";
import {
  fetchAnnouncements,
  approveAnnouncement,
  deleteAnnouncement,
} from "../services/announcementService";

const STORAGE_KEY = "cc_approved_announcement_ids";

export default function AdminAnnouncements() {
  const [pendingAnnouncements, setPendingAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  // Load already approved IDs from localStorage so they don't appear again
  const [approvedIds, setApprovedIds] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const saveApprovedIds = (ids) => {
    setApprovedIds(ids);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore storage errors
    }
  };

  const parseList = (raw) => {
    console.log("Admin moderation raw response:", raw);
    let list = [];

    if (Array.isArray(raw)) list = raw;
    else if (Array.isArray(raw?.data)) list = raw.data;
    else if (Array.isArray(raw?.announcements)) list = raw.announcements;
    else if (Array.isArray(raw?.data?.announcements))
      list = raw.data.announcements;
    else if (Array.isArray(raw?.items)) list = raw.items;

    return list;
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const raw = await fetchAnnouncements();
      const all = parseList(raw);

      // treat everything as "pending" except ones we've already approved locally
      const pending = all.filter((a) => {
        const id = a._id || a.id;
        return id && !approvedIds.includes(id);
      });

      setPendingAnnouncements(pending);
    } catch (err) {
      console.error(
        "Error loading pending announcements:",
        err?.response || err
      );
      setError("Failed to load pending announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load once on mount

  const handleApprove = async (id) => {
    try {
      setActionId(id);
      await approveAnnouncement(id); // still call backend in case it handles status

      // locally mark as approved so it disappears from moderation now & on reload
      saveApprovedIds(Array.from(new Set([...approvedIds, id])));

      setPendingAnnouncements((prev) =>
        prev.filter((a) => (a._id || a.id) !== id)
      );
    } catch (err) {
      console.error("Approve error:", err?.response || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to approve announcement.";
      setError(msg);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this announcement permanently? This cannot be undone."
      )
    )
      return;

    try {
      setActionId(id);
      await deleteAnnouncement(id);

      // Remove from local state (and just in case, from approvedIds too)
      setPendingAnnouncements((prev) =>
        prev.filter((a) => (a._id || a.id) !== id)
      );
      const updatedApproved = approvedIds.filter((x) => x !== id);
      saveApprovedIds(updatedApproved);
    } catch (err) {
      console.error("Delete error:", err?.response || err);
      setError("Failed to delete announcement.");
    } finally {
      setActionId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Safely extract a display name from createdBy / author object or string
  const getCreatedByName = (a) => {
    const raw =
      a.createdByName || a.createdBy || a.author || null;

    if (!raw) return "";

    if (typeof raw === "string") return raw;

    if (typeof raw === "object") {
      return (
        raw.name ||
        raw.username ||
        raw.email ||
        ""
      );
    }

    return "";
  };

  return (
    <div className="events-container">
      <h2 className="page-title">
        Moderate Announcements{" "}
        <span role="img" aria-label="shield">
          🛡️
        </span>
      </h2>
      <p className="events-subtitle">
        Review, approve or remove announcements submitted by faculty.
      </p>

      <div className="events-grid">
        {loading && (
          <div className="section-card">
            <p>Loading pending announcements…</p>
          </div>
        )}

        {!loading && error && (
          <div className="section-card">
            <p style={{ color: "#b91c1c", fontSize: 14 }}>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          pendingAnnouncements.length === 0 && (
            <div className="section-card">
              <p className="no-events">
                No pending announcements at the moment. Everything is up to date
                ✅
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          pendingAnnouncements.map((a) => {
            const content = a.content || a.description || a.body || "";
            const createdByName = getCreatedByName(a);
            const id = a._id || a.id;

            return (
              <div key={id} className="event-card">
                <div className="event-header-row">
                  <div>
                    <div className="event-title">
                      {a.title || "Untitled"}
                    </div>
                    <div className="event-meta">
                      Submitted {formatDate(a.createdAt || a.date)}
                      {createdByName && <> • by {createdByName}</>}
                    </div>
                  </div>
                  <div className="event-badge placement">Pending</div>
                </div>

                {content && (
                  <p className="event-desc">{content}</p>
                )}

                <div className="event-footer">
                  <span>Action required</span>
                  <span style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ paddingInline: 14, fontSize: 13 }}
                      onClick={() => handleApprove(id)}
                      disabled={actionId === id}
                    >
                      {actionId === id ? "Approving..." : "Approve"}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ paddingInline: 14, fontSize: 13 }}
                      onClick={() => handleDelete(id)}
                      disabled={actionId === id}
                    >
                      {actionId === id ? "Deleting..." : "Delete"}
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
