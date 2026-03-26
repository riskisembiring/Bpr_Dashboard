import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Form, Input, Button, message, Spin, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { updateUserProfile, getUserByUsername } from "../services/userService.js";

const { Title, Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;
        
        const fullUserData = await getUserByUsername(username);
        const role = localStorage.getItem("role");
        const joinedDate = fullUserData.createdAt ? new Date(fullUserData.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
        setUserData({ 
          ...fullUserData, 
          username, 
          role,
          joinedDate
        });
        form.setFieldsValue({
          fullName: fullUserData.fullName || "",
          phone: fullUserData.phone || "",
          address: fullUserData.address || "",
        });
      } catch (error) {
        console.error('Failed to load user data:', error);
        message.error("Gagal memuat data pengguna");
      } finally {
        setFullLoading(false);
      }
    };
    
    loadUserData();
  }, [form]);

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      const username = userData?.username;
      
      // Explicit updates - only editable fields, ensure no undefined
      const updates = {};
      if (values.fullName && values.fullName.trim() !== '') updates.fullName = values.fullName.trim();
      if (values.phone && values.phone.trim() !== '') updates.phone = values.phone.trim();
      if (values.address && values.address.trim() !== '') updates.address = values.address.trim();
      
      if (Object.keys(updates).length === 0) {
        message.warning("Tidak ada perubahan data.");
        return;
      }
      
      await updateUserProfile(username, updates);
      setUserData(prev => ({ ...prev, ...updates }));
      message.success("Data profil berhasil diperbarui! Lanjut OTP verifikasi email...");
      localStorage.setItem("temp_username", username);
      navigate("/verify-email-otp");
    } catch (error) {
      message.error(error.message || "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  if (fullLoading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <Spin size="large" />
          <div style={{ marginTop: 16, fontSize: '1.1rem', color: '#64748b' }}>
            Memuat data profil...
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="empty-state">
          <UserOutlined style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: 16 }} />
          <Title level={3}>Data profil tidak ditemukan</Title>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <Title className="profile-header" level={2}>Profil Pengguna</Title>
        <Text style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Kelola informasi profil Anda dengan aman
        </Text>
      </div>

      <div className="profile-avatar-section">
        <Avatar
          className="profile-avatar"
          src={userData.avatar || "/logo.png"}
          icon={<UserOutlined />}
          alt="Profile"
        />
        <Title className="profile-username" level={3}>
          {userData.username}
        </Title>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{userData.role}</div>
          <div className="stat-label">Role</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Aktif</div>
          <div className="stat-label">Status</div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 24, color: '#1e293b' }}>
            Informasi Kontak
          </div>
          <div className="info-row">
            <UserOutlined style={{ color: '#1677ff', fontSize: '1.2rem', marginRight: 12, minWidth: 24 }} />
            <div>
              <div className="info-label">Email</div>
              <div className="info-value">{userData.email || 'Belum diisi'}</div>
            </div>
          </div>
          <div className="info-row">
            <UserOutlined style={{ color: '#10b981', fontSize: '1.2rem', marginRight: 12, minWidth: 24 }} />
            <div>
              <div className="info-label">Telepon</div>
              <div className="info-value">{userData.phone || 'Belum diisi'}</div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 24, color: '#1e293b' }}>
            Informasi Pribadi
          </div>
          <div className="info-row">
            <UserOutlined style={{ color: '#f59e0b', fontSize: '1.2rem', marginRight: 12, minWidth: 24 }} />
            <div>
              <div className="info-label">Nama Lengkap</div>
              <div className="info-value">{userData.fullName || 'Belum diisi'}</div>
            </div>
          </div>
          <div className="info-row">
            <UserOutlined style={{ color: '#8b5cf6', fontSize: '1.2rem', marginRight: 12, minWidth: 24 }} />
            <div>
              <div className="info-label">Alamat Lengkap</div>
              <div className="info-value">{userData.address || 'Belum diisi'}</div>
            </div>
          </div>
        </div>
      </div>

      <Card className="update-form-card" title={<span style={{ fontWeight: 600, color: '#374151' }}>Perbarui Data Profil</span>}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          disabled={loading}
        >
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Nama Lengkap"
                name="fullName"
                rules={[{ required: true, message: 'Nama lengkap wajib diisi!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Masukkan nama lengkap" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="No. Telepon"
                name="phone"
                rules={[{ required: true, message: 'Nomor telepon wajib diisi!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="08xxxxxxxxxx" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Alamat Lengkap"
            name="address"
            rules={[{ required: true, message: 'Alamat wajib diisi!' }]}
          >
            <Input.TextArea rows={3} placeholder="Masukkan alamat lengkap" />
          </Form.Item>
          <Form.Item>
            <Button
              className="update-button"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {loading ? 'Memperbarui...' : 'Perbarui Profil & Verifikasi'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;

