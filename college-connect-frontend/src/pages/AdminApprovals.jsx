// src/pages/AdminApprovals.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminApprovals() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingRegistrations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/pending-registrations");
      setPendingUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/admin/approve-user/${id}`);
      fetchPendingRegistrations();
    } catch (err) {
      alert("Failed to approve user");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/api/admin/reject-user/${id}`);
      fetchPendingRegistrations();
    } catch (err) {
      alert("Failed to reject user");
    }
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <h2>
        Student & Faculty Approvals{" "}
        <span role="img" aria-label="approval">🧑‍🎓</span>
      </h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Review and approve pending student and faculty registrations.
      </p>

      {loading && <p>Loading pending requests...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && pendingUsers.length === 0 && (
        <p>No pending registrations.</p>
      )}

      {pendingUsers.map((user) => (
        <div key={user._id} className="approval-card">
          <div className="approval-info">
            <h4>
              {user.name}{" "}
              <span className="role-badge">
                {user.role.toUpperCase()}
              </span>
            </h4>

            <p><strong>Email:</strong> {user.email}</p>

            {user.role === "student" && (
              <>
                <p><strong>Registration ID:</strong> {user.admissionToken}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
              </>
            )}

            {user.role === "faculty" && (
              <>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Aadhar:</strong> {user.aadharId}</p>
                <p><strong>PAN:</strong> {user.panId}</p>
                <p>
                  <strong>Bank:</strong>{" "}
                  {user.bankDetails?.bankName} (
                  {user.bankDetails?.accountNumber})
                </p>
              </>
            )}

            <p>
              <strong>Status:</strong>{" "}
              <span className="status-pending">PENDING</span>
            </p>
          </div>

          <div className="approval-actions">
            <button
              className="btn-primary"
              onClick={() => handleApprove(user._id)}
            >
              Approve
            </button>

            <button
              className="btn-outline"
              onClick={() => handleReject(user._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
