import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const { Link } = Typography;

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("https://api-nasnus.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        if (data.email) localStorage.setItem("email", data.email);
        if (data.fullName) localStorage.setItem("fullName", data.fullName);
        if (data.emailVerified !== undefined)
          localStorage.setItem("emailVerified", data.emailVerified.toString());
        if (data.phoneVerified !== undefined)
          localStorage.setItem("phoneVerified", data.phoneVerified.toString());

        setIsAuthenticated(true);
        setUserRole(data.role);

        const emailVerified = localStorage.getItem("emailVerified");
        const fullName = localStorage.getItem("fullName");
        if (emailVerified !== "true" || !fullName) {
          message.info(
            "Silahkan lengkapi data terlebih dahulu. Verifikasi email Anda.",
          );
          setTimeout(() => {
            navigate("/dashboard/profile");
          }, 1500);
        } else {
          navigate("/dashboard/profile");
        }
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Terjadi kesalahan. Coba lagi.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Card className="login-card" title={<span>🔐 Masuk Akun</span>}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username Anda!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Masukkan password Anda!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="forgot-password-link">
          <Link onClick={() => navigate("/forgot-password")}>
            Lupa Password?
          </Link>
        </div>
        <div className="register-link">
          <Typography.Text>
            Belum punya akun?{" "}
            <Link onClick={() => navigate("/register")}>Daftar di sini</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;

