import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Kredit = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk modal
  const [form] = Form.useForm(); // Ant Design form instance

  const dataSource = [
    {
      key: "1",
      nama: "John Doe",
      noHp: "081234567890",
      tanggal: "2025-01-15",
    },
    {
      key: "2",
      nama: "Jane Smith",
      noHp: "082112223334",
      tanggal: "2025-01-20",
    },
    {
      key: "3",
      nama: "David Johnson",
      noHp: "083456789012",
      tanggal: "2025-01-25",
    },
  ];

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "No HP",
      dataIndex: "noHp",
      key: "noHp",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleNewClick = () => {
    setIsModalVisible(true); // Tampilkan modal ketika tombol "New" diklik
  };

  const handleCancelModal = () => {
    setIsModalVisible(false); // Sembunyikan modal
    form.resetFields(); // Reset form setelah modal ditutup
  };

  const handleSaveModal = async () => {
    try {
      const values = await form.validateFields();

      // Buat FormData
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("noHp", values.noHp);
      formData.append("tanggal", values.tanggal);

      // Tambahkan file ke FormData
      ["keuangan", "koran", "slik", "jaminan"].forEach((field) => {
        if (values[field]?.file?.originFileObj) {
          formData.append(field, values[field].file.originFileObj);
        } else {
          console.error(`File untuk ${field} tidak ditemukan`);
        }
      });

      // Kirim request ke backend
      const response = await fetch("http://localhost:3000/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        message.success(result.message || "Data berhasil disimpan!");
      } else {
        const error = await response.json();
        message.error("Gagal menyimpan data!");
      }
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Harap lengkapi semua data!");
    }
  };

  const filteredData = dataSource.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      item.noHp.includes(searchText) ||
      item.tanggal.includes(searchText)
  );

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "16px" }}>Kredit</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Cari berdasarkan nama, No HP, atau tanggal"
          value={searchText}
          onChange={handleSearch}
          style={{ marginRight: "8px", width: "300px" }}
        />
        <Button type="primary" onClick={handleNewClick}>
          New
        </Button>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal untuk Tambah Data */}
      <Modal
        title="Tambah Data Baru"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        onOk={handleSaveModal}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form
          form={form}
          layout="horizontal"
          initialValues={{
            nama: "",
            noHp: "",
            tanggal: "",
          }}
        >
          <Form.Item
            label="Nama :"
            name="nama"
            rules={[{ required: true, message: "Nama harus diisi!" }]}
          >
            <Input placeholder="Masukkan nama" />
          </Form.Item>

          <Form.Item
            label="No HP :"
            name="noHp"
            rules={[{ required: true, message: "No HP harus diisi!" }]}
          >
            <Input placeholder="Masukkan No HP" />
          </Form.Item>

          <Form.Item
            label="Tanggal :"
            name="tanggal"
            rules={[{ required: true, message: "Tanggal harus diisi!" }]}
          >
            <Input type="date" />
          </Form.Item>

          {["keuangan", "koran", "slik", "jaminan"].map((field) => (
            <Form.Item
              key={field}
              label={`Data ${field.charAt(0).toUpperCase() + field.slice(1)} :`}
              name={field}
              rules={[{ required: true, message: `Data ${field} harus di-upload!` }]}
            >
              <Upload
                name={field}
                listType="text"
                maxCount={1}
                beforeUpload={() => false} // Prevent auto upload
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default Kredit;
