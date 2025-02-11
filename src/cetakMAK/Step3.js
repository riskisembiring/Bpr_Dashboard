import React, { useState } from "react";
import { Form, Input, Button, List, message } from "antd";
import axios from 'axios';

const Step3 = ({ form }) => {
  const [tests, settests] = useState([]);
  const [testInput, settestInput] = useState("");

  const [debtProfiles, setDebtProfiles] = useState([]);
  const [debtProfileInput, setDebtProfileInput] = useState(""); 

  const [file, setFile] = useState(null);
  const [businessPhotos, setbusinessPhotos] = useState('');
  const [isValidFile, setIsValidFile] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert('Pilih file terlebih dahulu!');
      setIsValidFile(false);
      return;
    }

    // Validasi ukuran file (max 500 KB)
    if (selectedFile.size > 500 * 1024) {
      setIsValidFile(false);
      alert('Ukuran file tidak boleh lebih dari 500 KB.');
      return;
    }

    // Validasi tipe file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Hanya file berformat JPEG, JPG, atau PNG yang diperbolehkan.');
      setIsValidFile(false);
      return;
    }
    setIsValidFile(true);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Pilih file terlebih dahulu!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setbusinessPhotos(response.data.data);
      form.setFieldsValue({ businessPhotos: response.data.data });
      alert('Upload berhasil!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat meng-upload file.');
    }
  };

  // Menambahkan tujuan pengguna ke dalam daftar
  const handleAddUserGoal = () => {
    console.log("Jumlah tests:", tests.length);
    if (tests.length >= 3) {
      message.warning("Anda sudah menambahkan 3 tujuan pengguna, tidak dapat menambah lagi.");
      return;
    }
    if (testInput.trim()) {
      const newtests = [...tests, testInput];
      settests(newtests);

      form.setFieldsValue({
        tests: newtests,
      });
      settestInput("");
    }
  };

  const handleRemoveUserGoal = (index) => {
    const newtests = tests.filter((_, i) => i !== index);
    settests(newtests);

    form.setFieldsValue({
      tests: newtests,
    });
  };

  const handleAddDebtProfile = () => {
    if (debtProfileInput.trim()) {
      const newDebtProfiles = [...debtProfiles, debtProfileInput];
      setDebtProfiles(newDebtProfiles);

      form.setFieldsValue({
        debtProfiles: newDebtProfiles,
      });

      setDebtProfileInput(""); 
    }
  };

  const handleRemoveDebtProfile = (index) => {
    const newDebtProfiles = debtProfiles.filter((_, i) => i !== index);
    setDebtProfiles(newDebtProfiles);

    form.setFieldsValue({
      debtProfiles: newDebtProfiles,
    });
  };

  const handleUserGoalChange = (e) => {
    settestInput(e.target.value);
  };

  const handleDebtProfileChange = (e) => {
    setDebtProfileInput(e.target.value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        tests: [],
        debtProfiles: [],
      }}
    >
      <Form.Item label="Tujuan Penggunaan">
        <Input
          value={testInput}
          onChange={handleUserGoalChange}
          placeholder="Masukkan tujuan penggunaan"
        />
        </Form.Item>
      <Button
        type="primary"
        onClick={handleAddUserGoal}
        style={{ marginBottom: "16px" }}
        disabled={tests.length >= 3}
      >
        Tambah Tujuan Pengguna
      </Button>

      <List
        header="Daftar Tujuan Pengguna (Max 3)"
        bordered
        dataSource={tests}
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
        disabled={debtProfiles.length >= 3}
      >
        Tambah Profil Debitur
      </Button>

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
      <Form.Item name="tests" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="debtProfiles" hidden>
        <Input type="hidden" />
      </Form.Item>
      
      {[
        { label: "Latar Belakang & Aktivitas Usaha", name: "businessBackground" },
        { label: "Supplier", name: "supplier" },
        { label: "Pemasaran / Distribusi", name: "marketing" },
        { label: "Kontrak Kerja yang Dimiliki", name: "contracts" },
        { label: "Rencana Pengembangan Usaha", name: "developmentPlan" },
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
      <Form.Item label="Upload Foto Usaha" name='businessPhotos' rules={[{ required: true }]}>
        <Input type="file" onChange={handleFileChange} name={businessPhotos}/>
        <Button onClick={handleUpload} disabled={!isValidFile} >Upload Foto</Button>
        </Form.Item>

        {businessPhotos && (
        <div>
          <h3 style={{fontWeight: 'normal'}}>Foto yang di-upload:</h3>
          <img src={businessPhotos} alt="Uploaded" style={{ maxWidth: '150px' }} />
        </div>
      )}
    </Form>
  );
};

export default Step3;
