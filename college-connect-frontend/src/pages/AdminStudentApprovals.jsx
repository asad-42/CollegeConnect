import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminStudentApprovals() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ================= FETCH PENDING STUDENTS =================
  const fetchPendingStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/pending-students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending student approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  // ================= UI =================
  return (
    <div style={{ maxWidth: 1000 }}>
      <h2>
        Student Approvals <span role="img" aria-label="student">🧑‍🎓</span>
      </h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Review pending student registration requests.
      </p>

      {loading && <p>Loading pending students...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && students.length === 0 && (
        <p>No pending student approvals.</p>
      )}

      {students.map((student) => (
        <div key={student._id} className="approval-card">
          <div className="approval-info">
            <h4>{student.name}</h4>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Admission Token:</strong> {student.admissionToken}</p>
            <p><strong>Contact:</strong> {student.contact}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span className="status-pending">PENDING</span>
            </p>
          </div>

          <div className="approval-actions">
            <button
              className="btn-primary"
              onClick={() =>
                navigate(`/dashboard/admin/students/${student._id}`)
              }
            >
              View Full Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
