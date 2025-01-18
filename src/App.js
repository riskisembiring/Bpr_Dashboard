import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/Dashboard";
import Profile from "./components/Profile";
import Collection from "./components/Collection";
import EFiling from "./components/Efiling";
import AboutUs from "./components/AboutUs";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(""); // State untuk menyimpan role user

  return (
    <Router>
      <Routes>
        {/* Route Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard/profile" replace />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole} // Pass fungsi ke Login
              />
            )
          }
        />

        {/* Route Dashboard Layout */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout
                setIsAuthenticated={setIsAuthenticated}
                userRole={userRole} // Pass userRole ke DashboardLayout
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          {/* Halaman dalam Dashboard */}
          <Route path="profile" element={<Profile />} />
          <Route path="maintenance/collection" element={<Collection userRole={userRole} />} />
          <Route path="maintenance/efiling" element={<EFiling />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>

        {/* Route default untuk Dashboard ke Profile */}
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/profile" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
