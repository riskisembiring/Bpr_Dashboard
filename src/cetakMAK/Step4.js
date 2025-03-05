import React from "react";
import { Collapse, Table, Input, Button, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";

const { Panel } = Collapse;

const Step4 = ({ formData, setFormData }) => {
  const slikTables = formData.slikTables || [];

  const handleInputChange = (value, key, column, tableIndex) => {
    const newTables = [...slikTables];
    newTables[tableIndex].data = newTables[tableIndex].data.map((row) =>
      row.key === key ? { ...row, [column]: value } : row
    );
    setFormData({ ...formData, slikTables: newTables });
  };

  const addRow = (tableIndex) => {
    const newTables = [...slikTables];
    newTables[tableIndex].data.push({
      key: (newTables[tableIndex].data.length + 1).toString(),
      namaBankLjk: "",
      plafon: "",
      bakiDebet: "",
      angsuran: "",
      kol: "",
      ket: "",
    });
    setFormData({ ...formData, slikTables: newTables });
  };

  const removeRow = (key, tableIndex) => {
    const newTables = [...slikTables];
    newTables[tableIndex].data = newTables[tableIndex].data.filter((row) => row.key !== key);
    setFormData({ ...formData, slikTables: newTables });
  };

  const addSlikTable = () => {
    setFormData({
      ...formData,
      slikTables: [...slikTables, { nama: "", data: [], catatan: [] }],
    });
  };

  const handleNamaSlikChange = (value, tableIndex) => {
    const newTables = [...slikTables];
    newTables[tableIndex].nama = value;
    setFormData({ ...formData, slikTables: newTables });
  };

  const handleCatatanChange = (value, tableIndex) => {
    const newTables = [...slikTables];
    newTables[tableIndex].catatan = value.split("\n");
    setFormData({ ...formData, slikTables: newTables });
  };

  const columns = (tableIndex) => [
    {
      title: "Nama Bank / LJK",
      dataIndex: "namaBankLjk",
      render: (_, record) => (
        <Input
          value={record.namaBankLjk}
          placeholder="Masukkan Nama Bank / LJK"
          onChange={(e) => handleInputChange(e.target.value, record.key, "namaBankLjk", tableIndex)}
        />
      ),
    },
    {
      title: "Plafon",
      dataIndex: "plafon",
      render: (_, record) => (
        <NumericFormat
          value={record.plafon}
          placeholder="Masukkan Plafon"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, record.key, "plafon", tableIndex)}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Baki Debet",
      dataIndex: "bakiDebet",
      render: (_, record) => (
        <NumericFormat
          value={record.bakiDebet}
          placeholder="Masukkan Baki Debet"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, record.key, "bakiDebet", tableIndex)}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Angsuran",
      dataIndex: "angsuran",
      render: (_, record) => (
        <NumericFormat
          value={record.angsuran}
          placeholder="Masukkan Angsuran"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, record.key, "angsuran", tableIndex)}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Kol.",
      dataIndex: "kol",
      render: (_, record) => (
        <Input
          value={record.kol}
          placeholder="Masukkan Kol."
          onChange={(e) => handleInputChange(e.target.value, record.key, "kol", tableIndex)}
        />
      ),
    },
    {
      title: "Ket.",
      dataIndex: "ket",
      render: (_, record) => (
        <Input
          value={record.ket}
          placeholder="Masukkan Ket."
          onChange={(e) => handleInputChange(e.target.value, record.key, "ket", tableIndex)}
        />
      ),
    },
    {
      title: "Aksi",

      render: (_, record) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => removeRow(record.key, tableIndex)}>
          Hapus
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h4>1. REKAPITULASI SLIK</h4>
      <Button type="primary" icon={<PlusOutlined />} onClick={addSlikTable} style={{ marginBottom: "16px" }}>
        Tambah SLIK
      </Button>

      <Collapse accordion>
        {slikTables.map((slik, index) => (
          <Panel header={`SLIK ${index + 1}`} key={index}>
            <Form.Item label={`Nama SLIK ${index + 1}`}>
              <Input
                value={slik.nama}
                placeholder={`Masukkan Nama SLIK ${index + 1}`}
                onChange={(e) => handleNamaSlikChange(e.target.value, index)}
              />
            </Form.Item>

            <h4>Tabel Rekapitulasi SLIK {index + 1}</h4>
            <Table
              columns={columns(index)}
              dataSource={slik.data}
              pagination={false}
              bordered
              scroll={{ x: "max-content" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addRow(index)}
              style={{ marginTop: "8px", marginBottom: "12px" }}
            >
              Tambah Data
            </Button>

            <Form.Item label="Catatan Hasil SLIK">
              <Input.TextArea
                value={(slik.catatan || []).join("\n")}
                onChange={(e) => handleCatatanChange(e.target.value, index)}
                placeholder="Masukkan Catatan Hasil SLIK"
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>
          </Panel>
        ))}
      </Collapse>
      <br></br>
    </div>
  );
};

export default Step4;
