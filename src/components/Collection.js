import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Input, Form, Select, Radio } from "antd";
import ExportToExcel from "./ExportToExcel";
import CameraCapture from "./CameraCapture";
import Location from "./Location";
import "../styles/Collection.css";

const { Option } = Select;

const Collection = ({ userRole }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const locationRef = useRef(null);
  const cameraRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const keteranganOptions = [
    "Pembayaran cicilan per bulan.",
    "Keterlambatan pembayaran.",
    "Penyelesaian penuh.",
    "Penjadwalan ulang pembayaran.",
  ];

  const aktifitasOptions = [
    "Bertemu Debitur",
    "Tidak bertemu debitur",
    "Debitur melakukan pembayaran",
    "Debitur membuat janji bayar",
    "Debitur melakukan perlawanan",
  ];

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-nasnus.vercel.app/api/data");
        const result = await response.json();
        setData(result); // Menyimpan data dari API ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleNew = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsModalVisible(true);
    setCurrentRecord(null);
    // setCurrentRecord(record);
    form.setFieldsValue(record);
  };

  const handleSave = async (values) => {
    const updatedLocation = currentRecord?.location ?? locationRef.current?.getLocation() ?? "Unknown Location";
    const updatedFoto = currentRecord?.foto || "";
  
    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    try {
      if (isEditing && currentRecord) {
        // Update data di Firestore (dengan menyertakan ID di URL)
        const response = await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...currentRecord,
            ...values,
            location: updatedLocation,
            foto: updatedFoto,
            tanggal: currentDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Gagal memperbarui data di server");
        }
      } else {
        // Data baru untuk ditambahkan
        const newRecord = {
          key: `${data.length + 1}`,
          ...values,
          location: updatedLocation,
          foto: updatedFoto,
          tanggal: currentDate,
        };
  
        // Tambahkan data baru ke Firestore
        const response = await fetch("https://api-nasnus.vercel.app/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        });
  
        if (!response.ok) {
          throw new Error("Gagal menambahkan data baru ke server");
        }
      }
  
      // Setelah berhasil, panggil API untuk mendapatkan data terbaru
      const fetchDataResponse = await fetch("https://api-nasnus.vercel.app/api/data");
      if (!fetchDataResponse.ok) {
        throw new Error("Gagal mendapatkan data dari server");
      }
      const updatedData = await fetchDataResponse.json();
  
      // Perbarui state lokal dengan data terbaru
      setData(updatedData);
      if (cameraRef.current) {
        cameraRef.current.stopCamera(); // Panggil stopCamera di CameraCapture
      }
      locationRef.current?.resetLocation();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };
  

  const handleStatusChange = async (value, record) => {
    try {
      // Update data lokal
      const updatedData = data.map((item) =>
        item.key === record.key
          ? { ...item, status: value === "" ? "Belum di cek" : value }
          : item
      );
      setData(updatedData);
  
      // Kirim perubahan ke server menggunakan API
      await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...record,
          status: value === "" ? "Belum di cek" : value,
        }),
      }); 
      console.log("Status updated successfully on the server");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFileChange = (foto) => {
    setCurrentRecord((prev) => ({ ...prev, foto }));
  };

  const handleCatatanChange = async (value, record) => {
    try {
      const updatedData = data.map((item) =>
        item.key === record.key ? { ...item, catatan: value } : item
      );
      setData(updatedData);

    await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...record,
        catatan: record.catatan
      }),
    });
    console.log("Catatan updated successfully on the server");
  } catch (error) {
    console.error("Error updating catatan:", error);
  }
};

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    locationRef.current?.resetLocation();
    handleFileChange(null);
    if (cameraRef.current) {
      cameraRef.current.stopCamera();
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const updateLocation = (location) => {
    if (isEditing && currentRecord) {
      const updatedData = data.map((item) =>
        item.key === currentRecord.key ? { ...item, location } : item
      );
      setData(updatedData);
    } else {
      setCurrentRecord((prev) => ({ ...prev, location }));
    }
  };

  const filteredData = userRole === 'direksi'
  ? data.filter((item) =>
      searchText === "" || 
      (item.status && item.status.toLowerCase().includes(searchText.toLowerCase()))
    )
  : data.filter((item) =>
      item.namaDebitur?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.aktifitas?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSelectId = (id) => {
      setSelectedId(id);
    };

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      hidden: userRole === 'direksi' ? false : true,
      sorter: (a, b) => new Date(a.tanggal) - new Date(b.tanggal),
    },
    {
      title: "Nama Debitur",
      dataIndex: "namaDebitur",
      key: "namaDebitur",
      sorter: (a, b) => a.namaDebitur.localeCompare(b.namaDebitur),
    },
    {
      title: "Aktifitas",
      dataIndex: "aktifitas",
      key: "aktifitas",
      sorter: (a, b) => a.aktifitas.localeCompare(b.aktifitas),
    },
    {
      title: "Hasil",
      dataIndex: "hasil",
      key: "hasil",
      sorter: (a, b) => new Date(a.hasil) - new Date(b.hasil),
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      sorter: (a, b) => new Date(a.keterangan) - new Date(b.keterangan),
    },
    {
      title: "Foto",
      dataIndex: "foto",
      key: "foto",
      sorter: (a, b) => new Date(a.foto) - new Date(b.foto),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => new Date(a.location) - new Date(b.location),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: "10px" }} disabled={userRole !== "collector"}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      hidden: userRole === 'collector' ? true : false,
      render: (_, record) => (
        <div>
          <Select
            value={record.status || "Belum di cek"} // pastikan ada nilai default
            style={{ width: 120, marginRight: "10px" }}
            onChange={(value) => handleStatusChange(value, record)}
            disabled={userRole !== "verifikator"}
          >
            <Option value='Belum di cek'>Pilih Status</Option>
            <Option value="approve">Approve</Option>
            <Option value="reject">Reject</Option>
          </Select>
          <Input
            value={record.catatan || ""} // pastikan ada nilai default
            placeholder="Catatan"
            style={{ width: 122 }}
            disabled={userRole !== "verifikator"}
            onChange={(e) => handleCatatanChange(e.target.value, record)}
          />
        </div>
      ),
    }
  ];

  return (
<div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Search Input */}
        <Input
          placeholder={userRole === "direksi" ? "Search by Status (Approve/Reject/Belum di cek)" : "Search by Nama Debitur or Aktifitas"}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 320 }}
        />

        <div>
          <Button onClick={handleNew} type="primary" style={{ marginRight: "20px" }} disabled={userRole !== "collector"}>
            New
          </Button>

          {/* Button Export to Excel */}
          <ExportToExcel data={data} disabled={userRole === "collector"} />
        </div>
      </div>

      <Table
        columns={columns.filter((column) => !column.hidden)}
        dataSource={filteredData}
        rowKey="key"
        onRow={(record) => ({
          onClick: () => handleSelectId(record.id),
          style: {
            backgroundColor: selectedId === record.id ? "#e6f7ff" : "", // Menandai baris yang dipilih
          },
        })}
        scroll={{ x: 1200, y: 400 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isEditing ? "Edit Data" : "New Data"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
      >
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <Form
            key={currentRecord?.key || "new"}
            form={form}
            initialValues={{
              ...currentRecord,
              tanggal: new Date().toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            }}
            onFinish={handleSave}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            {/* Input Tanggal */}
            <Form.Item
              label="Tanggal"
              name="tanggal"
              hidden={true}
            >
              <Input
                value={new Date().toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              />
            </Form.Item>

            {/* Input Nama Debitur */}
            <Form.Item
              label="Nama Debitur"
              name="namaDebitur"
              rules={[{ required: true, message: "Please input Nama Debitur!" }]}
            >
              <Input />
            </Form.Item>

            {/* Input Aktifitas */}
            <Form.Item
              label="Aktifitas"
              name="aktifitas"
              rules={[{ required: true, message: "Please select Aktifitas!" }]}
            >
              <Radio.Group>
                {aktifitasOptions.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Hasil" name="hasil" rules={[{ required: true, message: "Please select Hasil!" }]}>
              <Select>
                {keteranganOptions.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Input Keterangan */}
            <Form.Item label="Keterangan" name="keterangan"
              rules={[{ required: true, message: "Please input keterangan!" }]}>
              <Input />
            </Form.Item>

            {/* Camera Component */}
            <CameraCapture ref={cameraRef} handleFileChange={handleFileChange} />

            {/* Location Component */}
            <Location ref={locationRef} updateLocation={updateLocation} />

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Update" : "Create"}
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Collection;
