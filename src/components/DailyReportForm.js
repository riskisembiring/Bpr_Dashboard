import React from "react";
import { Button } from "antd";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, disabled }) => {
  const exportToExcel = (data, fileName) => {
    // Header urutan sesuai permintaan
    const headers = [
      "tanggal",
      "nameUser",
      "namaDebitur",
      "aktifitas",
      "hasil",
      "keterangan",
      "fotoBase64",
      "location",
      "status",
      "catatan",
    ];

    const reorderedData = data.map((row, index) => {
      const reorderedRow = {};
      headers.forEach((header) => {
        if (row.hasOwnProperty(header)) {
          reorderedRow[header] = row[header] || "-"; // Ganti dengan nilai default jika kosong
        } else {
          reorderedRow[header] = "-"; // Nilai default jika properti tidak ditemukan
        }
      });
      return reorderedRow;
    });

    // Log reorderedData untuk memastikan data terurut dengan benar
    console.log("Reordered Data:", reorderedData);

    // Membuat worksheet dengan data yang sudah diurutkan
    const worksheet = XLSX.utils.json_to_sheet(reorderedData, { origin: "A3" });

    // Menambahkan judul di sel A1
    worksheet["E1"] = { t: "s", v: "Report Data", s: { alignment: { horizontal: "center" } } };

    // Menyesuaikan lebar kolom berdasarkan panjang data terpanjang
    const columnWidths = headers.map((header) => ({
      wch: Math.max(
        header.length,
        ...reorderedData.map((row) => String(row[header] || "").length)
      ),
    }));

    worksheet["!cols"] = columnWidths;

    // Membuat workbook dan menambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Mengekspor file Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    const cleanedData = data.map(({ key, id, ...rest }) => rest);
    exportToExcel(cleanedData, "CollectionData");
  };

  return (
    <Button onClick={handleExport} disabled={disabled} type="primary">
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
