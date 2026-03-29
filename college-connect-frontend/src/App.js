// src/App.js
import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import "./App.css"; // 👈 global modern styles

/* ================= PAGES ================= */
import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";
import StudentSignup from "./pages/StudentSignup";
import FacultySignup from "./pages/FacultySignup"; // ✅ STEP 2.1 ADDED

import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import DashboardRouter from "./pages/DashboardRouter";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import CreateEventPage from "./pages/CreateEventPage";
import AdminApprovals from "./pages/AdminApprovals";

/* ================= COMPONENTS ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />

        {/* Signup selection page */}
        <Route path="/signup" element={<SignupChoice />} />

        {/* Student self-registration */}
        <Route path="/signup/student" element={<StudentSignup />} />

        {/* ✅ STEP 2.1: Faculty self-registration */}
        <Route path="/signup/faculty" element={<FacultySignup />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardRouter />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Announcements */}
        <Route
          path="/dashboard/announcements"
          element={
            <ProtectedRoute>
              <Layout>
                <Announcements />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/announcements/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateAnnouncement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Resources */}
        <Route
          path="/dashboard/resources"
          element={
            <ProtectedRoute>
              <Layout>
                <Resources />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Events */}
        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Layout>
                <Events />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/events/create"
          element={
            <ProtectedRoute roles={["admin", "faculty"]}>
              <Layout>
                <CreateEventPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin announcements moderation */}
        <Route
          path="/dashboard/admin/announcements"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Layout>
                <AdminAnnouncements />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin approvals (students + faculty) */}
        <Route
          path="/dashboard/admin/approvals"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Layout>
                <AdminApprovals />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
