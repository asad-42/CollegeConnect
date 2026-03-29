// src/pages/FacultySignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FacultySignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    contact: "",
    aadhaar: "",
    pan: "",
    address: "",
    bankAccount: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await api.post("/api/auth/register", {
        ...formData,
        role: "faculty",
      });

      setSuccess(
        "Faculty registration submitted. Awaiting admin approval."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Faculty registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-right">
        <div className="auth-card">
          <h2>Faculty Registration</h2>
          <p className="auth-subtitle">
            Submit your details (admin approval required)
          </p>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department (e.g. CSE, MBA)"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <input
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <input
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleChange}
              required
            />

            <input
              name="pan"
              placeholder="PAN Number"
              value={formData.pan}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address Proof"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              name="bankAccount"
              placeholder="Bank Account Details"
              value={formData.bankAccount}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-primary auth-btn">
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
