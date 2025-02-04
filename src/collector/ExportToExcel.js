import React from "react";
import { Button } from "antd";
import ExcelJS from "exceljs";

const ExportToExcel = ({ data, disabled }) => {
  const exportToExcel = async (data, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Menambahkan judul di E1
    worksheet.mergeCells("E1");
    const titleCell = worksheet.getCell("E1");
    titleCell.value = "Data Collections Report";
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.font = { size: 14, bold: true };

    const headers = [
      "tanggal",
      "nameUser",
      "namaDebitur",
      "aktifitas",
      "hasil",
      "keterangan",
      "fotoBase64", // Tetap menggunakan 'fotoBase64' di kode
      "nameLoc",
      "location",
      "status",
      "catatan",
    ];

    // Menambahkan header mulai dari baris ke-3 (A3)
    worksheet.addRow([]); // Baris kosong agar header berada di baris ke-3
    const modifiedHeaders = headers.map((header) =>
      header === "fotoBase64" ? "Foto" : header
    );
    worksheet.addRow(modifiedHeaders); // Menambahkan header yang sudah diubah

    // Menambahkan data dan gambar
    data.forEach((row) => {
      const rowData = modifiedHeaders.map((header) => {
        if (header === "Foto" && row["fotoBase64"]) {
          const imageId = workbook.addImage({
            base64: row["fotoBase64"],
            extension: "png",
          });

          worksheet.addImage(imageId, {
            tl: { col: 6, row: worksheet.lastRow.number - 0.1 },
            ext: { width: 45, height: 20 },
          });

          return "-";
        } else {
          return row[header] || "-";
        }
      });
      worksheet.addRow(rowData);
    });

    // Menyesuaikan lebar kolom berdasarkan panjang data terpanjang
    modifiedHeaders.forEach((header, index) => {
      const maxLength = Math.max(
        header.length,
        ...data.map((row) => String(row[header] || "").length)
      );
      worksheet.getColumn(index + 1).width = maxLength + 2;
    });

    // Menulis dan mengunduh file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();
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
