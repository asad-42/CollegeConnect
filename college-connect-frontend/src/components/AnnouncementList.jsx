// src/components/AnnouncementList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnnouncements, deleteAnnouncement, approveAnnouncement } from "../services/announcementService";
import { getCurrentUser } from "../services/authService";


export default function AnnouncementList({ department }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getCurrentUser();

  const load = () => {
    setLoading(true);
    setError("");
    const params = {};
    if (department) params.department = department;

    fetchAnnouncements(params)
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        else if (data.announcements) setItems(data.announcements);
        else setItems(data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load announcements");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveAnnouncement(id, true);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Approve failed");
    }
  };

  if (loading) return <div>Loading announcements…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!items.length) return <div>No announcements found.</div>;

  return (
    <div>
      {/* top controls: New announcement visible to faculty/admin */}
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {(user?.role === "faculty" || user?.role === "admin") && (
            <Link to="/dashboard/announcements/create" style={{ padding: "6px 10px", background: "#0b63ce", color: "#fff", borderRadius: 4, textDecoration: "none" }}>
              + New Announcement
            </Link>
          )}
        </div>
        <div style={{ fontSize: 13, color: "#666" }}>{items.length} announcement{items.length > 1 ? "s" : ""}</div>
      </div>

      {items.map((a) => (
        <div key={a._id || a.id} style={{ background: "#fff", padding: 12, marginBottom: 12, borderRadius: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{a.title}</h3>
            <small>{new Date(a.createdAt).toLocaleString()}</small>
          </div>

          <p style={{ marginTop: 8 }}>{a.content}</p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <div style={{ fontSize: 13, color: "#666" }}>
              {a.department ? `Department: ${a.department}` : "College-wide"} · Views: {a.meta?.views ?? 0}
              {a.pinned && <span style={{ marginLeft: 8, color: "#b05" }}>• Pinned</span>}
              {!a.approved && <span style={{ marginLeft: 8, color: "#d67" }}>• Pending</span>}
            </div>

            {/* admin/faculty inline actions */}
            <div>
              {/* Approve (admin only) */}
              {user?.role === "admin" && !a.approved && (
                <button onClick={() => handleApprove(a._id)} style={{ marginRight: 8 }}>
                  Approve
                </button>
              )}

              {/* Edit (author or admin) - you can implement edit route later */}
              {(user?.role === "admin" || (a.author && a.author._id === user?._id)) && (
                <Link to={`/dashboard/announcements/${a._id}/edit`} style={{ marginRight: 8 }}>
                  Edit
                </Link>
              )}

              {/* Delete (author or admin) */}
              {(user?.role === "admin" || (a.author && a.author._id === user?._id)) && (
                <button onClick={() => handleDelete(a._id)} style={{ color: "#c33" }}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
