import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const { Link } = Typography;

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const onFinish = async (values) => {
  console.log("Form values:", values); // Memeriksa nilai yang dikirim ke backend
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
    console.log("Backend response:", data); // Memeriksa respons dari backend
    if (response.ok) {
      message.success(data.message);
      setIsAuthenticated(true);
      setUserRole(data.role);
      navigate("/dashboard/profile");
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
    <Card className="login-card" title="Login">
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Masukkan username Anda!" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Masukkan password Anda!" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="register-link">
        <Typography.Text>
          Belum punya akun? <Link onClick={() => navigate("/register")}>Daftar di sini</Link>
        </Typography.Text>
      </div>
    </Card>
  </div>
);
};

export default Login;
