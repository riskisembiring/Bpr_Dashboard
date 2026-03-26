import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography, Select } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
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
      const response = await axios.post("https://api-nasnus.vercel.app/api/add-user", {
        username: values.username,
        userRole: values.role,
        password: values.password,
        email: values.email || null,
        phone: values.phone || null,
        fullName: values.fullName || null,
        address: values.address || null,
      });

      if (values.email) {
        localStorage.setItem("temp_username", values.username);
        localStorage.setItem("temp_email", values.email);
        message.success("Pendaftaran berhasil! Verifikasi email OTP.").then(() => {
          navigate("/verify-email-otp");
        });
      } else {
        message.success(response.data.message || "Pendaftaran berhasil!").then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Terjadi kesalahan saat mendaftar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card" title={<span>📝 Daftar Akun Baru</span>}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Posisi atau Jabatan"
            name="role"
            rules={[{ required: true, message: "Pilih Posisi atau Jabatan!" }]}
          >
            <Select placeholder="Pilih Role">
              <Option value="collector">Collector</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="adminKredit">Admin Kredit</Option>
              <Option value="analisis">Analisis</Option>
              <Option value="direksi" disabled>Direksi</Option>
              <Option value="verifikator" disabled>Verifikator</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username Anda!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: "Masukkan email valid!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{required: true, message: "Masukkan nomor HP anda!"}]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{required: true, message: "Masukkan nama lengkap anda!"}]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Alamat"
            name="address"
            rules={[{required: true, message: "Masukkan alamat anda!"}]}
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Masukkan password Anda!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Konfirmasi Password"
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
            <Input.Password prefix={<SafetyOutlined />} placeholder="Konfirmasi Password" />
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

