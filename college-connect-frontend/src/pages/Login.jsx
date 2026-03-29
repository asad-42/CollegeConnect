// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveAuth } from "../services/authService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData);
      const data = response?.data || response;

      // 🔹 Allow admin login even if approvalStatus exists
      if (
        data?.user?.role !== "admin" &&
        data?.user?.approvalStatus === "PENDING"
      ) {
        setError("Account pending admin approval");
        return;
      }

      saveAuth(data);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo-circle">CC</div>
          <div>
            <h1>College Connect</h1>
            <p>Stay updated with every important college announcement.</p>
          </div>
        </div>

        <ul className="auth-highlights">
          <li>✅ Role-based access</li>
          <li>✅ Secure authentication</li>
          <li>✅ Admin-controlled approvals</li>
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email / Username
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="btn-primary auth-btn">
              Login
            </button>
          </form>

          <button
            className="auth-link-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
