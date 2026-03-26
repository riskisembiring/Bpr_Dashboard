import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmailOTP from "./components/VerifyEmailOTP";
import DashboardLayout from "./components/Dashboard";
import Profile from "./components/Profile";
import Collection from "./collector/Collection";
import Deposito from "./efilling/Deposito";
import Kredit from "./efilling/Kredit";
import PengajuanKreditAo from "./pengajuanKreditAo/PengajuanKreditMarketingAo";
import PengajuanKreditAk from "./pengajuanKreditAk/PengajuanKreditMarketingAk";
import CetakMAK from "./cetakMAK/CetakMAK";
import StatistikData from "./components/StatistikData";

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

        {/* Route Register */}
        <Route path="/register" element={<Register />} />

        {/* Route Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Route Reset Password */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Route Email OTP Verification */}
        <Route path="/verify-email-otp" element={
          <VerifyEmailOTP 
            setIsAuthenticated={setIsAuthenticated} 
            setUserRole={setUserRole} 
          />
        } />

        {/* Route Dashboard Layout with profile check */}
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
          <Route path="menu/collection" element={<Collection userRole={userRole} />} />
          <Route path="menu/efiling/deposito" element={<Deposito />} />
          <Route path="menu/efiling/kredit" element={<Kredit />} />
          <Route path="menu/pengajuankredit" element={<PengajuanKreditAk />} />
          <Route path="menu/cetakMAK" element={<CetakMAK userRole={userRole} />} />
          <Route path="statistik-data" element={<StatistikData userRole={userRole} />} />
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

