import React from "react";
import { Table, Input, Button, Space, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

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
          onChange={(e) => handleInputChange(e.target.value, record.key, "bulan", tableKey)}
        />
      ),
    },
    {
      title: "Mutasi Debet",
      dataIndex: "mutasiDebet",
      key: "mutasiDebet",
      render: (text, record) => (
        <Input
          value={record.mutasiDebet}
          placeholder="Masukkan Mutasi Debet"
          onChange={(e) => handleInputChange(e.target.value, record.key, "mutasiDebet", tableKey)}
        />
      ),
    },
    {
      title: "QTY",
      dataIndex: "qty1",
      key: "qty1",
      render: (text, record) => (
        <Input
          value={record.qty1}
          placeholder="Masukkan QTY"
          onChange={(e) => handleInputChange(e.target.value, record.key, "qty1", tableKey)}
        />
      ),
    },
    {
      title: "Mutasi Kredit",
      dataIndex: "mutasiKredit",
      key: "mutasiKredit",
      render: (text, record) => (
        <Input
          value={record.mutasiKredit}
          placeholder="Masukkan Mutasi Kredit"
          onChange={(e) => handleInputChange(e.target.value, record.key, "mutasiKredit", tableKey)}
        />
      ),
    },
    {
      title: "QTY",
      dataIndex: "qty2",
      key: "qty2",
      render: (text, record) => (
        <Input
          value={record.qty2}
          placeholder="Masukkan QTY"
          onChange={(e) => handleInputChange(e.target.value, record.key, "qty2", tableKey)}
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
          onChange={(e) => handleInputChange(e.target.value, record.key, "kol", tableKey)}
        />
      ),
    },
    {
      title: "Saldo Rata-Rata",
      dataIndex: "saldoRataRata",
      key: "saldoRataRata",
      render: (text, record) => (
        <Input
          value={record.saldoRataRata}
          placeholder="Masukkan Saldo Rata-Rata"
          onChange={(e) => handleInputChange(e.target.value, record.key, "saldoRataRata", tableKey)}
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
      <Table columns={columns("tableAnalisaRekKoran")} dataSource={data} pagination={false} bordered style={{ marginBottom: "16px" }} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableAnalisaRekKoran")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button>
      {/* <Form.Item
        label="Penjelasan Laporan Rekening Koran"
        name="penjelasanLaporanRekKoran"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Penjelasan Laporan Rekening Koran" />
      </Form.Item> */}

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
      <Table columns={columns("tableAnalisaRekKoran2")} dataSource={data2} pagination={false} bordered style={{ marginBottom: "16px" }} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableAnalisaRekKoran2")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button>
      {/* <Form.Item
        label="Penjelasan Laporan Rekening Koran"
        name="penjelasanLaporanRekKoran"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Penjelasan Laporan Rekening Koran" />
      </Form.Item> */}

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
      <Table columns={columns("tableAnalisaRekKoran3")} dataSource={data3} pagination={false} bordered style={{ marginBottom: "16px" }} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableAnalisaRekKoran3")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button>
      {/* <Form.Item
        label="Penjelasan Laporan Rekening Koran"
        name="penjelasanLaporanRekKoran"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Penjelasan Laporan Rekening Koran" />
      </Form.Item> */}
    </div>
  );
};

export default Step5;
