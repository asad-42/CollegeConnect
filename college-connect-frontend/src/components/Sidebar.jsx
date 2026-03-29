// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function Sidebar() {
  const location = useLocation();
  const user = getCurrentUser();
  const role = user?.role;

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    "sidebar-link" + (isActive(path) ? " sidebar-link-active" : "");

  return (
    <aside className="app-sidebar">
      <div className="sidebar-inner">

        {/* ================= MAIN ================= */}
        <div className="sidebar-section-label">Main</div>

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <span className="sidebar-icon">🏠</span>
          <span>Home</span>
        </Link>

        <Link
          to="/dashboard/announcements"
          className={linkClass("/dashboard/announcements")}
        >
          <span className="sidebar-icon">📢</span>
          <span>Announcements</span>
        </Link>

        <Link
          to="/dashboard/events"
          className={linkClass("/dashboard/events")}
        >
          <span className="sidebar-icon">📅</span>
          <span>Events & Placements</span>
        </Link>

        <Link
          to="/dashboard/resources"
          className={linkClass("/dashboard/resources")}
        >
          <span className="sidebar-icon">📚</span>
          <span>Resources</span>
        </Link>

        {/* ================= ACADEMICS ================= */}
        <div className="sidebar-section-label">Academics</div>

        <Link
          to="/dashboard/timetable"
          className={linkClass("/dashboard/timetable")}
        >
          <span className="sidebar-icon">🕒</span>
          <span>Class Timetable</span>
        </Link>

        <Link
          to="/dashboard/notes"
          className={linkClass("/dashboard/notes")}
        >
          <span className="sidebar-icon">📝</span>
          <span>Notes</span>
        </Link>

        <Link
          to="/dashboard/syllabus"
          className={linkClass("/dashboard/syllabus")}
        >
          <span className="sidebar-icon">📘</span>
          <span>Syllabus</span>
        </Link>

        <Link
          to="/dashboard/feedback"
          className={linkClass("/dashboard/feedback")}
        >
          <span className="sidebar-icon">💬</span>
          <span>Feedback</span>
        </Link>

        <Link
          to="/dashboard/complaints"
          className={linkClass("/dashboard/complaints")}
        >
          <span className="sidebar-icon">⚠️</span>
          <span>Raise Complaint</span>
        </Link>

        {/* ================= CAMPUS UTILITIES ================= */}
        <div className="sidebar-section-label">Campus Utilities</div>

        <Link
          to="/dashboard/mess-menu"
          className={linkClass("/dashboard/mess-menu")}
        >
          <span className="sidebar-icon">🍽️</span>
          <span>Mess Menu</span>
        </Link>

        <Link
          to="/dashboard/lost-found"
          className={linkClass("/dashboard/lost-found")}
        >
          <span className="sidebar-icon">🔎</span>
          <span>Lost & Found</span>
        </Link>

        <Link
          to="/dashboard/campus-map"
          className={linkClass("/dashboard/campus-map")}
        >
          <span className="sidebar-icon">🗺️</span>
          <span>Campus Map</span>
        </Link>

        <Link
          to="/dashboard/emergency"
          className={linkClass("/dashboard/emergency")}
        >
          <span className="sidebar-icon">🚨</span>
          <span>Emergency / SOS</span>
        </Link>

        <Link
          to="/dashboard/it-support"
          className={linkClass("/dashboard/it-support")}
        >
          <span className="sidebar-icon">🖥️</span>
          <span>IT Support</span>
        </Link>

        {/* ================= CAMPUS SOCIAL LIFE ================= */}
        <div className="sidebar-section-label">Campus Social Life</div>

        <Link
          to="/dashboard/clubs"
          className={linkClass("/dashboard/clubs")}
        >
          <span className="sidebar-icon">🎭</span>
          <span>Club Chat Rooms</span>
        </Link>

        <Link
          to="/dashboard/social-events"
          className={linkClass("/dashboard/social-events")}
        >
          <span className="sidebar-icon">🎉</span>
          <span>Student Events</span>
        </Link>

        <Link
          to="/dashboard/users"
          className={linkClass("/dashboard/users")}
        >
          <span className="sidebar-icon">🔍</span>
          <span>User Search</span>
        </Link>

        <Link
          to="/dashboard/leaderboard"
          className={linkClass("/dashboard/leaderboard")}
        >
          <span className="sidebar-icon">🏆</span>
          <span>Leaderboard</span>
        </Link>

        <Link
          to="/dashboard/sponsorships"
          className={linkClass("/dashboard/sponsorships")}
        >
          <span className="sidebar-icon">🤝</span>
          <span>Sponsorships / Brands</span>
        </Link>

        {/* ================= FACULTY / ADMIN ================= */}
        {(role === "faculty" || role === "admin") && (
          <>
            <div className="sidebar-section-label">Management</div>

            <Link
              to="/dashboard/announcements/create"
              className={linkClass("/dashboard/announcements/create")}
            >
              <span className="sidebar-icon">✏️</span>
              <span>Create Announcement</span>
            </Link>

            <Link
              to="/dashboard/events/create"
              className={linkClass("/dashboard/events/create")}
            >
              <span className="sidebar-icon">➕</span>
              <span>Create Event</span>
            </Link>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "admin" && (
          <>
            <div className="sidebar-section-label">Admin</div>

            <Link
              to="/dashboard/admin/announcements"
              className={linkClass("/dashboard/admin/announcements")}
            >
              <span className="sidebar-icon">🛡️</span>
              <span>Admin Moderation</span>
            </Link>

            <Link
              to="/dashboard/admin/students"
              className={linkClass("/dashboard/admin/students")}
            >
              <span className="sidebar-icon">🧑‍🎓</span>
              <span>Student Approvals</span>
            </Link>

            <Link
              to="/dashboard/admin/faculty"
              className={linkClass("/dashboard/admin/faculty")}
            >
              <span className="sidebar-icon">👨‍🏫</span>
              <span>Faculty Approvals</span>
            </Link>
          </>
        )}

        {/* ================= ACCOUNT ================= */}
        <div className="sidebar-section-label">Account</div>

        <Link
          to="/dashboard/profile"
          className={linkClass("/dashboard/profile")}
        >
          <span className="sidebar-icon">👤</span>
          <span>My Profile</span>
        </Link>

      </div>
    </aside>
  );
}
