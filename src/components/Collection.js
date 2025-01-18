import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import ExportToExcel from "./ExportToExcel";
import CameraCapture from "./CameraCapture";
import Location from "./Location";

const { Option } = Select;

const Collection = ({ userRole }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const locationRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const keteranganOptions = [
    "Pembayaran cicilan per bulan.",
    "Keterlambatan pembayaran.",
    "Penyelesaian penuh.",
    "Penjadwalan ulang pembayaran.",
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("collectionData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("collectionData", JSON.stringify(data));
    }
  }, [data]);

  const handleNew = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsModalVisible(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
  };

  const handleSave = (values) => {
    const updatedLocation = currentRecord?.location ?? locationRef.current?.getLocation() ?? "Unknown Location";
    const updatedFoto = currentRecord?.foto || "";

    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (isEditing && currentRecord) {
      const updatedData = data.map((item) =>
        item.key === currentRecord.key
          ? { ...currentRecord, ...values, location: updatedLocation, foto: updatedFoto, tanggal: currentDate }
          : item
      );
      setData(updatedData);
    } else {
      const newRecord = {
        key: `${data.length + 1}`,
        ...values,
        location: updatedLocation,
        foto: updatedFoto,
        tanggal: currentDate, // Tambahkan tanggal saat membuat data baru
      };
      setData([...data, newRecord]);
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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

  const handleFileChange = (foto) => {
    setCurrentRecord((prev) => ({ ...prev, foto }));
  };

  const handleStatusChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.key === record.key
        ? { ...item, status: value === "" ? "Belum di cek" : value }
        : item
    );
    setData(updatedData);
  };

  const handleCatatanChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, catatan: value } : item
    );
    setData(updatedData);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.namaDebitur.toLowerCase().includes(searchText.toLowerCase()) ||
    item.aktifitas.toLowerCase().includes(searchText.toLowerCase())
  );

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
            value={record.status || "Belum di cek"}
            style={{ width: 120, marginRight: "10px" }}
            onChange={(value) => handleStatusChange(value, record)}
            disabled={userRole !== "verifikator"}
          >
            <Option value='Belum di cek'>Pilih Status</Option>
            <Option value="approve">Approve</Option>
            <Option value="reject">Reject</Option>
          </Select>
          <Input
            value={record.catatan || ""}
            placeholder="Catatan"
            style={{ width: 200 }}
            disabled={userRole !== "verifikator"}
            onChange={(e) => handleCatatanChange(e.target.value, record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Search Input */}
        <Input
          placeholder="Search by Nama Debitur or Aktifitas"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
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
        columns={columns.filter(column => !column.hidden)} // Sembunyikan kolom jika hidden = true
        dataSource={filteredData}
        rowKey="key"
        scroll={{ x: 1200, y: 400 }} // Lebar maksimum 1200px dan tinggi maksimum 400px
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
              rules={[{ required: true, message: "Please input Aktifitas!" }]}
            >
              <Input />
            </Form.Item>

            {/* Input Hasil */}
            <Form.Item
              label="Hasil"
              name="hasil"
              rules={[{ required: true, message: "Please input Hasil!" }]}
            >
              <Input />
            </Form.Item>

            {/* Input Keterangan */}
            <Form.Item label="Keterangan" name="keterangan">
              <Select rules={[{ required: true, message: "Please input Keterangan!" }]}>
                {keteranganOptions.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Komponen Kamera */}
            <CameraCapture handleFileChange={handleFileChange} />

            {/* Komponen Lokasi */}
            <Location ref={locationRef} updateLocation={updateLocation} />

            <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Save Changes" : "Create New"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Collection;
