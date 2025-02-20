import React from "react";
import { Table, Input, Button, Space, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";

const Step5 = ({ formData, setFormData }) => {
  const data = formData.tableAnalisaRekKoran || [];
  const data2 = formData.tableAnalisaRekKoran2 || [];
  const data3 = formData.tableAnalisaRekKoran3 || [];

  const handleInputChange = (value, key, column, tableKey) => {
    let newData;
    if (tableKey === "tableAnalisaRekKoran") {
      newData = data;
    } else if (tableKey === "tableAnalisaRekKoran2") {
      newData = data2;
    } else if (tableKey === "tableAnalisaRekKoran3") {
      newData = data3;
    }
    const updatedData = newData.map((row) => {
      if (row.key === key) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setFormData({ ...formData, [tableKey]: updatedData });
  };

  const addRow = (tableKey) => {
    let targetData;
    if (tableKey === "tableAnalisaRekKoran") {
      targetData = data;
    } else if (tableKey === "tableAnalisaRekKoran2") {
      targetData = data2;
    } else if (tableKey === "tableAnalisaRekKoran3") {
      targetData = data3;
    } else {
      return;
    }
    const newRow = {
      key: (targetData.length + 1).toString(),
      bulan: "",
      mutasiDebet: "",
      qty1: "",
      mutasiKredit: "",
      qty2: "",
      saldoRataRata: "",
    };
    const newData = [...targetData, newRow];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    let targetData;
    if (tableKey === "tableAnalisaRekKoran") {
      targetData = data;
    } else if (tableKey === "tableAnalisaRekKoran2") {
      targetData = data2;
    } else if (tableKey === "tableAnalisaRekKoran3") {
      targetData = data3;
    } else {
      return;
    }
    const newData = targetData.filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Bulan",
      dataIndex: "bulan",
      key: "bulan",
      render: (text, record) => (
        <Input
          value={record.bulan}
          placeholder="Masukkan Bulan"
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "bulan", tableKey)
          }
          className="responsive-input"
        />
      ),
    },
    {
      title: "Mutasi Debet",
      dataIndex: "mutasiDebet",
      key: "mutasiDebet",
      render: (text, record) => (
        <NumericFormat
          value={String(record.mutasiDebet)}
          placeholder="Masukkan Mutasi Debet"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "mutasiDebet",
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
      title: "Qty",
      dataIndex: "qty1",
      key: "qty1",
      render: (text, record) => (
        <NumericFormat
          value={String(record.qty1)}
          placeholder="Masukkan Qty"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "qty1",
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
      title: "Mutasi Kredit",
      dataIndex: "mutasiKredit",
      key: "mutasiKredit",
      render: (text, record) => (
        <NumericFormat
          value={String(record.mutasiKredit)}
          placeholder="Masukkan Mutasi Kredit"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "mutasiKredit",
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
      title: "Qty",
      dataIndex: "qty2",
      key: "qty2",
      render: (text, record) => (
        <NumericFormat
        value={String(record.qty2)}
        placeholder="Masukkan Qty"
        onValueChange={(values) =>
          handleInputChange(
            String(values.value),
            record.key,
            "qty2",
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
      title: "Saldo Rata-Rata",
      dataIndex: "saldoRataRata",
      key: "saldoRataRata",
      render: (text, record) => (
        <NumericFormat
        value={String(record.saldoRataRata)}
        placeholder="Masukkan Saldo Rata-Rata"
        onValueChange={(values) =>
          handleInputChange(
            String(values.value),
            record.key,
            "saldoRataRata",
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
      <h3>1. Analisa Rekening Koran</h3>
      <h4>Analisa 1</h4>
      <Form.Item label="Rekening Koran Bank" name="rekeningKoranBank">
        <Input placeholder="Masukkan Rekening Koran Bank" />
      </Form.Item>
      <Form.Item label="No. Rekening" name="noRekening">
        <Input placeholder="Masukkan No. Rekening" />
      </Form.Item>
      <Form.Item label="Atas Nama" name="atasNama">
        <Input placeholder="Masukkan Atas Nama" />
      </Form.Item>
      <Form.Item label="Periode" name="periode">
        <Input placeholder="Masukkan Periode" />
      </Form.Item>
      <h3>Tabel Analisa Rekening Koran 1</h3>
      <Table
        columns={columns("tableAnalisaRekKoran")}
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
        onClick={() => addRow("tableAnalisaRekKoran")}
        style={{ marginTop: "8px" }}
      >
        Tambah Baris
      </Button>
      <h4>Analisa 2</h4>
      <Form.Item label="Rekening Koran Bank" name="rekeningKoranBank2">
        <Input placeholder="Masukkan Rekening Koran Bank" />
      </Form.Item>
      <Form.Item label="No. Rekening" name="noRekening2">
        <Input placeholder="Masukkan No. Rekening" />
      </Form.Item>
      <Form.Item label="Atas Nama" name="atasNama2">
        <Input placeholder="Masukkan Atas Nama" />
      </Form.Item>
      <Form.Item label="Periode" name="periode2">
        <Input placeholder="Masukkan Periode" />
      </Form.Item>
      <h3>Tabel Analisa Rekening Koran 2</h3>
      <Table
        columns={columns("tableAnalisaRekKoran2")}
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
        onClick={() => addRow("tableAnalisaRekKoran2")}
        style={{ marginTop: "8px" }}
      >
        Tambah Baris
      </Button>
      <h4>Analisa 3</h4>
      <Form.Item label="Rekening Koran Bank" name="rekeningKoranBank3">
        <Input placeholder="Masukkan Rekening Koran Bank" />
      </Form.Item>
      <Form.Item label="No. Rekening" name="noRekening3">
        <Input placeholder="Masukkan No. Rekening" />
      </Form.Item>
      <Form.Item label="Atas Nama" name="atasNama3">
        <Input placeholder="Masukkan Atas Nama" />
      </Form.Item>
      <Form.Item label="Periode" name="periode3">
        <Input placeholder="Masukkan Periode" />
      </Form.Item>
      <h3>Tabel Analisa Rekening Koran 3</h3>
      <Table
        columns={columns("tableAnalisaRekKoran3")}
        dataSource={data3}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableAnalisaRekKoran3")}
        style={{ marginTop: "8px" }}
      >
        Tambah Baris
      </Button>
    </div>
  );
};

export default Step5;
