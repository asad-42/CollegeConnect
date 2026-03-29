// src/pages/Profile.jsx
import React from "react";
import { getCurrentUser } from "../services/authService";

export default function Profile() {
  const user = getCurrentUser();

  if (!user) {
    return <p>Unable to load profile.</p>;
  }

  const {
    name,
    email,
    role,
    dob,
    contact,
    admissionToken,
    approvalStatus,
    department,
  } = user;

  const roleLabel =
    role === "admin" ? "ADMIN" : role === "faculty" ? "FACULTY" : "STUDENT";

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>
        My Profile <span role="img" aria-label="profile">👤</span>
      </h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Basic details about your College Connect account.
      </p>

      {/* ================= VIRTUAL ID CARD ================= */}
      <div className="virtual-id-card">
        {/* Header
        <div className="id-header">
          <div className="id-logo">CC</div>
          <div>
            <h3>College Connect</h3>
            <p className="id-subtitle">Virtual ID Card</p>
          </div>
        </div> */}

        {/* Body */}
        <div className="id-body">
          <div className="id-avatar">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="id-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Role:</strong> {roleLabel}</p>
            <p><strong>Email:</strong> {email}</p>

            {/* ================= STUDENT ================= */}
            {role === "student" && (
              <>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {dob ? new Date(dob).toLocaleDateString() : "—"}
                </p>
                <p><strong>Contact:</strong> {contact || "—"}</p>
                <p><strong>Registration ID:</strong> {admissionToken}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      approvalStatus === "APPROVED"
                        ? "status-approved"
                        : approvalStatus === "PENDING"
                        ? "status-pending"
                        : "status-rejected"
                    }
                  >
                    {approvalStatus}
                  </span>
                </p>
              </>
            )}

            {/* ================= FACULTY ================= */}
            {role === "faculty" && (
              <>
                <p><strong>Department:</strong> {department || "—"}</p>
                <p>
                  <strong>Access Level:</strong>{" "}
                  <span className="status-approved">ACTIVE</span>
                </p>
              </>
            )}

            {/* ================= ADMIN ================= */}
            {role === "admin" && (
              <>
                <p>
                  <strong>System Privileges:</strong>{" "}
                  <span className="status-approved">FULL ACCESS</span>
                </p>
                <p>
                  <strong>Account Status:</strong>{" "}
                  <span className="status-approved">ACTIVE</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
