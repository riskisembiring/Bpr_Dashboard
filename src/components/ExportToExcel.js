import React from "react";
import { Button } from "antd";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, disabled }) => {
  const exportToExcel = (data, fileName) => {
    // Membuat worksheet kosong untuk menambahkan header
    const worksheet = XLSX.utils.json_to_sheet([], { origin: 'A3' });

    // Menambahkan "Report Data" di sel A1
    worksheet['F1'] = { t: 's', v: 'Report Data', s: { alignment: { horizontal: 'center' } } };

    // Menambahkan data mulai dari A3
    const dataWorksheet = XLSX.utils.json_to_sheet(data, { origin: 'A3' });

    // Menambahkan data ke worksheet
    Object.keys(dataWorksheet).forEach(key => {
      worksheet[key] = dataWorksheet[key];
    });

    // Menyesuaikan lebar kolom berdasarkan panjang data terpanjang
    const columnWidths = data.reduce((acc, row) => {
      Object.keys(row).forEach((key, index) => {
        const cellValue = String(row[key]);
        if (!acc[index] || cellValue.length > acc[index]) {
          acc[index] = cellValue.length;
        }
      });
      return acc;
    }, []);

    worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));

    // Membuat workbook dan menambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Mengekspor file Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    // Hapus properti 'key' dari setiap objek dalam data
    const cleanedData = data.map(({ key, ...rest }) => rest);

    // Lakukan ekspor dengan data yang sudah dibersihkan
    exportToExcel(cleanedData, "ExportedData");
  };

  return (
    <Button onClick={handleExport} disabled={disabled} type="primary">
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
