import React from "react";
import { Table, Input, Button, Space, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import "../styles/Step2.css";

const Step2 = ({ formData, setFormData }) => {
  const data = formData.tableRingkasanPengajuanKredit || [];
  const data2 = formData.tableRingkasanPengajuanKredit2 || [];

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (
      tableKey === "tableRingkasanPengajuanKredit" ? data : data2
    ).map((row) => {
      if (row.key === key) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setFormData({ ...formData, [tableKey]: newData });
  };

  const addRow = (tableKey) => {
    const newRow = {
      key: (
        (tableKey === "tableRingkasanPengajuanKredit" ? data : data2).length + 1
      ).toString(),
      jenisKredit: "",
      plafond: "",
      sukuBunga: "",
      tenor: "",
      biayaProvisi: "",
      biayaAdm: "",
    };
    const newData = [
      ...(tableKey === "tableRingkasanPengajuanKredit" ? data : data2),
      newRow,
    ];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (
      tableKey === "tableRingkasanPengajuanKredit" ? data : data2
    ).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Jenis Kredit",
      dataIndex: "jenisKredit",
      key: "jenisKredit",
      render: (text, record) => (
        <select
          value={record.jenisKredit || ""}
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "jenisKredit", tableKey)
          }
          className="responsive-input"
        >
          <option value="" disabled>
            Pilih Jenis Kredit
          </option>{" "}
          <option value="kreditKonsumtif">Kredit Konsumtif</option>
          <option value="modalUsaha">Modal Usaha</option>
          <option value="kreditInvestasi">Kredit Investasi</option>
        </select>
      ),
      width: 180,
    },
    {
      title: "Plafond",
      dataIndex: "plafond",
      key: "plafond",
      render: (text, record) => (
        <NumericFormat
          value={String(record.plafond)}
          placeholder="Masukkan plafond"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "plafond",
              tableKey
            )
          }
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
      width: 180,
    },
    {
      title: "Suku Bunga",
      dataIndex: "sukuBunga",
      key: "sukuBunga",
      render: (text, record) => (
        <Input
          value={record.sukuBunga}
          placeholder="Masukkan Jenis Kredit"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "sukuBunga",
              tableKey
            )
          }
          className="responsive-input"
        />
      ),
      width: 220,
    },
    {
      title: "Tenor",
      dataIndex: "tenor",
      key: "tenor",
      render: (text, record) => (
        <select
          value={record.tenor || ""}
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "tenor", tableKey)
          }
          className="responsive-input"
        >
          <option value="" disabled>
            Pilih Tenor
          </option>{" "}
          <option value="3 Bulan">3 Bulan</option>
          <option value="6 Bulan">6 Bulan</option>
          <option value="12 Bulan">12 Bulan</option>
          <option value="24 Bulan">24 Bulan</option>
          <option value="36 Bulan">36 Bulan</option>
          <option value="48 Bulan">48 Bulan</option>
          <option value="60 Bulan">60 Bulan</option>
          <option value="72 Bulan">72 Bulan</option>
          <option value="84 Bulan">84 Bulan</option>
          <option value="96 Bulan">96 Bulan</option>
          <option value="108 Bulan">108 Bulan</option>
          <option value="120 Bulan">120 Bulan</option>
        </select>
      ),
      width: 160,
    },
    {
      title: "Biaya Provisi",
      dataIndex: "biayaProvisi",
      key: "biayaProvisi",
      render: (text, record) => (
        <NumericFormat
          value={String(record.biayaProvisi)}
          placeholder="Masukkan Biaya Provisi"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "biayaProvisi",
              tableKey
            )
          }
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
      width: 160,
    },
    {
      title: "Biaya ADM.",
      dataIndex: "biayaAdm",
      key: "biayaAdm",
      render: (text, record) => (
        <NumericFormat
          value={String(record.biayaAdm)}
          placeholder="Masukkan Biaya ADM"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "biayaAdm",
              tableKey
            )
          }
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
      width: 160,
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
      width: 100,
    },
  ];

  return (
    <div>
      {/* Table */}
      <Table
        columns={columns("tableRingkasanPengajuanKredit")}
        dataSource={formData.tableRingkasanPengajuanKredit}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
      />

      {/* Button Tambah Baris */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          addRow("tableRingkasanPengajuanKredit")
        }
        style={{ marginBottom: "12px" }}
      >
        Tambah Data
      </Button>

      {/* Form Item untuk TextArea */}
      <Form.Item
        label="Tujuan pengajuan kredit"
        name="tujuanPengajuanKredit"
        getValueProps={(value) => ({ value: Array.isArray(value) ? value.join("\n") : value })}
        getValueFromEvent={(e) => e.target.value.split("\n")} // Jangan filter di sini
        rules={[
          {
            required: true,
            message: "Tujuan pengajuan kredit wajib di isi!",
            validator: (_, value) => {
              const filteredLines = value.filter((line) => line.trim() !== "");
              return filteredLines.length > 0
                ? Promise.resolve()
                : Promise.reject(new Error("Tujuan pengajuan kredit wajib di isi!"));
            },
          },
        ]}
      >
        <Input.TextArea
          placeholder="Masukkan Tujuan pengajuan kredit"
          autoSize={{ minRows: 6, maxRows: 8 }}
          maxLength={500}
          showCount
        />
      </Form.Item>
      <br></br>
    </div>
  );
};

export default Step2;
