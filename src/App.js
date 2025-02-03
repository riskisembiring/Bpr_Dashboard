import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardLayout from "./components/Dashboard";
import Profile from "./components/Profile";
import Collection from "./collector/Collection";
import Deposito from "./efilling/Deposito";
import Kredit from "./efilling/Kredit";
import PengajuanKreditAo from "./pengajuanKreditAo/PengajuanKreditMarketingAo";
import PengajuanKreditAk from "./pengajuanKreditAk/PengajuanKreditMarketingAk";
import CetakMAK from "./cetakMAK/CetakMAK";
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

        {/* Route Register */}
        <Route path="/register" element={<Register />} />

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
          <Route path="menu/collection" element={<Collection userRole={userRole} />} />
          <Route path="menu/efiling/deposito" element={<Deposito />} />
          <Route path="menu/efiling/kredit" element={<Kredit />} />
          {/* Rute dinamis berdasarkan userRole */}
            {userRole === "marketing" ? (
              <Route path="menu/pengajuanKreditAo" element={<PengajuanKreditAo />} />
            ) : userRole === "adminKredit" ? (
              <Route path="menu/pengajuanKreditAk" element={<PengajuanKreditAk />} />
            ) : (
              // Default jika userRole tidak cocok
              <Route path="*" element={<Navigate to="/not-authorized" replace />} />
            )}
          <Route path="menu/cetakMAK" element={<CetakMAK />} />
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
