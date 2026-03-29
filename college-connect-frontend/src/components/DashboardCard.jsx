// src/components/DashboardCard.jsx
import React from "react";

export default function DashboardCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        minWidth: 180,
        marginRight: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ fontSize: 13, color: "#777" }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>{value}</div>
      {subtitle && (
        <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{subtitle}</div>
      )}
    </div>
  );
}
