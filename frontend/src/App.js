import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import AddAssignment from "./pages/AddAssignment";
import ManageUsers from "./pages/ManageUsers";
import ManageBatches from "./pages/ManageBatches";
import FeeManagement from "./pages/FeeManagement";
import LeadManagement from "./pages/LeadManagement";
import Unauthorized from "./pages/Unauthorized";
import Auth from "./components/Auth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<ProtectedRoute roles={["Admin", "Instructor", "Student"]}><div /></ProtectedRoute>} />
          <Route path="assignments" element={<ProtectedRoute roles={["Student", "Instructor", "Admin"]}><Assignments /></ProtectedRoute>} />
          <Route path="add-assignment" element={<ProtectedRoute roles={["Instructor"]}><AddAssignment /></ProtectedRoute>} />
          <Route path="manage-users" element={<ProtectedRoute roles={["Admin"]}><ManageUsers /></ProtectedRoute>} />
          <Route path="manage-batches" element={<ProtectedRoute roles={["Admin"]}><ManageBatches /></ProtectedRoute>} />
          <Route path="manage-fees" element={<ProtectedRoute roles={["Admin"]}><FeeManagement /></ProtectedRoute>} />
          <Route path="manage-leads" element={<ProtectedRoute roles={["Admin"]}><LeadManagement /></ProtectedRoute>} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="profile" element={<ProtectedRoute roles={["Admin", "Instructor", "Student"]}><Profile /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
