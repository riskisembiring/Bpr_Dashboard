import React from "react";
import { Table, Input, Button, Space, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";

const Step4 = ({ formData, setFormData }) => {
  const data = formData.tableRekapitulatif || [];
  const data2 = formData.tableRekapitulatif2 || [];

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (tableKey === "tableRekapitulatif" ? data : data2).map(
      (row) => {
        if (row.key === key) {
          return { ...row, [column]: value };
        }
        return row;
      }
    );
    setFormData({ ...formData, [tableKey]: newData });
  };

  const addRow = (tableKey) => {
    const newRow = {
      key: (
        (tableKey === "tableRekapitulatif" ? data : data2).length + 1
      ).toString(),
      namaBankLjk: "",
      plafon: "",
      bakiDebet: "",
      angsuran: "",
      kol: "",
      ket: "",
    };
    const newData = [
      ...(tableKey === "tableRekapitulatif" ? data : data2),
      newRow,
    ];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (tableKey === "tableRekapitulatif" ? data : data2).filter(
      (row) => row.key !== key
    );
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Nama Bank / LJK",
      dataIndex: "namaBankLjk",
      key: "namaBankLjk",
      render: (text, record) => (
        <Input
          value={record.namaBankLjk}
          placeholder="Masukkan Nama Bank / LJK"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "namaBankLjk",
              tableKey
            )
          }
          className="responsive-input"
        />
      ),
    },
    {
      title: "Plafon",
      dataIndex: "plafon",
      key: "plafon",
      render: (text, record) => (
        <NumericFormat
          value={String(record.plafon)}
          placeholder="Masukkan Plafon"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "plafon",
              tableKey
            )
          }
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Baki Debet",
      dataIndex: "bakiDebet",
      key: "bakiDebet",
      render: (text, record) => (
        <NumericFormat
          value={String(record.bakiDebet)}
          placeholder="Masukkan Baki Debet"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "bakiDebet",
              tableKey
            )
          }
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Angsuran",
      dataIndex: "angsuran",
      key: "angsuran",
      render: (text, record) => (
        <NumericFormat
          value={String(record.angsuran)}
          placeholder="Masukkan Angsuran"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "angsuran",
              tableKey
            )
          }
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Kol.",
      dataIndex: "kol",
      key: "kol",
      render: (text, record) => (
        <Input
          value={record.kol}
          placeholder="Masukkan Kol."
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "kol", tableKey)
          }
          className="responsive-input"
        />
      ),
    },
    {
      title: "Ket.",
      dataIndex: "ket",
      key: "ket",
      render: (text, record) => (
        <Input
          value={record.ket}
          placeholder="Masukkan Ket."
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "ket", tableKey)
          }
          className="responsive-input"
        />
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeRow(record.key, tableKey)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3>1. Rekapitulasi Slik</h3>
      <Form.Item label="Nama Slik 1" name="namaSlik">
        <Input placeholder="Masukkan Nama Slik 1" />
      </Form.Item>
      <h4>Tabel Rekapitulasi Slik 1</h4>
      <Table
        columns={columns("tableRekapitulatif")}
        dataSource={data}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableRekapitulatif")}
        style={{ marginTop: "8px", marginBottom: '12px' }}
      >
        Tambah Baris
      </Button>
      <Form.Item
        label="Catatan Hasil SLIK"
        name="catatanHasilSlik"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan catatan Hasil Slik" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item label="Nama Slik 2" name="namaSlik2" style={{ marginTop: "24px" }}>
        <Input placeholder="Masukkan Nama Slik 2" />
      </Form.Item>
      <h4>Tabel Rekapitulasi Slik 2</h4>
      <Table
        columns={columns("tableRekapitulatif2")}
        dataSource={data2}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableRekapitulatif2")}
        style={{ marginTop: "8px", marginBottom: '12px' }}
      >
        Tambah Baris
      </Button>
      <Form.Item
        label="Catatan Hasil SLIK"
        name="catatanHasilSlik2"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan catatan Hasil Slik" autoSize={{ minRows: 6, maxRows: 8 }}/>
      </Form.Item>
    </div>
  );
};

export default Step4;
