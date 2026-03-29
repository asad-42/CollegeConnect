// src/services/announcementService.js
import api from "./api";

/**
 * Fetch all announcements
 */
export const fetchAnnouncements = async () => {
  const res = await api.get("/api/announcements");
  return res.data;
};

/**
 * Get a single announcement by ID
 */
export const getAnnouncement = async (id) => {
  const res = await api.get(`/api/announcements/${id}`);
  return res.data;
};

/**
 * Create a new announcement
 */
export const createAnnouncement = async (payload) => {
  const res = await api.post("/api/announcements", payload);
  return res.data;
};

/**
 * Update announcement by ID (used for faculty editing their own pending announcements)
 */
export const updateAnnouncement = async (id, payload) => {
  try {
    // Most likely your backend uses PUT /api/announcements/:id
    const res = await api.put(`/api/announcements/${id}`, payload);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;

    // Fallback: if PUT is not supported, try PATCH
    if (status === 404 || status === 405) {
      const res2 = await api.patch(`/api/announcements/${id}`, payload);
      return res2.data;
    }

    throw err;
  }
};

/**
 * Approve announcement by ID.
 *
 * Tries two common backend patterns:
 * 1) PATCH /api/announcements/:id/approve
 * 2) PATCH /api/announcements/:id  { status: "approved" }
 */
export const approveAnnouncement = async (id) => {
  try {
    // Try backend style: PATCH /:id/approve
    const res = await api.patch(`/api/announcements/${id}/approve`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;

    // If that route doesn't exist / method not allowed,
    // fall back to PATCH /:id with a status body
    if (status === 404 || status === 405) {
      const res2 = await api.patch(`/api/announcements/${id}`, {
        status: "approved",
      });
      return res2.data;
    }

    // For any other error, let caller handle it
    throw err;
  }
};

/**
 * Delete announcement by ID
 */
export const deleteAnnouncement = async (id) => {
  const res = await api.delete(`/api/announcements/${id}`);
  return res.data;
};
