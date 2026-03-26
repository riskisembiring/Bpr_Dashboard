import React, { useState, useEffect } from "react";
import { Card, Typography, Form, Input, Button, message, Steps } from "antd";
import { updateUserProfile } from "../services/userService.js";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/UpdateUser.css";

const { Title, Text } = Typography;

const UpdateUser = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Verifikasi Email',
      icon: <CheckCircleOutlined />,
      description: 'Pastikan email Anda terverifikasi',
    },
    {
      title: 'Lengkapi Data',
      icon: <UserOutlined />,
      description: 'Isi nama lengkap, telepon, alamat',
    },
  ];

  useEffect(() => {
    // Pre-fill from localStorage
    const fullName = localStorage.getItem("fullName") || "";
    const phone = localStorage.getItem("phone") || "";
    const address = localStorage.getItem("address") || "";
    form.setFieldsValue({ fullName, phone, address });
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        throw new Error("Username tidak ditemukan. Silakan login ulang.");
      }

      // Clean values for update
      const updates = {};
      if (values.fullName && values.fullName.trim() !== '') updates.fullName = values.fullName.trim();
      if (values.phone && values.phone.trim() !== '') updates.phone = values.phone.trim();
      if (values.address && values.address.trim() !== '') updates.address = values.address.trim();

      if (Object.keys(updates).length === 0) {
        message.warning("Tidak ada data yang diubah.");
        return;
      }

      await updateUserProfile(username, updates);
      
      // Save to localStorage
      localStorage.setItem("fullName", values.fullName);
      localStorage.setItem("phone", values.phone);
      localStorage.setItem("address", values.address);
      
      message.success("Data berhasil dilengkapi! Redirect ke dashboard...");
      
      // Call onComplete or navigate
      if (onComplete) {
        onComplete();
      } else {
        setTimeout(() => {
          window.location.href = "/dashboard/menu/collection";
        }, 1500);
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error(error.message || "Gagal update data");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="profile-container" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2} className="profile-header">Lengkapi Data Pengguna</Title>
      
      <Steps current={currentStep} items={steps} className="update-steps" />
      
      <Card title="Data Lengkap" style={{ marginTop: 24 }} bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          disabled={currentStep === 0}
        >
          <Form.Item
            label="Nama Lengkap *"
            name="fullName"
            rules={[{ required: true, message: 'Nama lengkap wajib diisi!' }]}
          >
            <Input placeholder="Masukkan nama lengkap Anda" />
          </Form.Item>
          
          <Form.Item
            label="No. Telepon *"
            name="phone"
            rules={[
              { required: true, message: 'No. telepon wajib diisi!' },
              { pattern: /^[0-9]+$/, message: 'Hanya angka!' }
            ]}
          >
            <Input placeholder="08xxxxxxxxx" />
          </Form.Item>
          
          <Form.Item
            label="Alamat Lengkap *"
            name="address"
            rules={[{ required: true, message: 'Alamat wajib diisi!' }]}
          >
            <Input.TextArea rows={3} placeholder="Masukkan alamat lengkap" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', gap: 12 }}>
              {currentStep === 0 && (
                <Button type="primary" onClick={nextStep}>
                  Lanjut ke Pengisian Data
                </Button>
              )}
              {currentStep === 1 && (
                <>
                  <Button onClick={() => setCurrentStep(0)}>
                    Kembali
                  </Button>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Simpan & Selesai
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      </Card>
      
      <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: 16 }}>
        Lengkapi data untuk akses penuh ke dashboard
      </Text>
    </div>
  );
};

export default UpdateUser;

