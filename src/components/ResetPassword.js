import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { LockOutlined, SafetyOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const { Link } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mengirim permintaan ke API reset password
      const response = await axios.post("https://api-nasnus.vercel.app/api/reset-password", {
        username: localStorage.getItem("temp_username_reset") || values.username,
        email: localStorage.getItem("temp_email_reset") || values.email,
        resetToken: values.resetToken,
        newPassword: values.newPassword,
      });

      // Tampilkan pesan sukses
      localStorage.removeItem("temp_email_reset");
      localStorage.removeItem("temp_username_reset");
      message.success(response.data.message || "Password berhasil direset!");
      
      // Redirect ke halaman login setelah 1.5 detik
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Terjadi kesalahan. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
<div className="logo-header">
  <img src="/logo.png" alt="BPR Logo" />
  <h1>BPR Dashboard</h1>
</div>
<Card className="login-card" title={<span>🔑 Reset Password</span>}>
        <Typography.Text style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}>
          Masukkan username, token reset, dan password baru Anda.
        </Typography.Text>
        <Form name="reset-password" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            initialValue={localStorage.getItem("temp_username_reset") || ""}
            rules={[{ required: true, message: "Masukkan username Anda!" }]}
          >
            <Input readOnly disabled/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={localStorage.getItem("temp_email_reset") || ""}
            rules={[{ required: true, type: 'email', message: "Masukkan email Anda!" }]}
          >
            <Input placeholder="Email" readOnly disabled/>
          </Form.Item>
<Form.Item
            label="Token Reset"
            name="resetToken"
            rules={[{ required: true, message: "Masukkan token reset!" }]}
          >
            <Input prefix={<KeyOutlined />} placeholder="Token Reset" />
          </Form.Item>
<Form.Item
            label="Password Baru"
            name="newPassword"
            rules={[
              { required: true, message: "Masukkan password baru!" },
              { min: 6, message: "Password minimal 6 karakter!" }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password Baru" />
          </Form.Item>
<Form.Item
            label="Konfirmasi Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Konfirmasi password diperlukan!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password tidak cocok!"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<SafetyOutlined />} placeholder="Konfirmasi Password Baru" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          <Typography.Text>
            <Link onClick={() => navigate("/")}>Kembali ke Login</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;

