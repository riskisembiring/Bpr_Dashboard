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
    titleCell.value = `BPR Nasnus - Collection Report (${new Date().toISOString().split('T')[0]})`;
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.font = { size: 16, bold: true, color: { argb: 'FF1E3A8A' } };
    
    // Style header row
    worksheet.getRow(3).font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
    worksheet.getRow(3).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };
    
    // Freeze top 3 rows
    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 3 }];
    
    // Add borders to all data cells
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3) {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      }
    });

    const headers = [
      "tanggal",
      "nameUser",
      "namaDebitur",
      "aktifitas",
      "hasil",
      "keterangan",
      "fotoBase64", // Tetap menggunakan 'fotoBase64' di kode
      "alamatDeb",
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
    // Sort data by tanggal DESC (terbaru dulu) - safe null check
    const sortedData = [...data]
      .filter(item => item.tanggal) // Filter only items with tanggal
      .sort((a, b) => {
        try {
          const dateA = new Date(a.tanggal.split(' ')[0].split('/').reverse().join('-') + 'T' + (a.tanggal.split(' ')[1] || '00:00:00'));
          const dateB = new Date(b.tanggal.split(' ')[0].split('/').reverse().join('-') + 'T' + (b.tanggal.split(' ')[1] || '00:00:00'));
          return dateB - dateA;
        } catch (e) {
          return 0; // fallback if parsing fails
        }
      });
    
    const cleanedData = sortedData.map(({ key, id, ...rest }) => rest);
    exportToExcel(cleanedData, "BPR_Nasnus_Collection_Report");
  };

  return (
    <Button onClick={handleExport} disabled={disabled} type="primary">
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
