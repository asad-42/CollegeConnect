// src/services/eventService.js
import api from "./api";

// Get events list
export const getApprovedEvents = async () => {
  try {
    const response = await api.get("/api/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
};

// Create event
export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/api/events", eventData);
    return response.data;
  } catch (err) {
    console.error("Create event error:", err?.response || err);
    throw err;
  }
};
