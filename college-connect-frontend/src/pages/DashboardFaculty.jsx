// src/pages/DashboardFaculty.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

export default function DashboardFaculty() {
  // Placeholder counts for now
  const myAnnouncements = 3;
  const pendingApprovals = 1; // ones waiting for admin

  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <p>Welcome — manage your announcements and classes here.</p>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 16 }}>
        <DashboardCard
          title="My Announcements"
          value={myAnnouncements}
          subtitle="Created by you"
        />
        <DashboardCard
          title="Pending Approval"
          value={pendingApprovals}
          subtitle="Waiting for admin"
        />
      </div>

      <section style={{ marginTop: 24 }}>
        <h3>Quick Actions</h3>
        <ul>
          <li>
            <Link to="/dashboard/announcements/create">Create new announcement</Link>
          </li>
          <li>
            <Link to="/dashboard/announcements">View all announcements</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Coming Soon</h3>
        <p>Upload notes, manage attendance, and more.</p>
      </section>
    </div>
  );
}
