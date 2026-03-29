// src/pages/Announcements.jsx
import React, { useEffect, useState } from "react";
import {
  fetchAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../services/announcementService";
import { getCurrentUser } from "../services/authService";

const STORAGE_KEY = "cc_approved_announcement_ids";

export default function Announcements() {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [approvedIds, setApprovedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);

  const user = getCurrentUser();
  const currentRole = (user?.role || "").toString().toLowerCase();
  const isAdmin = currentRole === "admin";
  const isFaculty = currentRole === "faculty";

  const parseList = (raw) => {
    console.log("Announcements raw response:", raw);
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
      const list = parseList(raw);

      // Load approved IDs from localStorage
      let storedIds = [];
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        storedIds = stored ? JSON.parse(stored) : [];
      } catch {
        storedIds = [];
      }

      setAllAnnouncements(list);
      setApprovedIds(storedIds);
    } catch (err) {
      console.error("Error loading announcements:", err?.response || err);
      setError("Failed to load announcements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateApprovedIds = (newIds) => {
    setApprovedIds(newIds);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch {
      // ignore storage errors
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
      await deleteAnnouncement(id);

      // Remove from local list
      setAllAnnouncements((prev) =>
        prev.filter((a) => (a._id || a.id) !== id)
      );

      // And from approved ID cache
      const updated = approvedIds.filter((x) => x !== id);
      updateApprovedIds(updated);
    } catch (err) {
      console.error("Delete error:", err?.response || err);
      alert("Failed to delete announcement.");
    }
  };

  const handleUnapprove = (id) => {
    if (
      !window.confirm(
        "Mark this announcement as unapproved? It will move back to the moderation list."
      )
    )
      return;

    const updated = approvedIds.filter((x) => x !== id);
    updateApprovedIds(updated);
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

  // Safely get creator info and raw creator object/string
  const getCreatorInfo = (a) => {
    const raw =
      a.createdByName || a.createdBy || a.author || null;

    let name = "";
    let role = "";

    if (!raw) return { name, role, raw };

    if (typeof raw === "string") {
      name = raw;
    } else if (typeof raw === "object") {
      name = raw.name || raw.username || raw.email || "";
      role = (raw.role || "").toLowerCase();
    }

    return { name, role, raw };
  };

  // Check if this announcement belongs to current faculty user
  const isOwnedByCurrentFaculty = (a) => {
    if (!isFaculty || !user) return false;
    const { raw } = getCreatorInfo(a);
    if (!raw) return false;

    // If backend stores full user object
    if (typeof raw === "object") {
      if (raw._id && user._id && raw._id === user._id) return true;
      if (raw.email && user.email && raw.email === user.email) return true;
      if (raw.username && user.username && raw.username === user.username)
        return true;
      if (raw.name && (raw.name === user.name || raw.name === user.username))
        return true;
    }

    // If backend only stores a string
    if (typeof raw === "string") {
      const value = raw.toLowerCase();
      const possibilities = [
        user.username,
        user.name,
        user.email,
      ]
        .filter(Boolean)
        .map((x) => x.toLowerCase());
      return possibilities.includes(value);
    }

    return false;
  };

  // Role-based colored dot
  const renderRoleDot = (role) => {
    let color = "transparent";

    if (role === "admin") {
      color = "#facc15"; // yellow
    } else if (role === "faculty" || role === "teacher") {
      color = "#38bdf8"; // blue
    } else {
      return null;
    }

    return (
      <span
        style={{
          display: "inline-block",
          width: 9,
          height: 9,
          borderRadius: "999px",
          marginLeft: 8,
          backgroundColor: color,
          boxShadow: "0 0 0 2px rgba(15,23,42,0.12)",
          verticalAlign: "middle",
        }}
      />
    );
  };

  // Derived lists
  const approvedAnnouncements = allAnnouncements.filter((a) => {
    const id = a._id || a.id;
    return id && approvedIds.includes(id);
  });

  const myPendingAnnouncements =
    isFaculty &&
    allAnnouncements.filter((a) => {
      const id = a._id || a.id;
      // pending = id exists BUT not in approvedIds AND owned by this faculty
      return id && !approvedIds.includes(id) && isOwnedByCurrentFaculty(a);
    });

  const startEditing = (a) => {
    setEditingId(a._id || a.id);
    setEditForm({
      title: a.title || "",
      description: a.content || a.description || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "" });
  };

  const saveEdit = async (id) => {
    if (!editForm.title.trim()) {
      alert("Title is required.");
      return;
    }

    setSaving(true);
    try {
      // send both "content" and "description" so it works
      await updateAnnouncement(id, {
        title: editForm.title,
        content: editForm.description,      // for backends using "content"
        description: editForm.description,  // for backends using "description"
      });

      // Update local list
      setAllAnnouncements((prev) =>
        prev.map((a) =>
          (a._id || a.id) === id
            ? {
                ...a,
                title: editForm.title,
                description: editForm.description,
                content: editForm.description,
              }
            : a
        )
      );

      cancelEditing();
    } catch (err) {
      console.error("Update error:", err?.response || err);
      alert("Failed to update announcement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="events-container">
      <h2 className="page-title">
        Announcements{" "}
        <span role="img" aria-label="speaker">
          📢
        </span>
      </h2>
      <p className="events-subtitle">
        Only announcements approved by an admin are visible to everyone.
        Admin posts are marked with a yellow dot; faculty posts with a blue dot.
      </p>

      {/* Approved announcements section (everyone sees, read-only except admin controls) */}
      <div className="events-grid">
        {loading && (
          <div className="section-card">
            <p>Loading announcements…</p>
          </div>
        )}

        {!loading && error && (
          <div className="section-card">
            <p style={{ color: "#b91c1c", fontSize: 14 }}>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          approvedAnnouncements.length === 0 && (
            <div className="section-card">
              <p className="no-events">
                No approved announcements yet. Once admin approves an
                announcement from the moderation panel, it will appear here.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          approvedAnnouncements.map((a) => {
            const id = a._id || a.id;
            const dept =
              a.department || a.dept || a.branch || "All Departments";
            const { name: createdByName, role: createdByRole } =
              getCreatorInfo(a);
            const content = a.content || a.description || a.body || "";

            return (
              <div key={id} className="event-card">
                <div className="event-header-row">
                  <div>
                    <div className="event-title">
                      {a.title || "Untitled"}
                      {renderRoleDot(createdByRole)}
                    </div>
                    <div className="event-meta">
                      {formatDate(a.createdAt || a.date)}{" "}
                      {dept && <> • {dept}</>}
                    </div>
                  </div>
                  <div className="event-badge event">Announcement</div>
                </div>

                {content && <p className="event-desc">{content}</p>}

                <div className="event-footer">
                  <span>
                    {createdByName
                      ? `Posted by ${createdByName}`
                      : "College admin"}
                  </span>

                  {/* Only admin can unapprove/delete here */}
                  {isAdmin && (
                    <span style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ paddingInline: 14, fontSize: 13 }}
                        onClick={() => handleUnapprove(id)}
                      >
                        Unapprove
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ paddingInline: 14, fontSize: 13 }}
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Faculty-only: My pending announcements (editable, own only) */}
      {isFaculty &&
        myPendingAnnouncements &&
        myPendingAnnouncements.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 8 }}>
              My pending announcements (awaiting admin approval)
            </h3>
            <p className="events-subtitle" style={{ marginBottom: 12 }}>
              You can edit these announcements until an admin approves them.
            </p>

            <div className="events-grid">
              {myPendingAnnouncements.map((a) => {
                const id = a._id || a.id;
                const dept =
                  a.department || a.dept || a.branch || "All Departments";
                const content = a.content || a.description || a.body || "";

                const isEditing = editingId === id;

                return (
                  <div key={id} className="event-card">
                    <div className="event-header-row">
                      <div>
                        {!isEditing ? (
                          <div className="event-title">
                            {a.title || "Untitled"}
                            {/* always faculty, so blue dot */}
                            <span
                              style={{
                                display: "inline-block",
                                width: 9,
                                height: 9,
                                borderRadius: "999px",
                                marginLeft: 8,
                                backgroundColor: "#38bdf8",
                                boxShadow:
                                  "0 0 0 2px rgba(15,23,42,0.12)",
                                verticalAlign: "middle",
                              }}
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            style={{
                              borderRadius: 10,
                              border:
                                "1px solid rgba(148,163,184,0.7)",
                              padding: "6px 8px",
                              fontSize: 14,
                              width: "100%",
                            }}
                            placeholder="Announcement title"
                          />
                        )}
                        <div className="event-meta">
                          {formatDate(a.createdAt || a.date)}{" "}
                          {dept && <> • {dept}</>}
                        </div>
                      </div>
                      <div className="event-badge placement">Pending</div>
                    </div>

                    {!isEditing ? (
                      content && <p className="event-desc">{content}</p>
                    ) : (
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          border:
                            "1px solid rgba(148,163,184,0.7)",
                          padding: "8px 10px",
                          fontSize: 14,
                          minHeight: 70,
                          marginTop: 8,
                        }}
                        placeholder="Announcement details"
                      />
                    )}

                    <div className="event-footer">
                      <span>
                        Editable by you until admin approves it.
                      </span>

                      <span style={{ display: "flex", gap: 8 }}>
                        {!isEditing ? (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ paddingInline: 14, fontSize: 13 }}
                            onClick={() => startEditing(a)}
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn-primary"
                              style={{
                                paddingInline: 14,
                                fontSize: 13,
                              }}
                              onClick={() => saveEdit(id)}
                              disabled={saving}
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{
                                paddingInline: 14,
                                fontSize: 13,
                              }}
                              onClick={cancelEditing}
                              disabled={saving}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}
