// src/pages/DashboardStudent.jsx
import React from "react";
import { Link } from "react-router-dom";
import AnnouncementList from "../components/AnnouncementList";
import DashboardCard from "../components/DashboardCard";

export default function DashboardStudent() {
  // For now we use simple example numbers.
  // Later we can fetch real counts from backend.
  const totalAnnouncements = 5; // example placeholder
  const unreadAnnouncements = 2; // example placeholder

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome — here are the latest updates for you.</p>

      {/* Summary cards */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 16 }}>
        <DashboardCard
          title="Total Announcements"
          value={totalAnnouncements}
          subtitle="Across your college"
        />
        <DashboardCard
          title="Unread Announcements"
          value={unreadAnnouncements}
          subtitle="New since last visit"
        />
      </div>

      <section style={{ marginTop: 24 }}>
        <h3>Recent Announcements</h3>
        <AnnouncementList />
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/dashboard/announcements">View all announcements</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
