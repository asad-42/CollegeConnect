// src/pages/DashboardRouter.jsx
import React from "react";
import { getCurrentUser } from "../services/authService";
import DashboardStudent from "./DashboardStudent";
import DashboardFaculty from "./DashboardFaculty";
import DashboardAdmin from "./DashboardAdmin";

export default function DashboardRouter() {
  const user = getCurrentUser();
  const role = user?.role;

  if (role === "admin") return <DashboardAdmin />;
  if (role === "faculty") return <DashboardFaculty />;
  // default -> student
  return <DashboardStudent />;
}
