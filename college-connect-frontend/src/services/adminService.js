// src/services/adminService.js
import api from "./api";

export const getPendingStudents = () =>
  api.get("/api/admin/pending-students");

export const approveStudent = (id) =>
  api.put(`/api/admin/approve/${id}`);

export const rejectStudent = (id) =>
  api.put(`/api/admin/reject/${id}`);
