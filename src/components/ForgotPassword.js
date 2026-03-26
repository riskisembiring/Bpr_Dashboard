import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const { Link } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://api-nasnus.vercel.app/api/forgot-password", {
        email: values.email,
        username: values.username,
      });

      localStorage.setItem("temp_email_reset", values.email);
      localStorage.setItem("temp_username_reset", values.username);
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken);
        message.success(response.data.message || "Token reset password berhasil dibuat!");
      } else {
        message.success(response.data.message || "Link reset password telah dikirim ke email!");
      }
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
      <Card className="login-card" title="Lupa Password">
        {!resetToken ? (
          <>
            <Typography.Text style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}>
              Masukkan username dan email Anda untuk mendapatkan token reset password.
            </Typography.Text>
            <Form name="forgot-password" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Masukkan username!" },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: "Username hanya huruf, angka, underscore!" }
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: "Masukkan email valid!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Dapatkan Token Reset
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              background: '#f6ffed', 
              border: '1px solid #b7eb8f', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <Typography.Title level={5} style={{ color: '#52c41a', marginBottom: '10px' }}>
                Token Reset Password
              </Typography.Title>
              <Typography.Paragraph style={{ wordBreak: 'break-all', fontWeight: 'bold' }}>
                {resetToken}
              </Typography.Paragraph>
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                Token ini berlaku selama 15 menit.
              </Typography.Text>
            </div>
            <Button 
              type="primary" 
              block 
              onClick={() => navigate("/reset-password")}
            >
              Lanjut Reset Password
            </Button>
          </>
        )}
        <div className="register-link">
          <Typography.Text>
            Ingat password Anda?{" "}
            <Link onClick={() => navigate("/")}>Kembali ke Login</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;

