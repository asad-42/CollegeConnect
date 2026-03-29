// src/pages/DashboardAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function DashboardAdmin() {
  const user = getCurrentUser();

  const stats = {
    totalUsers: 50,
    pendingAnnouncements: 4,
    totalAnnouncements: 20,
    upcomingEvents: 3,
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2 className="admin-header-title">Admin Dashboard</h2>
          <p className="admin-header-subtitle">
            Overview of college activity, moderation and management tasks.
          </p>
        </div>

        {/* ✅ Removed the "Logged in as Admin (admin)" text */}
        {/* If you want a subtle greeting later, you can uncomment this: */}
        {/* <div className="admin-header-user">Welcome back, {user?.username}</div> */}
      </div>

      {/* Stats cards */}
      <div className="admin-cards-grid">
        <div className="admin-card">
          <div className="admin-card-label">Total Users</div>
          <div className="admin-card-value">{stats.totalUsers}</div>
          <div className="admin-card-footer">Students + Faculty + Admins</div>
        </div>

        <div className="admin-card">
          <div className="admin-card-label">Pending Announcements</div>
          <div className="admin-card-value">
            {stats.pendingAnnouncements}
          </div>
          <div className="admin-card-footer">
            Require review and approval
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-label">Total Announcements</div>
          <div className="admin-card-value">
            {stats.totalAnnouncements}
          </div>
          <div className="admin-card-footer">Active in the system</div>
        </div>

        <div className="admin-card">
          <div className="admin-card-label">Events & Placements</div>
          <div className="admin-card-value">{stats.upcomingEvents}</div>
          <div className="admin-card-footer">
            Upcoming activities (sample)
          </div>
        </div>
      </div>

      {/* Lower grid: Moderation + Management */}
      <div className="admin-lower-grid">
        <section className="admin-panel">
          <h3>Moderation</h3>
          <p>Review content before it becomes visible to students.</p>
          <ul>
            <li>
              <Link to="/dashboard/admin/announcements">
                Review &amp; approve announcements
              </Link>
            </li>
            <li>
              <Link to="/dashboard/announcements/create">
                Post an important notice
              </Link>
            </li>
            <li>
              <Link to="/dashboard/events">
                View upcoming events &amp; placements
              </Link>
            </li>
          </ul>
        </section>

        <section className="admin-panel">
          <h3>Management</h3>
          <p>
            High-level controls for users and modules. Some of these can be
            implemented as future enhancements.
          </p>
          <ul>
            <li>
              <b>Manage users</b>{" "}
              <span className="admin-badge-future">
                (planned – future enhancement)
              </span>
            </li>
            <li>
              <b>Analytics dashboard</b>{" "}
              <span className="admin-badge-future">
                (login trends, active users, etc.)
              </span>
            </li>
            <li>
              <b>Role &amp; permission editor</b>{" "}
              <span className="admin-badge-future">
                (advanced configuration)
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
