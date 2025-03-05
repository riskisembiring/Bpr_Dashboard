import * as XLSX from "xlsx";
import moment from "moment";

export const handleExportToExcel = (dataDebitur) => {
  if (!Array.isArray(dataDebitur) || dataDebitur.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Menentukan header hanya sekali
  const header = [
    "Nama Kredit Analis (CA)", "Nama Marketing (AO)", "Nama Debitur",
    "Nomor MAK", "Tanggal MAK", "Plafon", "Tanggal Edit"
  ];

  // Memproses data dengan memastikan format tanggal benar
  const data = dataDebitur.map((row) => [
    row?.namaUser || "-",
    row?.namaAccOfficer || "-",
    row?.namaDebitur || "-",
    row?.nomorMak || "-",
    row?.tanggalMak ? moment(row?.tanggalMak).format("DD-MM-YYYY") : "-",
    row?.plafon || "-",
    row?.tanggalEdit || "-",
  ]);

  // Membuat worksheet dengan header dan data
  const ws = XLSX.utils.aoa_to_sheet([header, ...data]);

  ws["!cols"] = [
    { wch: 25 }, // Nama Kredit Analis (CA)
    { wch: 25 }, // Nama Marketing (AO)
    { wch: 20 }, // Nama Debitur
    { wch: 20 }, // Nomor MAK
    { wch: 20 }, // Tanggal MAK
    { wch: 20 }, // Plafon
    { wch: 20 }, // Tanggal Edit
  ];

  ws["!rows"] = [{ hpx: 30 }];

  // Membuat workbook dan menambahkan worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Debitur");

  // Menyimpan file Excel
  XLSX.writeFile(wb, "Data_Debitur.xlsx");
};
