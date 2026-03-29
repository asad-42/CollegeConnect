// src/pages/StudentSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function StudentSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    admissionToken: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Send only required fields to backend
      const payload = {
        name: formData.name,
        dob: formData.dob,
        contact: formData.contact,
        email: formData.email,
        admissionToken: formData.admissionToken,
        password: formData.password,
      };

      await register(payload);

      alert(
        "Registration successful! Your account is pending admin approval."
      );

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err?.response || err);
      const msg =
        err?.response?.data?.message ||
        "Registration failed. Please check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-right" style={{ margin: "auto" }}>
        <div className="auth-card">
          <h2>Student Registration</h2>
          <p className="auth-subtitle">
            Create your student account (admin approval required)
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Full Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Date of Birth
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact Number
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Admission Token
              <input
                name="admissionToken"
                value={formData.admissionToken}
                onChange={handleChange}
                placeholder="ABC/2025-27/CSE/102"
                required
              />
            </label>

            {/* ✅ CREATE PASSWORD */}
            <label>
              Create Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </label>

            {/* ✅ CONFIRM PASSWORD */}
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </label>

            <button
              type="submit"
              className="btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
