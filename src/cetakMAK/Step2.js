import React from "react";
import { Table, Input, Button, Space, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Step2 = ({ formData, setFormData }) => {
  const data = formData.tableRingkasanPengajuanKredit || [];
  const data2 = formData.tableRingkasanPengajuanKredit2 || [];

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (tableKey === "tableRingkasanPengajuanKredit" ? data : data2).map((row) => {
      if (row.key === key) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setFormData({ ...formData, [tableKey]: newData });
  };

  const addRow = (tableKey) => {
    const newRow = {
      key: ((tableKey === "tableRingkasanPengajuanKredit" ? data : data2).length + 1).toString(),
      jenisKredit: "",
      plafond: "",
      sukuBunga: "",
      tenor: "",
      biayaProvisi: "",
      biayaAdm: "",
    };
    const newData = [...(tableKey === "tableRingkasanPengajuanKredit" ? data : data2), newRow];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (tableKey === "tableRingkasanPengajuanKredit" ? data : data2).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Jenis Kredit",
      dataIndex: "jenisKredit",
      key: "jenisKredit",
      render: (text, record) => (
        <Input
          value={record.jenisKredit}
          placeholder="Masukkan Jenis Kredit"
          onChange={(e) => handleInputChange(e.target.value, record.key, "jenisKredit", tableKey)}
        />
      ),
    },
    {
      title: "Plafond",
      dataIndex: "plafond",
      key: "plafond",
      render: (text, record) => (
        <Input
          value={record.plafond}
          placeholder="Masukkan plafond"
          onChange={(e) => handleInputChange(e.target.value, record.key, "plafond", tableKey)}
        />
      ),
    },
    {
      title: "Suku Bunga",
      dataIndex: "sukuBunga",
      key: "sukuBunga",
      render: (text, record) => (
        <Input
          value={record.sukuBunga}
          placeholder="Masukkan Suku Bunga"
          onChange={(e) => handleInputChange(e.target.value, record.key, "sukuBunga", tableKey)}
        />
      ),
    },
    {
      title: "Tenor",
      dataIndex: "tenor",
      key: "tenor",
      render: (text, record) => (
        <Input
          value={record.tenor}
          placeholder="Masukkan Tenor"
          onChange={(e) => handleInputChange(e.target.value, record.key, "tenor", tableKey)}
        />
      ),
    },
    {
      title: "Biaya Provisi",
      dataIndex: "biayaProvisi",
      key: "biayaProvisi",
      render: (text, record) => (
        <Input
          value={record.biayaProvisi}
          placeholder="Masukkan Biaya Provisi"
          onChange={(e) => handleInputChange(e.target.value, record.key, "biayaProvisi", tableKey)}
        />
      ),
    },
    {
      title: "Biaya ADM.",
      dataIndex: "biayaAdm",
      key: "biayaAdm",
      render: (text, record) => (
        <Input
          value={record.biayaAdm}
          placeholder="Masukkan Biaya ADM"
          onChange={(e) => handleInputChange(e.target.value, record.key, "biayaAdm", tableKey)}
        />
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <Button danger icon={<DeleteOutlined />} onClick={() => removeRow(record.key, tableKey)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>

      <Table columns={columns("tableRingkasanPengajuanKredit")} dataSource={data} pagination={false} bordered style={{ marginBottom: "16px" }} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableRingkasanPengajuanKredit")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button>
      <Form.Item
        label="Tujuan pengajuan kredit"
        name="tujuanPengajuanKredit"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Tujuan pengajuan kredit" />
      </Form.Item>
      </div>
  );
};

export default Step2;
