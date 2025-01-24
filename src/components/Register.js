import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const { Link } = Typography;
const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Kirim data ke backend melalui API endpoint
      const response = await axios.post("https://api-nasnus.vercel.app/api/add-user", {
        username: values.username,
        email: values.email,
        userRole: values.role,
        password: values.password,
      });

      // Tampilkan pesan sukses dan redirect ke halaman login
      message.success(response.data.message || "Pendaftaran berhasil!").then(() => {
        navigate("/");
      })
    } catch (error) {
      // Tampilkan pesan error jika terjadi kegagalan
      message.error(
        error.response?.data?.message || "Terjadi kesalahan saat mendaftar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card" title="Register">
        <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
            label="Posisi atau Jabatan"
            name="role"
            rules={[{ required: true, message: "Pilih Posisi atau Jabatan!" }]}
          >
            <Select placeholder="Pilih Role">
              <Option value="collector">Collector</Option>
              <Option value="direksi">Direksi</Option>
              <Option value="verifikator">Verifikator</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username Anda!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          {/* <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Masukkan email Anda!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item> */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Masukkan password Anda!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Konfirmasi password diperlukan!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password tidak cocok!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Konfirmasi Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Daftar
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          <Typography.Text>
            Sudah punya akun?{" "}
            <Link onClick={() => navigate("/")}>Kembali ke login</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;
