import React, { useEffect, useState } from "react";
import { Card, Avatar, List, Typography, Divider } from "antd";
import "../styles/Profile.css";

const { Title, Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data pengguna dari localStorage setelah login
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    setUserData({ username, role }); // Menyimpan username ke state
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // Tampilkan loading jika data masih diambil
  // }

  return (
    <div className="profile-container">
      <Title level={2} className="profile-header">Profile Page</Title>

      {/* Avatar Profile */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar
          size={150}
          src="https://via.placeholder.com/150"
          alt="Profile"
          style={{ borderRadius: "50%", marginBottom: "15px" }}
        />
        <Title level={3}>{userData?.username || ""}</Title>
      </div>

      {/* Card with User Info */}
      <Card title="Informasi Pengguna" bordered={false}>
        <div className="profile-info">
          <Text strong>Nama : </Text>
          <Text>{userData?.username || ""}</Text>
        </div>
        <div className="profile-info">
          <Text strong>Role/Jabatan : </Text>
          <Text>{userData?.role || ""}</Text>
        </div>
      </Card> 
    </div>
  );
};

export default Profile;
