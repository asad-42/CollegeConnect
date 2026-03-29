// src/pages/SignupChoice.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupChoice() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-right">
        <div className="auth-card">
          <h2>Choose Signup Type</h2>
          <p className="auth-subtitle">
            Select how you want to register to College Connect
          </p>

          <button
            className="btn-primary auth-btn"
            onClick={() => navigate("/signup/student")}
          >
            🎓 Sign up as Student
          </button>

          <button
            className="btn-secondary auth-btn"
            onClick={() => navigate("/signup/faculty")}
          >
            👩‍🏫 Sign up as Faculty
          </button>

          {/* ❌ ADMIN SIGNUP REMOVED TEMPORARILY */}
          {/* Admin accounts will be created manually */}

          <p style={{ marginTop: 16, fontSize: 13, color: "#777" }}>
            Admin registration is currently disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
