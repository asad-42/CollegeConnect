import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get(`/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => alert("Failed to load user"));
  }, [id]);

  const approve = async () => {
    await api.put(`/api/admin/approve-user/${id}`, { comment });
    alert("Approved successfully");
    navigate(-1);
  };

  const reject = async () => {
    if (!comment) {
      return alert("Rejection comment required");
    }
    await api.put(`/api/admin/reject-user/${id}`, { comment });
    alert("Rejected successfully");
    navigate(-1);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>{user.role.toUpperCase()} DETAILS</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Department:</strong> {user.department}</p>

      {user.role === "student" && (
        <>
          <p><strong>DOB:</strong> {new Date(user.dob).toDateString()}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Admission Token:</strong> {user.admissionToken}</p>
        </>
      )}

      {user.role === "faculty" && (
        <>
          <p><strong>Aadhar:</strong> {user.aadharId}</p>
          <p><strong>PAN:</strong> {user.panId}</p>
          <p><strong>Bank:</strong> {user.bankDetails?.bankName}</p>
        </>
      )}

      <textarea
        placeholder="Admin comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "100%", marginTop: 20 }}
      />

      <div style={{ marginTop: 20 }}>
        <button className="btn-primary" onClick={approve}>Approve</button>
        <button className="btn-outline" onClick={reject} style={{ marginLeft: 10 }}>
          Reject
        </button>
      </div>
    </div>
  );
}
