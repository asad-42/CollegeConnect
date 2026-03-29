// src/components/Navbar.jsx
import React from "react";
import { getCurrentUser, logout } from "../services/authService";

export default function Navbar() {
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <div className="app-logo-circle">CC</div>
        <div className="app-title-block">
          <h1 className="app-title">College Connect</h1>
          <p className="app-subtitle">Smart campus communication portal</p>
        </div>
      </div>

      <div className="navbar-right">
        {user && (
          <div className="user-pill">
            <div className="user-avatar">
              {user.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              <span className="user-role">{roleLabel}</span>
            </div>
          </div>
        )}
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
