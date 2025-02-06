import React, { useState } from "react";
import { Form, Input, Button, List, message } from "antd";

const Step3 = ({ form }) => {
  const [userGoals, setUserGoals] = useState([]); // Daftar tujuan pengguna
  const [userGoalInput, setUserGoalInput] = useState(""); // Input untuk tujuan pengguna

  const [debtProfiles, setDebtProfiles] = useState([]); // Daftar Profil Debitur
  const [debtProfileInput, setDebtProfileInput] = useState(""); // Input untuk Profil Debitur

  // Menambahkan tujuan pengguna ke dalam daftar
  const handleAddUserGoal = () => {
    console.log("Jumlah userGoals:", userGoals.length);
    if (userGoals.length >= 3) {
      message.warning("Anda sudah menambahkan 3 tujuan pengguna, tidak dapat menambah lagi.");
      return; // Menghentikan eksekusi fungsi jika sudah mencapai batas
    }
    if (userGoalInput.trim()) {
      const newUserGoals = [...userGoals, userGoalInput];
      setUserGoals(newUserGoals);

      form.setFieldsValue({
        userGoals: newUserGoals,
      });
      setUserGoalInput(""); // Reset tampilan input
    }
  };

  // Menghapus tujuan pengguna dari daftar
  const handleRemoveUserGoal = (index) => {
    const newUserGoals = userGoals.filter((_, i) => i !== index);
    setUserGoals(newUserGoals);

    form.setFieldsValue({
      userGoals: newUserGoals,
    });
  };

  // Menambahkan Profil Debitur ke dalam daftar
  const handleAddDebtProfile = () => {
    if (debtProfileInput.trim()) {
      const newDebtProfiles = [...debtProfiles, debtProfileInput];
      setDebtProfiles(newDebtProfiles);

      form.setFieldsValue({
        debtProfiles: newDebtProfiles,
      });

      setDebtProfileInput(""); // Reset tampilan input
    }
  };

  // Menghapus Profil Debitur dari daftar
  const handleRemoveDebtProfile = (index) => {
    const newDebtProfiles = debtProfiles.filter((_, i) => i !== index);
    setDebtProfiles(newDebtProfiles);

    form.setFieldsValue({
      debtProfiles: newDebtProfiles,
    });
  };

  // Menangani perubahan input untuk tujuan pengguna
  const handleUserGoalChange = (e) => {
    setUserGoalInput(e.target.value);
  };

  // Menangani perubahan input untuk Profil Debitur
  const handleDebtProfileChange = (e) => {
    setDebtProfileInput(e.target.value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        userGoals: [],
        debtProfiles: [],
      }}
    >
      {/* Input Tujuan Penggunaan */}
      <Form.Item label="Tujuan Penggunaan">
        <Input
          value={userGoalInput}
          onChange={handleUserGoalChange}
          placeholder="Masukkan tujuan penggunaan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddUserGoal}
        style={{ marginBottom: "16px" }}
        disabled={userGoals.length >= 3}
      >
        Tambah Tujuan Pengguna
      </Button>

      {/* Daftar Tujuan Pengguna */}
      <List
        header="Daftar Tujuan Pengguna (Max 3)"
        bordered
        dataSource={userGoals}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveUserGoal(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
        style={{ marginBottom: "24px" }}
      />

      {/* Input Profil Debitur & Hasil Cek Lingkungan */}
      <Form.Item label="Profil Debitur & Hasil Cek Lingkungan">
        <Input
          value={debtProfileInput}
          onChange={handleDebtProfileChange}
          placeholder="Masukkan Profil Debitur & Hasil Cek Lingkungan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddDebtProfile}
        style={{ marginBottom: "16px" }}
        disabled={userGoals.length >= 3}
      >
        Tambah Profil Debitur
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Profil Debitur & Hasil Cek Lingkungan (Max 3)"
        bordered
        dataSource={debtProfiles}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveDebtProfile(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      {/* Field Tersembunyi untuk Menyimpan Nilai */}
      <Form.Item name="userGoals" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="debtProfiles" hidden>
        <Input type="hidden" />
      </Form.Item>

      {/* Form Items lainnya */}
      {[
        { label: "Latar Belakang & Aktivitas Usaha", name: "businessBackground" },
        { label: "Supplier", name: "supplier" },
        { label: "Pemasaran / Distribusi", name: "marketing" },
        { label: "Kontrak Kerja yang Dimiliki", name: "contracts" },
        { label: "Rencana Pengembangan Usaha", name: "developmentPlan" },
        { label: "Foto Usaha", name: "businessPhotos" },
      ].map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={[
            { required: true, message: `Harap masukkan ${item.label}!` },
          ]}
        >
          <Input placeholder={`Masukkan ${item.label}`} />
        </Form.Item>
      ))}
    </Form>
  );
};

export default Step3;
