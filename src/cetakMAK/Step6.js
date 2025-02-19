import React from "react";
import { Table, Input, Button, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Step6 = ({ formData, setFormData, tableKey }) => {
  const data = formData.tableLabaRugiProforma || [];
  const data2 = formData.tableNeracaProforma || [];

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (tableKey === "tableLabaRugiProforma" ? data : data2).map(
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
        (tableKey === "tableLabaRugiProforma" ? data : data2).length + 1
      ).toString(),
      deskripsi: "",
      nominalPeriode: "",
      persenPeriode: "",
      nominalProyeksi: "",
      persenProyeksi: "",
    };
    const newData = [
      ...(tableKey === "tableLabaRugiProforma" ? data : data2),
      newRow,
    ];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (
      tableKey === "tableLabaRugiProforma" ? data : data2
    ).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      render: (text, record) => (
        <Input
          value={record.deskripsi}
          placeholder="Masukkan Deskripsi"
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "deskripsi", tableKey)
          }
        />
      ),
    },
    {
      title: "Periode (Bulan)",
      children: [
        {
          title: "Nominal",
          dataIndex: "nominalPeriode",
          key: "nominalPeriode",
          render: (text, record) => (
            <Input
              value={record.nominalPeriode}
              placeholder="Masukkan Nominal"
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  record.key,
                  "nominalPeriode",
                  tableKey
                )
              }
            />
          ),
        },
        {
          title: "%",
          dataIndex: "persenPeriode",
          key: "persenPeriode",
          render: (text, record) => (
            <Input
              value={record.persenPeriode}
              placeholder="Masukkan %"
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  record.key,
                  "persenPeriode",
                  tableKey
                )
              }
            />
          ),
        },
      ],
    },
    {
      title: "Proyeksi",
      children: [
        {
          title: "Nominal",
          dataIndex: "nominalProyeksi",
          key: "nominalProyeksi",
          render: (text, record) => (
            <Input
              value={record.nominalProyeksi}
              placeholder="Masukkan Nominal"
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  record.key,
                  "nominalProyeksi",
                  tableKey
                )
              }
            />
          ),
        },
        {
          title: "%",
          dataIndex: "persenProyeksi",
          key: "persenProyeksi",
          render: (text, record) => (
            <Input
              value={record.persenProyeksi}
              placeholder="Masukkan %"
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  record.key,
                  "persenProyeksi",
                  tableKey
                )
              }
            />
          ),
        },
      ],
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
      <h4>a. Laporan Laba Rugi Proforma</h4>
      <Table
        columns={columns("tableLabaRugiProforma")}
        dataSource={data}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableLabaRugiProforma")}
        style={{ marginTop: "8px" }}
      >
        Tambah Baris
      </Button>

      <h4>b.Laporan Neraca Proforma</h4>
      <Table
        columns={columns("tableNeracaProforma")}
        dataSource={data2}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableNeracaProforma")}
        style={{ marginTop: "8px" }}
      >
        Tambah Baris
      </Button>
    </div>
  );
};

export default Step6;
