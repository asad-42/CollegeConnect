// src/services/authService.js
import api from "./api";

export const register = (payload) => api.post("/api/auth/register", payload);
export const login = (payload) => api.post("/api/auth/login", payload);
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const saveAuth = (data) => {
  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
};
export const getCurrentUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
