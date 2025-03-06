import React, { useEffect } from "react";
import { Table, Input } from "antd";
import { NumericFormat } from "react-number-format";

const Step6 = ({ formData, setFormData, tableKey }) => {
  const data = formData.tableLabaRugiProforma || [];
  const data2 = formData.tableNeracaProforma || [];
  const isDisabled = formData.jenisPekerjaanDebt === "Karyawan" || formData.jenisPekerjaanDebt === "BackToBack";

  const defaultLabaRugi = [
    { key: "1", deskripsi: "Penjualan", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "2", deskripsi: "COGS / HPP", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "3", deskripsi: "Laba (Rugi) Kotor", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "4", deskripsi: "Biaya Operasional", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "6", deskripsi: "Biaya Gaji", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "7", deskripsi: "Biaya Transportasi", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "8", deskripsi: "Biaya Listrik & Air", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "9", deskripsi: "Biaya Administrasi", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "11", deskripsi: "Biaya Lainnya", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "12", deskripsi: "Laba (Rugi) Operasional", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "13", deskripsi: "Beban Lain-lain", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "14", deskripsi: "Bayar Angsuran Bank", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "15", deskripsi: "Beban Pajak", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "16", deskripsi: "Biaya Bunga Bank", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "17", deskripsi: "- (BPR Nasional Nusantara)", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "18", deskripsi: "- (Nama Bank)", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "19", deskripsi: "- (Nama Bank)", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "20", deskripsi: "Biaya Non Operasional", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "21", deskripsi: "Biaya Rumah Tangga", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "22", deskripsi: "Pendapatan lain-lain", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "23", deskripsi: "Laba (Rugi) Bersih", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
  ];

  const defaultNeraca = [
    { key: "1", deskripsi: "AKTIVA", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "2", deskripsi: "AKTIVA LANCAR", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "3", deskripsi: "Kas dan Bank", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "4", deskripsi: "Piutang Usaha", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "5", deskripsi: "Persediaan Barang", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "6", deskripsi: "Peralatan Kantor", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "7", deskripsi: "AKTIVA TIDAK LANCAR", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "8", deskripsi: "Tanah dan Bangunan", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "9", deskripsi: "Kendaraan", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "10", deskripsi: "Aset Lain", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "11", deskripsi: "HUTANG", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "12", deskripsi: "Hutang Usaha", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "13", deskripsi: "Hutang Bank Jangka Pendek", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "14", deskripsi: "Hutang Jangka Panjang > JT 1 Tahun", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "15", deskripsi: "Hutang Lain-lain", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "16", deskripsi: "EKUITAS", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "17", deskripsi: "Modal", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "18", deskripsi: "Laba Tahun Berjalan", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "19", deskripsi: "TOTAL HUTANG + MODAL", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
    { key: "20", deskripsi: "Check Balance", nominalPeriode: "", persenPeriode: "", nominalProyeksi: "", persenProyeksi: "" },
  ];

  // Set data default saat komponen pertama kali dimount
  useEffect(() => {
    if (!formData.tableLabaRugiProforma || formData.tableLabaRugiProforma.length === 0) {
      setFormData((prev) => ({ ...prev, tableLabaRugiProforma: defaultLabaRugi }));
    }
    if (!formData.tableNeracaProforma || formData.tableNeracaProforma.length === 0) {
      setFormData((prev) => ({ ...prev, tableNeracaProforma: defaultNeraca }));
    }
  }, [setFormData, formData]);

  const handleInputChange = (value, key, column, tableKey) => {
    if (isDisabled) return; // Mencegah perubahan jika disabled
    const newData = (tableKey === "tableLabaRugiProforma" ? data : data2).map((row) =>
      row.key === key ? { ...row, [column]: value } : row
    );
    setFormData({ ...formData, [tableKey]: newData });
  };

  // const addRow = (tableKey) => {
  //   const newRow = {
  //     key: ((tableKey === "tableLabaRugiProforma" ? data : data2).length + 1).toString(),
  //     deskripsi: "Deskripsi Baru", // Deskripsi default ketika menambahkan baris
  //     nominalPeriode: "",
  //     persenPeriode: "",
  //     nominalProyeksi: "",
  //     persenProyeksi: "",
  //   };
  //   const newData = [...(tableKey === "tableLabaRugiProforma" ? data : data2), newRow];
  //   setFormData({ ...formData, [tableKey]: newData });
  // };

  // const removeRow = (key, tableKey) => {
  //   const newData = (tableKey === "tableLabaRugiProforma" ? data : data2).filter((row) => row.key !== key);
  //   setFormData({ ...formData, [tableKey]: newData });
  // };

  const columns = (tableKey) => [
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      render: (text, record) => (
        <Input
          value={record.deskripsi}
          placeholder="Masukkan Deskripsi"
          onChange={(e) => handleInputChange(e.target.value, record.key, "deskripsi", tableKey)}
          disabled
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
            <NumericFormat
              value={isDisabled ? "" : String(record.nominalPeriode)}
              placeholder="Masukkan Nominal"
              onValueChange={(values) =>
                handleInputChange(String(values.value), record.key, "nominalPeriode", tableKey)
              }
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              decimalScale={0}
              disabled={isDisabled}
              className="responsive-input"
            />
          ),
        },
        {
          title: "%",
          dataIndex: "persenPeriode",
          key: "persenPeriode",
          render: (text, record) => (
            <NumericFormat
              value={isDisabled ? "" : String(record.persenPeriode)}
              placeholder="Masukkan %"
              onValueChange={(values) =>
                handleInputChange(String(values.value), record.key, "persenPeriode", tableKey)
              }
              suffix=" %"
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              decimalScale={0}
              disabled={isDisabled}
              className="responsive-input"
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
            <NumericFormat
              value={isDisabled ? "" : String(record.nominalProyeksi)}
              placeholder="Masukkan Nominal"
              onValueChange={(values) =>
                handleInputChange(String(values.value), record.key, "nominalProyeksi", tableKey)
              }
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              decimalScale={0}
              disabled={isDisabled}
              className="responsive-input"
            />
          ),
        },
        {
          title: "%",
          dataIndex: "persenProyeksi",
          key: "persenProyeksi",
          render: (text, record) => (
            <NumericFormat
              value={isDisabled ? "" : String(record.persenProyeksi)}
              placeholder="Masukkan %"
              onValueChange={(values) =>
                handleInputChange(String(values.value), record.key, "persenProyeksi", tableKey)
              }
              suffix=" %"
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              decimalScale={0}
              disabled={isDisabled}
              className="responsive-input"
            />
          ),
        },
      ],
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
        scroll={{ x: "max-content" }}
      />
      {/* <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableLabaRugiProforma")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button> */}

      <h4>b. Laporan Neraca Proforma</h4>
      <Table
        columns={columns("tableNeracaProforma")}
        dataSource={data2}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
      />
      {/* <Button type="primary" icon={<PlusOutlined />} onClick={() => addRow("tableNeracaProforma")} style={{ marginTop: "8px" }}>
        Tambah Baris
      </Button> */}
    </div>
  );
};

export default Step6;
