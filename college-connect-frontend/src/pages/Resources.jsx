// src/pages/Resources.jsx
import React from "react";

const sampleResources = [
  {
    id: 1,
    title: "DSA Notes - Unit 1",
    subject: "Data Structures",
    type: "PDF",
    uploadedBy: "Prof Alice",
    semester: "5",
    department: "CSE",
    link: "#", // later this can be a real URL
  },
  {
    id: 2,
    title: "DBMS Slides - Normalization",
    subject: "DBMS",
    type: "PPT",
    uploadedBy: "Prof Bob",
    semester: "5",
    department: "CSE",
    link: "#",
  },
  {
    id: 3,
    title: "AI Question Bank",
    subject: "Artificial Intelligence",
    type: "DOC",
    uploadedBy: "Prof Carol",
    semester: "7",
    department: "CSE",
    link: "#",
  },
];

export default function Resources() {
  return (
    <div>
      <h2>Resources & Notes</h2>
      <p>Shared study materials for students. Later this will be connected to the backend.</p>

      <div
        style={{
          marginTop: 16,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          padding: 12,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Title</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Subject</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Type</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Department</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Semester</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Uploaded By</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sampleResources.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.title}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.subject}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.type}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.department}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.semester}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{r.uploadedBy}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>
                  {/* later this can download or open actual file */}
                  <button disabled>View / Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: "#777" }}>
        (Later: faculty can upload resources; students can filter by subject / semester.)
      </p>
    </div>
  );
}
