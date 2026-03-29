// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function Home() {
  const user = getCurrentUser();
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  return (
    <div className="page-shell">
      <div className="page-head">
        <h2 className="page-head-title">Welcome, {user?.username || "User"} 👋</h2>
        <p className="page-head-subtitle">
          You&apos;re logged in as <b>{roleLabel}</b>. Here are some quick actions
          and updates for you.
        </p>
      </div>

      <div className="page-content">
        {/* Quick actions */}
        <div className="section-grid">
          <Link to="/dashboard/announcements" className="section-card">
            <h3>📢 Latest Announcements</h3>
            <p>
              View important circulars, exam notifications and academic updates
              from your college.
            </p>
            <p style={{ fontSize: 13, color: "#4f46e5", marginTop: 8 }}>
              Open announcements →
            </p>
          </Link>

          <Link to="/dashboard/events" className="section-card">
            <h3>📅 Events &amp; Placements</h3>
            <p>
              Explore upcoming workshops, placement drives and technical events
              happening on campus.
            </p>
            <p style={{ fontSize: 13, color: "#4f46e5", marginTop: 8 }}>
              View events →
            </p>
          </Link>

          <Link to="/dashboard/resources" className="section-card">
            <h3>📚 Resources</h3>
            <p>
              Access study materials, reference links and useful documents shared
              by faculty.
            </p>
            <p style={{ fontSize: 13, color: "#4f46e5", marginTop: 8 }}>
              Browse resources →
            </p>
          </Link>
        </div>

        {/* Role-specific suggestion */}
        <div className="section-card">
          {user?.role === "admin" && (
            <>
              <h3>Admin shortcuts</h3>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                Manage content visibility and keep the portal clean and updated.
              </p>
              <ul>
                <li>
                  <Link to="/dashboard/admin/announcements">
                    Review &amp; approve announcements
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/announcements/create">
                    Post a high priority notice
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/events/create">
                    Add a new event or placement drive
                  </Link>
                </li>
              </ul>
            </>
          )}

          {user?.role === "faculty" && (
            <>
              <h3>Faculty quick actions</h3>
              <ul>
                <li>
                  <Link to="/dashboard/announcements/create">
                    Create an announcement for your class / department
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/events/create">
                    Propose a workshop or guest lecture
                  </Link>
                </li>
              </ul>
            </>
          )}

          {user?.role === "student" && (
            <>
              <h3>For you as a student</h3>
              <ul>
                <li>
                  <Link to="/dashboard/announcements">
                    Check today&apos;s announcements and exam updates
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/events">
                    Register for events &amp; placement drives
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
