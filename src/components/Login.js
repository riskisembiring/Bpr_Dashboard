import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  const onFinish = (values) => {
    setLoading(true);
    if (values.username === "collector" && values.password === "12345") {
      message.success("Login berhasil!");
      setIsAuthenticated(true);
      setUserRole("collector");
      navigate("/dashboard/profile");  // Redirect to profile after login
    } else if (values.username === "verifikator" && values.password === "verifikator123") {
      message.success("Login berhasil!");
      setIsAuthenticated(true);
      setUserRole("verifikator");
      navigate("/dashboard/profile");  // Redirect to profile after login
    } else if (values.username === "direksi" && values.password === "direksi123") {
      message.success("Login berhasil!");
      setIsAuthenticated(true);
      setUserRole("direksi");
      navigate("/dashboard/profile");  // Redirect to profile after login
    } else {
      message.error("Username atau password salah!");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card title="Login" style={{ width: 300 }}>
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
      </Card>
    </div>
  );
};

export default Login;
