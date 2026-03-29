import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminFacultyApprovals() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPendingFaculty = async () => {
    try {
      const res = await api.get("/api/admin/pending-faculty");
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load pending faculty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingFaculty();
  }, []);

  return (
    <div style={{ maxWidth: 1000 }}>
      <h2>Faculty Approvals 👨‍🏫</h2>
      <p>Pending faculty registration requests.</p>

      {loading && <p>Loading...</p>}
      {!loading && faculty.length === 0 && <p>No pending faculty.</p>}

      {faculty.map((f) => (
        <div key={f._id} className="approval-card">
          <h4>{f.name}</h4>
          <p><strong>Email:</strong> {f.email}</p>
          <p><strong>Department:</strong> {f.department}</p>

          <button
            className="btn-primary"
            onClick={() =>
              navigate(`/dashboard/admin/faculty/${f._id}`)
            }
          >
            View Full Details
          </button>
        </div>
      ))}
    </div>
  );
}
