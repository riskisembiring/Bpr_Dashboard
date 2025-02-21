import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const handleExportToPDF = (selectedData) => {
  const doc = new jsPDF();

  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

// Section: Data Debitur
doc.setFontSize(10);
doc.text("DATA DEBITUR", 10, 38, { align: "left" });

doc.setFontSize(8);
const tableData = [
  ["Nama Debitur", ":", selectedData?.namaDebitur || "N/A", "Jenis Pengajuan Kredit", ":", selectedData?.jenisPengajuanKredit || "N/A"],
  ["Nomor MAK", ":", selectedData?.nomorMak || "N/A", "Nominal Pengajuan", ":", selectedData?.nominalPengajuan || "N/A"],
  ["Tanggal MAK", ":", selectedData?.tanggalMak ? moment(selectedData.tanggalMak).format("DD-MM-YYYY") : "N/A", "Jenis Jaminan", ":", selectedData?.jenisJaminan || "N/A"],
  ["Nama Account Officer", ":", selectedData?.namaAccOfficer || "N/A", "No. Telp Debitur", ":", selectedData?.noTelpDeb || "N/A"],
  ["No. Telp Pasangan Debitur", ":", selectedData?.noTelpPasDeb || "N/A", "Alamat Sesuai KTP", ":", selectedData?.alamatSesuaiKtp || "N/A"],
  ["Alamat Domisili (Jika Tidak Sesuai KTP)", ":", selectedData?.alamatDomisili || "N/A", "No. KTP", ":", selectedData?.noKtp || "N/A"],
  ["No. NPWP", ":", selectedData?.noNpwp || "N/A", "Alamat Jaminan", ":", selectedData?.alamatJaminan || "N/A"],
  ["Nama Perusahaan / Usaha", ":", selectedData?.namaPerusahaanUsaha || "N/A", "Alamat Perusahaan / Usaha", ":", selectedData?.alamatPerusahaanUsaha || "N/A", "Jenis Usaha", ":", selectedData?.jenisUsaha || "N/A"],
  ["Status Tempat Tinggal", ":", selectedData?.statusTempatTinggal || "N/A", "Bentuk Usaha", ":", selectedData?.bentukUsaha || "N/A"],
  ["Jenis Pekerjaan", ":", selectedData?.jenisPekerjaan || "N/A", "Lama Usaha", ":", selectedData?.lamaUsaha || "N/A"],
  ["Jabatan", ":", selectedData?.jabatan || "N/A", "Lama Bekerja", ":", selectedData?.lamaBekerja || "N/A"],
  ["Status Karyawan", ":", selectedData?.statusKaryawan || "N/A", "Status Tempat Usaha", ":", selectedData?.statusTempatUsaha || "N/A"],
  ["Keterkaitan dengan BPR", ":", selectedData?.keterkaitandgnBpr || "N/A", "Status Pembiayaan", ":", selectedData?.statusPembiayaan || "N/A"],
  ["Jenis Kredit", ":", selectedData?.jenisKredit || "N/A", "Tujuan Penggunaan Dana", ":", selectedData?.tujuanPenggunaanDana || "N/A"],
];
console.log("Tanggal MAK:", selectedData?.tanggalMAK);
doc.autoTable({
  head: [],
  body: tableData,
  theme: "grid",
  startY: 43,
  styles: {
    fontSize: 8,
    cellPadding: 2,
    lineHeight: 1.2,
    valign: "middle",
    halign: "left",
  },
  columnStyles: {
    0: { cellWidth: 40 },
    1: { cellWidth: 5 },
    2: { cellWidth: 50 },
    3: { cellWidth: 40 },
    4: { cellWidth: 5 }, 
    5: { cellWidth: 50 }, 
  },
  margin: { top: 50, left: 10 },
});

// Section: Checkboxes
const ringkasanStartY = doc.lastAutoTable.finalY + 10;

const tableRingkasanPengajuanKredit = selectedData?.tableRingkasanPengajuanKredit || [];

const formatNumberWithDot = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ringkasanData = tableRingkasanPengajuanKredit.map(item => ({
  jenisKredit: item.jenisKredit || "N/A",
  plafond: item.plafond ? "Rp " + formatNumberWithDot(item.plafond) : "N/A",
  sukuBunga: item.sukuBunga || "N/A",
  tenor: item.tenor || "N/A",
  biayaProvisi: item.biayaProvisi ? "Rp " + formatNumberWithDot(item.biayaProvisi) : "N/A",
  biayaAdm: item.biayaAdm ? "Rp " + formatNumberWithDot(item.biayaAdm) : "N/A"
}));

doc.setFontSize(10);
doc.text("RINGKASAN PENGAJUAN KREDIT", 10, ringkasanStartY);

doc.autoTable({
  head: [[
    "JENIS KREDIT", 
    "PLAFOND", 
    "SUKU BUNGA", 
    "TENOR", 
    "BIAYA PROVISI", 
    "BIAYA ADM"
  ]],
  body: ringkasanData.map(item => [
    item.jenisKredit,
    item.plafond,
    item.sukuBunga,
    item.tenor,
    item.biayaProvisi,
    item.biayaAdm
  ]),
  theme: 'grid',
  startY: ringkasanStartY + 5,
  styles: {
    fontSize: 8,
    cellPadding: 2,
    lineHeight: 1.2,
    halign: 'center',
  },
  columnStyles: {
    0: { cellWidth: 40 }, 
    1: { cellWidth: 35 }, 
    2: { cellWidth: 35 }, 
    3: { cellWidth: 30 },
    4: { cellWidth: 25 }, 
    5: { cellWidth: 25 } 
  },
  margin: { top: 10 },
  didDrawPage: (data) => {
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Halaman " + doc.internal.getNumberOfPages(), 190, 290, { align: "right" });
  }
});

const recommendationStartY = doc.lastAutoTable.finalY + 8;
const boxWidth = 180;

doc.setFontSize(10);
doc.text("TUJUAN PENGAJUAN KREDIT", 10, recommendationStartY);

const tujuanPengajuan = selectedData?.tujuanPengajuanKredit || ["Tidak ada informasi"];

const formattedTujuan = tujuanPengajuan.map((item, index) => `${item.trim()}`).join("\n");

const wrappedText = doc.splitTextToSize(formattedTujuan, boxWidth - 10);

const textDimension = doc.getTextDimensions(wrappedText);
const boxHeight = textDimension.h + 15;

doc.setFontSize(8);
doc.setLineWidth(0.5);
doc.rect(10, recommendationStartY + 5, boxWidth, boxHeight); 
doc.text("Tujuan Pengajuan Kredit Adalah:", 15, recommendationStartY + 12); 
doc.text(wrappedText, 20, recommendationStartY + 17); 

  if (doc.lastAutoTable.finalY > 170) {
    doc.addPage();
  }

  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);
  
  const analysisStartY = 35; 
  doc.setFontSize(10);
  doc.text("I.   ANALISA KUALITATIF", 10, analysisStartY);
  
  // Menambahkan "Profil Debitur"
const analysisStartY1 = analysisStartY + 6;
doc.setFontSize(8);
doc.text("1. Profil Debitur", 8, analysisStartY1);

const profilDebitur = selectedData?.profilDebitur || "Tidak ada informasi";
const startY = analysisStartY1 + 8;
const textDimensions = doc.getTextDimensions(profilDebitur);

// Menentukan lebar dan pemecahan teks agar kotak sesuai
const boxWidth2 = 190;
const lines = doc.splitTextToSize(profilDebitur, boxWidth2 - 10);
const boxHeight2 = lines.length * 3 + 10; // Menyesuaikan tinggi kotak berdasarkan jumlah baris teks

// Menambahkan kotak dan teks
const maxWidth = boxWidth2 - 12;
doc.setLineWidth(0.5);
doc.rect(10, startY - 5, boxWidth2, boxHeight2);
doc.text(lines, 15, startY, { maxWidth: maxWidth });

// Menambahkan "2. Analisa Usaha / Pekerjaan"
const analysisStartY2 = startY + boxHeight2 + 2; // Jarak setelah kotak "Profil Debitur"
doc.setFontSize(8);
doc.text("2. Analisa Usaha / Pekerjaan", 8, analysisStartY2);

const analisaUsahaPekerjaan = selectedData?.analisaUsahaPekerjaan || "Tidak ada informasi";
const startY2 = analysisStartY2 + 8;
const formattedText = analisaUsahaPekerjaan
  .map(text => text.trim() === "" ? "\n" : text) // Ganti string kosong dengan baris baru
  .join("\n");

// Menentukan dimensi teks untuk analisaUsahaPekerjaan
const boxWidth3 = 190;
const lines2 = doc.splitTextToSize("LATAR BELAKANG & AKTIVITAS USAHA\n" + "\n" + formattedText, boxWidth3 - 10);

// Menyesuaikan tinggi kotak berdasarkan jumlah baris
const boxHeight3 = lines2.length * 5 + 10; // Sesuaikan tinggi kotak berdasarkan jumlah baris

// Menambahkan kotak dan teks
const maxWidth2 = boxWidth3 - 12;
doc.setLineWidth(0.5);
doc.rect(10, startY2 - 5, boxWidth3, boxHeight3);
doc.text(lines2, 15, startY2, { maxWidth: maxWidth2 });

const totalPages = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor); 
}

if (doc.lastAutoTable.finalY > 170) {
  doc.addPage();
}

doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

const analysisStartY3 = analysisStartY + 3;
doc.setFontSize(8);

// Ambil data dari selectedData
const aspekPengadaanBarang = selectedData?.aspekPengadaanBarang || "Tidak ada informasi";
const aspekPengadaanBarang2 = aspekPengadaanBarang
  .map(text => text.trim() === "" ? "\n" : text) // Ganti string kosong dengan baris baru
  .join("\n");
  const tableInvoicePembelian = selectedData?.tableInvoicePembelian || [];

  // Ambil data dari objek tableInvoicePembelian
  const invoices = tableInvoicePembelian.map(item => item.invoices || "-");
  const nominals = tableInvoicePembelian.map(item => parseFloat(item.nominals.replace(/\./g, "").trim()) || 0);
  const namaSupplier = tableInvoicePembelian.map(item => item.namaSupplier || "-");
  const noteInvoice = selectedData?.noteInvoice || [];
  
  // Hitung total nominal
  const totalNominal = nominals.reduce((sum, val) => sum + val, 0).toLocaleString("id-ID") || '';
  
  // Gabungkan Note menjadi satu teks
  const noteText = "Note:\n" + noteInvoice.map(n => (n.trim() === "" ? "\n" : n)).join("\n");
  
  // Tentukan jumlah baris berdasarkan array terpanjang
  const maxRows = tableInvoicePembelian.length;
  
  // Posisi awal untuk teks dan tabel
  const startY1 = analysisStartY3 + 0;
  const boxWidth4 = 190;
  const rowHeight1 = 6;
  
  // Pisahkan teks agar tidak terlalu panjang
  const lines1 = doc.splitTextToSize("ASPEK PENGADAAN BARANG/BAHAN BAKU\n\n" + aspekPengadaanBarang2 + "\n\nBerikut ini terlampir invoice pembelian :", boxWidth4 - 8);
  const textHeight = lines1.length * 3;
  
  // Pisahkan teks Note agar tidak terlalu panjang
  const noteLines = doc.splitTextToSize(noteText, boxWidth4 - 10);
  const noteHeight = noteLines.length * 3;
  
  // Hitung total tinggi kotak agar mencakup teks + tabel + total + Note
  const boxHeight4 = textHeight + (maxRows * rowHeight1) + noteHeight + 130;
  
  // Buat kotak utama
  doc.setLineWidth(0.5);
  doc.rect(10, startY1 - 5, boxWidth4, boxHeight4);
  doc.text(lines1, 15, startY1);
  
  // Posisi awal tabel di dalam kotak
  const tableStartY = startY1 + textHeight + 6;
  const colWidths = { no: 12, invoice: 70, nominal: 40, supplier: 60 };
  
  // **Tambahkan garis atas sebelum header**
  doc.line(10, tableStartY - 4, 200, tableStartY - 4); // Garis atas header
  
  // Header tabel
  doc.setFontSize(8);
  doc.text("No", 12, tableStartY);
  doc.text("Invoice", 25, tableStartY);
  doc.text("Nominal", 100, tableStartY);
  doc.text("Nama Supplier", 145, tableStartY);
  doc.line(10, tableStartY + 2, 200, tableStartY + 2); // Garis bawah header
  
  // Isi tabel + garis pemisah
  let rowY = tableStartY + rowHeight1;
  for (let i = 0; i < maxRows; i++) {
      // **Pisahkan teks invoice agar tidak terlalu panjang**
      const invoiceLines = doc.splitTextToSize(invoices[i], colWidths.invoice - 5);
      const supplierLines = doc.splitTextToSize(namaSupplier[i], colWidths.supplier - 5);
  
      // **Hitung tinggi baris berdasarkan jumlah baris teks terpanjang**
      const rowHeightDynamic = Math.max(invoiceLines.length, supplierLines.length) * rowHeight1;
  
      // Cetak teks dalam tabel
      doc.text(String(i + 1), 12, rowY);
      doc.text(invoiceLines, 25, rowY, { maxWidth: colWidths.invoice - 5 });
      doc.text(nominals[i].toLocaleString("id-ID"), 100, rowY) || '';
      doc.text(supplierLines, 145, rowY, { maxWidth: colWidths.supplier - 5 });
  
      // Garis pemisah antar baris
      doc.line(10, rowY + rowHeightDynamic - 2, 200, rowY + rowHeightDynamic - 2);
  
      // Update rowY dengan tinggi baris yang baru
      rowY += rowHeightDynamic;
  }
  
  // **Tambahkan garis penutup atas header**
  doc.line(10, tableStartY - 4, 200, tableStartY - 4);
  
  // Baris Total di bawah tabel
  rowY += 2;
  doc.setFontSize(9);
  doc.text("Total", 25, rowY);
  doc.text(totalNominal, 100, rowY);
  doc.line(10, rowY + 2, 200, rowY + 2); // Garis bawah total
  
  // **Garis vertikal untuk memisahkan kolom**
  doc.line(22, tableStartY - 4, 22, rowY + 2);
  doc.line(95, tableStartY - 4, 95, rowY + 2);
  doc.line(140, tableStartY - 4, 140, rowY + 2);
  doc.line(200, tableStartY - 4, 200, rowY + 2);
  
  // **Tambahkan Note di bawah tabel**
  const noteStartY = rowY + 8;
  doc.setFontSize(8);
  doc.text(noteLines, 15, noteStartY);
  
  // **TABEL KEDUA**: No | Nama Toko | Nominal Belanja
  const tableBuktiTransaksiPembelian = selectedData?.tableBuktiTransaksiPembelian || [];

// Ambil data untuk tabel kedua
const namaToko = [...new Set(tableBuktiTransaksiPembelian.map(item => item.namaToko))]; // Ambil nama toko unik
const totalNominalBelanja = {};

namaToko.forEach(nama => {
    totalNominalBelanja[nama] = tableBuktiTransaksiPembelian
        .filter(item => item.namaToko === nama)
        .reduce((sum, item) => sum + parseFloat(item.nominalBelanja.replace(/\./g, "").trim()), 0);
});

// Posisi awal untuk tabel kedua (di bawah tabel pertama)
const table2StartY = Math.max(rowY + 20, noteStartY + noteHeight + 10);
const colWidths2 = { no: 12, namaToko: 90, nominalBelanja: 80 };

// Tambahkan teks sebelum tabel kedua
doc.setFontSize(8);
doc.text("Berikut ini terlampir beberapa bukti transaksi pembelian :", 15, table2StartY - 6); 

// **Tambahkan garis atas sebelum header tabel kedua**
// Garis atas header tabel kedua
doc.line(10, table2StartY - 4, 200, table2StartY - 4); // Garis atas header

// Header tabel kedua
doc.setFontSize(8);
doc.text("No", 12, table2StartY);
doc.text("Nama Toko", 25, table2StartY);
doc.text("Nominal Belanja", 120, table2StartY);
doc.line(10, table2StartY + 2, 200, table2StartY + 2); // Garis bawah header

// Isi tabel kedua + garis pemisah
let rowY2 = table2StartY + rowHeight1;
namaToko.forEach((nama, index) => {
    doc.text(String(index + 1), 12, rowY2);
    doc.text(nama, 25, rowY2);
    doc.text('Rp ' + totalNominalBelanja[nama].toLocaleString("id-ID"), 120, rowY2) || '';

    doc.line(10, rowY2 + 2, 200, rowY2 + 2); // Garis antar baris
    rowY2 += rowHeight1;
});

// Hitung total transaksi pembelian stock
const totalTransaksi = Object.values(totalNominalBelanja).reduce((sum, value) => sum + value, 0).toLocaleString("id-ID") || '';

// Tambahkan teks "Total transaksi pembelian stock"
doc.setFontSize(8);
doc.text("Total transaksi pembelian stock", 25, rowY2 + 2); // Posisi teks Total
doc.text('Rp ' + totalTransaksi, 120, rowY2 + 2); // Nominal Total

// Garis penutup bawah tabel kedua
doc.line(10, rowY2 + 6, 200, rowY2 + 6);

// Garis vertikal untuk memisahkan kolom tabel kedua
doc.line(22, table2StartY - 4, 22, rowY2 + 6);
doc.line(115, table2StartY - 4, 115, rowY2 + 6);
doc.line(200, table2StartY - 4, 200, rowY2 + 6);

// Tambahkan teks "Note" di bawah total transaksi
const noteStartY2 = rowY2 + 12; // Jarak dari total transaksi ke Note
doc.setFontSize(8);
doc.text(`Note: untuk total transaksi pembelian stok yang terlampir dengan jumlah Rp ${totalTransaksi} dari berbagai jenis toko.`, 15, noteStartY2, { maxWidth: 190 });

const table3StartY = noteStartY2 + 10;

// Menambahkan judul "Hasil Verifikasi Supplier Bahan Baku"
doc.setFontSize(8); // Atur ukuran font lebih besar untuk judul
doc.text("Hasil Verifikasi Supplier Bahan Baku", 15, table3StartY - 6);

// Garis pembatas atas header tabel
doc.line(10, table3StartY - 4, 200, table3StartY - 4);

// Header tabel ketiga
doc.setFontSize(8);
doc.text("No", 12, table3StartY);
doc.text("Nama Toko", 25, table3StartY);
doc.text("No. telpon/web dan online shop", 90, table3StartY);
doc.line(10, table3StartY + 2, 200, table3StartY + 2);

const hasilVerifikasiSupplier = selectedData?.tableHasilVerifikasiSupplier || "Tidak ada informasi";

let rowY3 = table3StartY + 10;
const rowHeight3 = 6;

hasilVerifikasiSupplier.forEach((item, index) => {
    doc.text(String(index + 1), 12, rowY3);
    doc.text(item.namaToko || "-", 25, rowY3);
    doc.text(item.noteleponWeb || "-", 90, rowY3);

    rowY3 += rowHeight3;
});

// Garis pembatas kolom tabel
doc.line(22, table3StartY - 4, 22, rowY3);
doc.line(85, table3StartY - 4, 85, rowY3);
doc.line(10, rowY3, 200, rowY3);

// Menambahkan teks di bawah tabel
const footerStartY = rowY3 + 8; // Posisi di bawah tabel
doc.setFontSize(9); // Ukuran font untuk teks tambahan

doc.text("1. No telpon Komuk Komie: .....", 12, footerStartY);
doc.text("2. Website Komuk Komike: .....", 12, footerStartY + 6);
doc.text("3. Online Shop Komuk Komike: .....", 12, footerStartY + 12);
doc.text("Lampiran verifikasi", 12, footerStartY + 18);

const totalPages3 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages3; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

if (doc.lastAutoTable.finalY > 170) {
  doc.addPage();
}

// Posisi awal untuk judul
const analysisStartY5 = analysisStartY + 4;

// Menambahkan teks judul di dalam kotak
doc.setFontSize(8);
doc.text("ASPEK PEMASARAN/DISTRIBUSI", 12, analysisStartY5 + 4); // Posisi teks sedikit turun agar terlihat di dalam kotak

// Konten untuk Aspek Pemasaran/Distribusi
const aspekPemasaranDistribusi = selectedData?.aspekPemasaranDistribusi || "Tidak ada informasi";
const aspekPemasaranDistribusi2 = aspekPemasaranDistribusi
  .map(text => text.trim() === "" ? "\n" : text) // Ganti string kosong dengan baris baru
  .join("\n");
const startY3 = analysisStartY5 + 12; // Memulai teks setelah judul
const boxWidth5 = 190;

// Memecah teks agar sesuai dalam kotak
const lines3 = doc.splitTextToSize(aspekPemasaranDistribusi2, boxWidth5 - 10);
const boxHeight5 = lines3.length * 3 + 20; // Tambahkan lebih tinggi agar ada ruang untuk judul

// Menambahkan kotak
doc.setLineWidth(0.5);
doc.rect(10, analysisStartY5, boxWidth5, boxHeight5);

// Menambahkan teks konten di dalam kotak
doc.text(lines3, 15, startY3);

const startY4 = analysisStartY5 + boxHeight5 + 6; // Mengatur jarak dengan kotak sebelumnya

// Menambahkan teks judul di dalam kotak
doc.setFontSize(8);
doc.text("KONTRAK KERJA YANG DIMILIKI", 12, startY4 + 4); // Judul untuk kotak baru

// Konten untuk Kontrak Kerja yang Dimiliki
const kontrakKerjaDimiliki = selectedData?.kontrakKerjaDimiliki || "Tidak ada informasi";
const startYContent = startY4 + 12; // Memulai teks setelah judul
const boxWidth6 = 190;

// Memecah teks agar sesuai dalam kotak
const lines4 = doc.splitTextToSize(kontrakKerjaDimiliki, boxWidth6 - 10);
const boxHeight6 = lines4.length * 3 + 20; // Tambahkan lebih tinggi agar ada ruang untuk judul

// Menambahkan kotak
doc.setLineWidth(0.5);
doc.rect(10, startY4, boxWidth6, boxHeight6);

// Menambahkan teks konten di dalam kotak
doc.text(lines4, 15, startYContent);

// Posisi awal untuk kotak baru di bawah kotak sebelumnya
const startY5 = startY4 + boxHeight6 + 6; // Mengatur jarak dengan kotak sebelumnya

// Menambahkan teks judul di dalam kotak
doc.setFontSize(8);
doc.text("ASPEK RENCANA PENGEMBANGAN USAHA", 12, startY5 + 4); // Judul untuk kotak baru

// Konten untuk Aspek Rencana Pengembangan Usaha
const aspekRencanaPengembanganUsaha = selectedData?.aspekRencanaPengembanganUsaha || "Tidak ada informasi";
const startYContent2 = startY5 + 12; // Memulai teks setelah judul
const boxWidth7 = 190;

// Memecah teks agar sesuai dalam kotak
const lines5 = doc.splitTextToSize(aspekRencanaPengembanganUsaha, boxWidth7 - 10);
const boxHeight7 = lines5.length * 3 + 20; // Tambahkan lebih tinggi agar ada ruang untuk judul

// Menambahkan kotak
doc.setLineWidth(0.5);
doc.rect(10, startY5, boxWidth7, boxHeight7);

// Menambahkan teks konten di dalam kotak
doc.text(lines5, 15, startYContent2);

const startY6 = startY5 + boxHeight7 + 15; // Mengatur jarak dari kotak sebelumnya

doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

const analysisStartY4 = analysisStartY + 3;
doc.setFontSize(8);

 // Deklarasikan businessPhotos sebelum digunakan
const photoUsaha = selectedData?.photoUsaha || [];

const totalPages4 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages4; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}
// Kemudian lanjutkan dengan penggunaan photoUsaha
if (doc.lastAutoTable.finalY > 10) {
  doc.addPage();
}

// Menambahkan logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Menambahkan judul
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Garis horizontal di bawah judul
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

let analysisStartY6 = 40; // Jarak awal untuk elemen berikutnya

// Menambahkan teks "FOTO USAHA"
doc.setFontSize(8);
doc.text("FOTO USAHA", 10, analysisStartY6);

// Alamat Lokasi
const alamatPerusahaanUsaha = selectedData?.alamatPerusahaanUsaha || "Tidak ada informasi";
const maxWidthAlamat = 160;
const alamatLines = doc.splitTextToSize(alamatPerusahaanUsaha, maxWidthAlamat);

// Posisi alamat agar lebih rapi
const startYAlamat = analysisStartY6 + 8;
doc.text("Alamat Lokasi :", 10, startYAlamat);
doc.text(alamatLines, 40, startYAlamat, { maxWidth: maxWidthAlamat });

// Menentukan posisi berikutnya
const alamatHeight = alamatLines.length * 5;
const nextStartY = startYAlamat + alamatHeight + 6; // Mengurangi jarak antar elemen

analysisStartY6 = nextStartY;

// Menambahkan Foto Usaha
const startY8 = Math.max(analysisStartY6 - 4);

// Mengambil array foto dan menambahkannya
const photoWidth = 53;
const photoHeight = 40;
const gap = 10;
const photosPerRow = 3;
const totalPhotoRows = Math.ceil(photoUsaha.length / photosPerRow);
const totalPhotoHeight = totalPhotoRows * photoHeight + (totalPhotoRows + 1) * gap;

doc.setFontSize(8);

// // Ubah jarak posisi teks "Foto Usaha" agar lebih dekat dengan alamat
// const gapBetweenAlamatAndFoto = 3; // Jarak teks dengan alamat lebih kecil
// doc.text("Foto Usaha:", 10, startY8 - gapBetweenAlamatAndFoto);

doc.setLineWidth(0.5);
doc.rect(10, startY8, (photoWidth + gap) * photosPerRow - gap + 10, totalPhotoHeight + 10);

// Menambahkan foto ke dalam kotak dengan teks masing-masing di atasnya
for (let i = 0; i < photoUsaha.length; i++) {
  const row = Math.floor(i / photosPerRow); // Baris saat ini
  const col = i % photosPerRow; // Kolom saat ini

  const x = 15 + col * (photoWidth + gap); // Posisi X untuk foto
  const y = startY8 + 5 + row * (photoHeight + gap); // Posisi Y untuk foto

  // Ambil deskripsi dari photoUsaha
  const description = photoUsaha[i]?.description || "Deskripsi tidak tersedia";

  // Menambahkan teks deskripsi di atas gambar
  doc.text(description, x, y - 1);

  // Menambahkan gambar foto jika ada
  if (photoUsaha[i]?.url) {
    doc.addImage(
      photoUsaha[i].url, // URL gambar dari data Firebase
      "JPEG",
      x,
      y,
      photoWidth,
      photoHeight
    );
  }
}

  // Menangani jika kurang dari 12 foto
  if (photoUsaha.length < 12) {
    console.log(`Kurang ${12 - photoUsaha.length} foto untuk memenuhi 12 foto.`);
  }

  const totalPages5 = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages5; i++) {
    doc.setPage(i); // Pindah ke halaman tertentu
    const previousTextColor = doc.getTextColor(); 
    doc.setFontSize(8); // Atur ukuran font
    doc.setTextColor(150); // Atur warna teks
    doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
    doc.setTextColor(previousTextColor);
  }

  if (doc.lastAutoTable.finalY > 170) {
    doc.addPage();
  }

  // Menambahkan logo
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
  
  // Menambahkan judul "MEMORANDUM ANALISA KREDIT"
  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  // Menambahkan garis horizontal
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);
  
  // Menambahkan teks "II. ANALISA KUANTITATIF" sebelum tabel
  doc.setFontSize(10);
  doc.text("II. ANALISA KUANTITATIF", 10, 40);
  
  // Menambahkan teks "1. REKAPITULASI SLIK"
  doc.setFontSize(8);
  doc.text("1. REKAPITULASI SLIK", 10, 50);
  
  // Menambahkan teks dengan nama
  doc.text("Nama : " + selectedData?.namaSlik || "", 10, 60);
  
  // Data dari selectedData?.tableRekapitulatif
  const tableRekapitulatif = selectedData?.tableRekapitulatif || [];
  
  // Menyiapkan data untuk tabel berdasarkan tableRekapitulatif
  const headers = ["No", "Nama Bank", "Plafon", "Baki Debet", "Angsuran", "Kol", "Ket."];
  const data = tableRekapitulatif.map((item, index) => [
    index + 1, // No
    item.namaBankLjk || '', // Nama Bank
    item.plafon ? parseInt(item.plafon.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Plafon
    item.bakiDebet ? parseInt(item.bakiDebet.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Baki Debet
    item.angsuran ? parseInt(item.angsuran.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Angsuran
    item.kol || '', // Kol
    item.ket || '' // Keterangan
  ]);
  
  const cleanNumber = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/\./g, '')) || 0;
    }
    return parseFloat(value) || 0;
  };
  
  // Hitung total dengan nilai asli (tanpa format)
  const totalPlafon = data.reduce((sum, row) => sum + cleanNumber(row[2]), 0);
  const totalBakiDebet = data.reduce((sum, row) => sum + cleanNumber(row[3]), 0);
  const totalAngsuran = data.reduce((sum, row) => sum + cleanNumber(row[4]), 0);
  
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 65, // Menentukan posisi awal tabel
    theme: 'grid', // Tabel dengan garis
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
    bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
    styles: { cellPadding: 2 },
    foot: [
      [
        { content: 'Total', colSpan: 2, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: totalPlafon.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: totalBakiDebet.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: totalAngsuran.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: '', colSpan: 2 } // Mengosongkan dua kolom terakhir
      ]
    ],
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, fontStyle: 'bold', lineColor: [0, 0, 0] } // Styling footer
  });

// Menambahkan kotak "Catatan Hasil SLIK" di bawah tabel
const tableBottom = doc.lastAutoTable.finalY + 8; // Posisi Y di bawah tabel
const boxMargin = 7; // Margin untuk kotak
const lineHeight = 5; // Tinggi per baris teks (dapat disesuaikan)

// Data catatan hasil SLIK dari selectedData
const catatanHasilSlik = selectedData?.catatanHasilSlik || [];

// Menggabungkan array catatan menjadi string dengan pemisah baris baru
const catatanText = catatanHasilSlik.join('\n');

// Menghitung jumlah baris teks
const numLines = doc.splitTextToSize(catatanText, 180).length;

// Menentukan tinggi kotak berdasarkan jumlah baris
const boxHeight8 = numLines * lineHeight + boxMargin * 2; // Menyesuaikan tinggi kotak berdasarkan jumlah baris

// Gambar kotak (box)
doc.setLineWidth(0.5);
doc.rect(10, tableBottom, 190, boxHeight8);

// Menambahkan teks "Catatan Hasil SLIK:" di dalam kotak
doc.setFontSize(8);
doc.text("Catatan Hasil SLIK:", 15, tableBottom + 8);

// Menambahkan teks catatan ke dalam kotak dengan batas lebar
doc.setFontSize(8);
doc.text(catatanText, 15, tableBottom + 15, { maxWidth: 180, lineHeightFactor: 1.2 });
  
const totalPages6 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages6; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

  if (doc.lastAutoTable.finalY > 90) {
    doc.addPage();
  }

  // Menambahkan logo
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
  
  // Menambahkan judul "MEMORANDUM ANALISA KREDIT"
  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  // Menambahkan garis horizontal
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);
  
  // Menambahkan teks dengan nama
  doc.setFontSize(8);
  doc.text("Nama : " + selectedData?.namaSlik2 || "", 10, 60);
  
  // Data dari selectedData?.tableRekapitulatif
  const tableRekapitulatif2 = selectedData?.tableRekapitulatif2 || [];
  
  // Menyiapkan data untuk tabel berdasarkan tableRekapitulatif
  const headers2 = ["No", "Nama Bank", "Plafon", "Baki Debet", "Angsuran", "Kol", "Ket."];
  const data2 = tableRekapitulatif2.map((item, index) => [
    index + 1, // No
    item.namaBankLjk || '', // Nama Bank
    item.plafon ? parseInt(item.plafon.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Plafon
    item.bakiDebet ? parseInt(item.bakiDebet.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Baki Debet
    item.angsuran ? parseInt(item.angsuran.replace(/\./g, ''), 10).toLocaleString("id-ID") : '', // Angsuran
    item.kol || '', // Kol
    item.ket || '' // Keterangan
  ]);
  
  const cleanNumber2 = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/\./g, '')) || 0;
    }
    return parseFloat(value) || 0;
  };
  
  // Hitung total dengan nilai asli (tanpa format)
  const totalPlafon2 = data2.reduce((sum, row) => sum + cleanNumber2(row[2]), 0);
  const totalBakiDebet2 = data2.reduce((sum, row) => sum + cleanNumber2(row[3]), 0);
  const totalAngsuran2 = data2.reduce((sum, row) => sum + cleanNumber2(row[4]), 0);

  doc.autoTable({
    head: [headers2],
    body: data2,
    startY: 65, // Menentukan posisi awal tabel
    theme: 'grid', // Tabel dengan garis
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
    bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
    styles: { cellPadding: 2 },
    foot: [
      [
        { content: 'Total', colSpan: 2, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: totalPlafon2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: totalBakiDebet2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: totalAngsuran2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } },
        { content: '', colSpan: 2 } // Mengosongkan dua kolom terakhir
      ]
    ],
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, fontStyle: 'bold', lineColor: [0, 0, 0] } // Styling footer
  });

// Menambahkan kotak "Catatan Hasil SLIK" di bawah tabel
const tableBottom2 = doc.lastAutoTable.finalY + 8; // Posisi Y di bawah tabel
const boxMargin2 = 7; // Margin untuk kotak
const lineHeight2 = 5; // Tinggi per baris teks (dapat disesuaikan)

// Data catatan hasil SLIK dari selectedData
const catatanHasilSlik2 = selectedData?.catatanHasilSlik2 || [];

// Menggabungkan array catatan menjadi string dengan pemisah baris baru
const catatanText2 = catatanHasilSlik2.join('\n');

// Menghitung jumlah baris teks
const numLines2 = doc.splitTextToSize(catatanText2, 180).length;

// Menentukan tinggi kotak berdasarkan jumlah baris
const boxHeight9 = numLines2 * lineHeight2 + boxMargin2 * 2; // Menyesuaikan tinggi kotak berdasarkan jumlah baris

// Gambar kotak (box)
doc.setLineWidth(0.5);
doc.rect(10, tableBottom2, 190, boxHeight9);

// Menambahkan teks "Catatan Hasil SLIK:" di dalam kotak
doc.setFontSize(8);
doc.text("Catatan Hasil SLIK:", 15, tableBottom2 + 8);

// Menambahkan teks catatan ke dalam kotak dengan batas lebar
doc.setFontSize(8);
doc.text(catatanText2, 15, tableBottom2 + 15, { maxWidth: 180, lineHeightFactor: 1.2 });

const totalPages7 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages7; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

if (doc.lastAutoTable && doc.lastAutoTable.finalY > 70) {
  doc.addPage();
}

// Menambahkan logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Menambahkan judul "MEMORANDUM ANALISA KREDIT"
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Menambahkan garis horizontal
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

doc.setFontSize(8);
doc.text("2. ANALISA REKENING KORAN", 10, 40);

doc.setFontSize(8);
doc.text("Rekening Koran Bank   : " + (selectedData?.rekeningKoranBank || "N/A"), 10, 47);
doc.text("No. Rekening          : " + (selectedData?.noRekening || "N/A"), 10, 55);
doc.text("Atas Nama             : " + (selectedData?.atasNama || "N/A"), 10, 63);
doc.text("Periode               : " + (selectedData?.periode || "N/A"), 10, 71);

// Menyiapkan data untuk tabel berdasarkan selectedData?.tableAnalisaRekKoran
const tableAnalisaRekKoran = selectedData?.tableAnalisaRekKoran || [];
const headers3 = ["BULAN", "MUTASI DEBET", "QTY", "MUTASI KREDIT", "QTY", "SALDO RATA-RATA"];
const data3 = tableAnalisaRekKoran.map((item) => [
  item.bulan || '', // BULAN
  parseInt(item.mutasiDebet, 10).toLocaleString("id-ID") || '',
  item.qty1 || '', // Qty Debet
  parseInt(item.mutasiKredit, 10).toLocaleString("id-ID") || '',
  item.qty2 || '', // Qty Kredit
  parseInt(item.saldoRataRata, 10).toLocaleString("id-ID") || '',
]);

// Menghitung total untuk setiap kolom yang diinginkan setelah mengonversi nilai string menjadi angka
const totalMutasiDebet = data3.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
const totalQtyDebet = data3.reduce((sum, row) => sum + parseFloat(row[2] || 0), 0);
const totalMutasiKredit = data3.reduce((sum, row) => sum + parseFloat(row[3] || 0), 0);
const totalQtyKredit = data3.reduce((sum, row) => sum + parseFloat(row[4] || 0), 0);
const totalSaldoRataRata = data3.reduce((sum, row) => sum + parseFloat(row[5] || 0), 0);

// Menghitung rata-rata untuk setiap kolom
const totalRows = data3.length;
const avgMutasiDebet = totalRows > 0 ? totalMutasiDebet / totalRows : 0;
const avgQtyDebet = totalRows > 0 ? totalQtyDebet / totalRows : 0;
const avgMutasiKredit = totalRows > 0 ? totalMutasiKredit / totalRows : 0;
const avgQtyKredit = totalRows > 0 ? totalQtyKredit / totalRows : 0;
const avgSaldoRataRata = totalRows > 0 ? totalSaldoRataRata / totalRows : 0;

// Menambahkan tabel ke dalam dokumen PDF
const tableStartY2 = 75; // Posisi tabel mulai
doc.autoTable({
  head: [headers3],
  body: data3,
  startY: tableStartY2,
  theme: 'grid',
  headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  styles: { cellPadding: 2 },
  foot: [
    // Total per kolom
    [
      { content: 'Total', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Total"
      { content: totalMutasiDebet.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Debet
      { content: totalQtyDebet.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Debet
      { content: totalMutasiKredit.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Kredit
      { content: totalQtyKredit.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Kredit
      { content: totalSaldoRataRata.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Saldo Rata-rata
    ],
    // Rata-rata per kolom
    [
      { content: 'Rata-rata', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Rata-rata"
      { content: avgMutasiDebet.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Debet
      { content: avgQtyDebet.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Debet
      { content: avgMutasiKredit.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Kredit
      { content: avgQtyKredit.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Kredit
      { content: avgSaldoRataRata.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Saldo Rata-rata
    ]
  ],
  footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, fontStyle: 'bold', lineColor: [0, 0, 0] },
});

const explanationText = [
  'Penjelasan Laporan Rekening koran :',
  '• Total saldo dari mutase debet untuk rata-ratanya adalah ' + avgMutasiDebet.toLocaleString(),
  '• Total saldo dari mutase kredit untuk rata-ratanya adalah ' + avgMutasiKredit.toLocaleString(),
  '• Total saldo rata-rata per 6 bulan adalah ' + avgSaldoRataRata.toLocaleString(),
];

const textStartY = doc.lastAutoTable.finalY + 6; // Start text 10 units below the table
doc.setFontSize(8);
doc.setFont('helvetica');
explanationText.forEach((line, index) => {
  doc.text(line, 10, textStartY + (index * 6)); // Adjust text line spacing
});

const totalPages8 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages8; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

if (doc.lastAutoTable && doc.lastAutoTable.finalY > 70) {
  doc.addPage();
}

// Menambahkan logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Menambahkan judul "MEMORANDUM ANALISA KREDIT"
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Menambahkan garis horizontal
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

doc.setFontSize(8);
doc.text("Rekening Koran Bank   : " + (selectedData?.rekeningKoranBank2 || "N/A"), 10, 40);
doc.text("No. Rekening          : " + (selectedData?.noRekening2 || "N/A"), 10, 48);
doc.text("Atas Nama             : " + (selectedData?.atasNama2 || "N/A"), 10, 56);
doc.text("Periode               : " + (selectedData?.periode2 || "N/A"), 10, 64);

// Menyiapkan data untuk tabel berdasarkan selectedData?.tableAnalisaRekKoran
const tableAnalisaRekKoran2 = selectedData?.tableAnalisaRekKoran2 || [];
const headers4 = ["BULAN", "MUTASI DEBET", "QTY", "MUTASI KREDIT", "QTY", "SALDO RATA-RATA"];
const data4 = tableAnalisaRekKoran2.map((item) => [
  item.bulan || '', // BULAN
  item.mutasiDebet || '0', // MUTASI DEBET
  item.qty1 || '0', // Qty Debet
  item.mutasiKredit || '0', // MUTASI KREDIT
  item.qty2 || '0', // Qty Kredit
  item.saldoRataRata || '0', // SALDO
]);

// Menghitung total untuk setiap kolom yang diinginkan setelah mengonversi nilai string menjadi angka
const totalMutasiDebet2 = data4.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
const totalQtyDebet2 = data4.reduce((sum, row) => sum + parseFloat(row[2] || 0), 0);
const totalMutasiKredit2 = data4.reduce((sum, row) => sum + parseFloat(row[3] || 0), 0);
const totalQtyKredit2 = data4.reduce((sum, row) => sum + parseFloat(row[4] || 0), 0);
const totalSaldoRataRata2 = data4.reduce((sum, row) => sum + parseFloat(row[5] || 0), 0);

// Menghitung rata-rata untuk setiap kolom
const totalRows2 = data4.length;
const avgMutasiDebet2 = totalRows2 > 0 ? totalMutasiDebet2 / totalRows2 : 0;
const avgQtyDebet2 = totalRows2 > 0 ? totalQtyDebet2 / totalRows2 : 0;
const avgMutasiKredit2 = totalRows2 > 0 ? totalMutasiKredit2 / totalRows2 : 0;
const avgQtyKredit2 = totalRows2 > 0 ? totalQtyKredit2 / totalRows2 : 0;
const avgSaldoRataRata2 = totalRows2 > 0 ? totalSaldoRataRata2 / totalRows2 : 0;

// Menambahkan tabel ke dalam dokumen PDF
const tableStartY4 = 68; // Posisi tabel mulai
doc.autoTable({
  head: [headers4],
  body: data4,
  startY: tableStartY4,
  theme: 'grid',
  headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  styles: { cellPadding: 2 },
  foot: [
    // Total per kolom
    [
      { content: 'Total', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Total"
      { content: totalMutasiDebet2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Debet
      { content: totalQtyDebet2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Debet
      { content: totalMutasiKredit2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Kredit
      { content: totalQtyKredit2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Kredit
      { content: totalSaldoRataRata2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Saldo Rata-rata
    ],
    // Rata-rata per kolom
    [
      { content: 'Rata-rata', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Rata-rata"
      { content: avgMutasiDebet2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Debet
      { content: avgQtyDebet2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Debet
      { content: avgMutasiKredit2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Kredit
      { content: avgQtyKredit2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Kredit
      { content: avgSaldoRataRata2.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Saldo Rata-rata
    ]
  ],
  footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, fontStyle: 'bold', lineColor: [0, 0, 0] },
});

const explanationText3 = [
  'Penjelasan Laporan Rekening koran :',
  '• Total saldo dari mutase debet untuk rata-ratanya adalah ' + avgMutasiDebet2.toLocaleString(),
  '• Total saldo dari mutase kredit untuk rata-ratanya adalah ' + avgMutasiKredit2.toLocaleString(),
  '• Total saldo rata-rata per 6 bulan adalah ' + avgSaldoRataRata2.toLocaleString(),
];

const textStartY2 = doc.lastAutoTable.finalY + 6; // Start text 10 units below the table
doc.setFontSize(8);
doc.setFont('helvetica');
explanationText3.forEach((line, index) => {
  doc.text(line, 10, textStartY2 + (index * 6)); // Adjust text line spacing
});

const totalPages9 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages9; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

if (doc.lastAutoTable && doc.lastAutoTable.finalY > 70) {
  doc.addPage();
}

// Menambahkan logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Menambahkan judul "MEMORANDUM ANALISA KREDIT"
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Menambahkan garis horizontal
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

doc.setFontSize(8);
doc.text("Rekening Koran Bank   : " + (selectedData?.rekeningKoranBank3 || "N/A"), 10, 40);
doc.text("No. Rekening          : " + (selectedData?.noRekening3 || "N/A"), 10, 48);
doc.text("Atas Nama             : " + (selectedData?.atasNama3 || "N/A"), 10, 56);
doc.text("Periode               : " + (selectedData?.periode3 || "N/A"), 10, 64);

// Menyiapkan data untuk tabel berdasarkan selectedData?.tableAnalisaRekKoran
const tableAnalisaRekKoran3 = selectedData?.tableAnalisaRekKoran3 || [];
const headers5 = ["BULAN", "MUTASI DEBET", "QTY", "MUTASI KREDIT", "QTY", "SALDO RATA-RATA"];
const data5 = tableAnalisaRekKoran3.map((item) => [
  item.bulan || '', // BULAN
  item.mutasiDebet || '0', // MUTASI DEBET
  item.qty1 || '0', // Qty Debet
  item.mutasiKredit || '0', // MUTASI KREDIT
  item.qty2 || '0', // Qty Kredit
  item.saldoRataRata || '0', // SALDO
]);

// Menghitung total untuk setiap kolom yang diinginkan setelah mengonversi nilai string menjadi angka
const totalMutasiDebet3 = data5.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
const totalQtyDebet3 = data5.reduce((sum, row) => sum + parseFloat(row[2] || 0), 0);
const totalMutasiKredit3 = data5.reduce((sum, row) => sum + parseFloat(row[3] || 0), 0);
const totalQtyKredit3 = data5.reduce((sum, row) => sum + parseFloat(row[4] || 0), 0);
const totalSaldoRataRata3 = data5.reduce((sum, row) => sum + parseFloat(row[5] || 0), 0);

// Menghitung rata-rata untuk setiap kolom
const totalRows3 = data5.length;
const avgMutasiDebet3 = totalRows3 > 0 ? totalMutasiDebet3 / totalRows3 : 0;
const avgQtyDebet3 = totalRows3 > 0 ? totalQtyDebet3 / totalRows3 : 0;
const avgMutasiKredit3 = totalRows3 > 0 ? totalMutasiKredit3 / totalRows3 : 0;
const avgQtyKredit3 = totalRows3 > 0 ? totalQtyKredit3 / totalRows3 : 0;
const avgSaldoRataRata3 = totalRows3 > 0 ? totalSaldoRataRata3 / totalRows3 : 0;

// Menambahkan tabel ke dalam dokumen PDF
const tableStartY3 = 68; // Posisi tabel mulai
doc.autoTable({
  head: [headers5],
  body: data5,
  startY: tableStartY3,
  theme: 'grid',
  headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 8, lineWidth: 0.2, lineColor: [0, 0, 0] },
  styles: { cellPadding: 2 },
  foot: [
    // Total per kolom
    [
      { content: 'Total', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Total"
      { content: totalMutasiDebet3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Debet
      { content: totalQtyDebet3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Debet
      { content: totalMutasiKredit3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Mutasi Kredit
      { content: totalQtyKredit3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Qty Kredit
      { content: totalSaldoRataRata3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Total Saldo Rata-rata
    ],
    // Rata-rata per kolom
    [
      { content: 'Rata-rata', colSpan: 1, styles: { halign: 'right', fontStyle: 'bold' } }, // Label "Rata-rata"
      { content: avgMutasiDebet3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Debet
      { content: avgQtyDebet3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Debet
      { content: avgMutasiKredit3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Mutasi Kredit
      { content: avgQtyKredit3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Qty Kredit
      { content: avgSaldoRataRata3.toLocaleString(), styles: { halign: 'center', fontStyle: 'bold' } }, // Rata-rata Saldo Rata-rata
    ]
  ],
  footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, fontStyle: 'bold', lineColor: [0, 0, 0] },
});

const explanationText2 = [
  'Penjelasan Laporan Rekening koran :',
  '• Total saldo dari mutase debet untuk rata-ratanya adalah ' + avgMutasiDebet2.toLocaleString(),
  '• Total saldo dari mutase kredit untuk rata-ratanya adalah ' + avgMutasiKredit2.toLocaleString(),
  '• Total saldo rata-rata per 6 bulan adalah ' + avgSaldoRataRata2.toLocaleString(),
];

const textStartY3 = doc.lastAutoTable.finalY + 6; // Start text 10 units below the table
doc.setFontSize(8);
doc.setFont('helvetica');
explanationText2.forEach((line, index) => {
  doc.text(line, 10, textStartY3 + (index * 6)); // Adjust text line spacing
});

const totalPages10 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages10; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

// Jika tabel melebihi batas Y tertentu, tambahkan halaman baru
if (doc.lastAutoTable.finalY > 70) {
  doc.addPage();
}

// Tambahkan gambar logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Tambahkan judul
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Garis bawah judul
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

// Tambahkan teks laporan
doc.setFontSize(8);
doc.text("a. Laporan Laba Rugi Proforma", 14, 40);

// Header tabel sesuai gambar
const headers6 = [
  [
    { content: "Deskripsi", rowSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } },
    { content: "Periode (Bulan)", colSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } },
    { content: "Proyeksi", colSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } }
  ],
  ["Nominal", "%", "Nominal", "%"]
];

const tableLabaRugiProforma = selectedData?.tableLabaRugiProforma || [];

const data6 = tableLabaRugiProforma.map((item, index) => [
  // index + 1, // No
  item.deskripsi || '',
  parseInt(item.nominalPeriode, 10).toLocaleString("id-ID") || '',
  item.persenPeriode || '',
  parseInt(item.nominalProyeksi, 10).toLocaleString("id-ID") || '',
  item.persenProyeksi || ''
]);

// Buat tabel
doc.autoTable({
  startY: 45,  // Mulai dari posisi Y yang aman
  head: headers6,
  body: data6,
  theme: "grid",
  styles: { fontSize: 8, halign: "center" }
});

const totalPages11 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages11; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

  if (doc.lastAutoTable.finalY > 10) {
    doc.addPage();
  }
  
  // Tambahkan gambar logo
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
  
  // Tambahkan judul
  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  // Garis bawah judul
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);
  
  // Tambahkan teks laporan
  doc.setFontSize(8);
  doc.text("b. Laporan Neraca Proforma", 14, 40);
  
  // Header tabel sesuai gambar
  const headers7 = [
    [
      { content: "Deskripsi", rowSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } },
      { content: "Periode (Bulan)", colSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } },
      { content: "Proyeksi", colSpan: 2, styles: { halign: "center", fillColor: [204, 204, 0] } }
    ],
    ["Nominal", "%", "Nominal", "%"]
  ];
  
  const tableNeracaProforma = selectedData?.tableNeracaProforma || [];
  
  // Mengubah data sesuai dengan format yang dibutuhkan oleh autoTable
  const data7 = tableNeracaProforma.map((item, index) => [
    index + 1, // No
    item.deskripsi || '',
    item.nominalPeriode || '0',
    item.persenPeriode || '0',
    item.nominalProyeksi || '0',
    item.persenProyeksi || '0'
  ]);
  
  // Buat tabel
  doc.autoTable({
    startY: 45,  // Mulai dari posisi Y yang aman
    head: headers7,
    body: data7,
    theme: "grid",
    styles: { fontSize: 8, halign: "center" }
  });

  const totalPages12 = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages12; i++) {
    doc.setPage(i); // Pindah ke halaman tertentu
    const previousTextColor = doc.getTextColor(); 
    doc.setFontSize(8); // Atur ukuran font
    doc.setTextColor(150); // Atur warna teks
    doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
    doc.setTextColor(previousTextColor);
  }

  if (doc.lastAutoTable.finalY > 10) {
    doc.addPage();
  }
  
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
  
  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);
  
  // Add "2. Analisa Repayment Capacity Berdasarkan Laporan Keuangan Proforma" text
  doc.setFontSize(8);
  doc.text("2. Analisa Repayment Capacity Berdasarkan Laporan Keuangan Proforma", 10, doc.lastAutoTable.finalY - 16);
  
  // Value from analisaRepaymentCapacity
  const analisaRepaymentCapacity = selectedData?.analisaRepaymentCapacity || "";
  
  // Set font size for the content box
  doc.setFontSize(8);
  
  // Draw a box for the content
  const boxX = 10; // Starting X position
  const boxY = doc.lastAutoTable.finalY - 13; // Starting Y position, adjusted from lastAutoTable's final Y
  const boxWidth8 = 190; // Width of the box
  
  // Calculate the height dynamically based on the content's line count
  const maxWidth5 = boxWidth8 - 10;
  const lines6 = doc.splitTextToSize(analisaRepaymentCapacity, maxWidth5);
  const boxHeight10 = lines6.length * 5 - 2; // Adjust this multiplier for line height and spacing
  
  // Draw the rectangle with dynamic height
  doc.rect(boxX, boxY, boxWidth8, boxHeight10);
  
  // Add the text inside the box with wrapping
  doc.text(lines6, boxX + 5, boxY + 8, {
    maxWidth5: boxWidth8 - 10, // Adjust text width inside box
    align: "left", // Align text to the left
  });

  // Add "3. Data Agunan" below the box
const dataAgunanY = boxY + boxHeight10 + 6; // Calculate Y position for "3. Data Agunan"
doc.text("3. Data Agunan", boxX, dataAgunanY);

// Define table headers
const headers8 = [
  "JENIS AGUNAN", 
  "NO. DOKUMEN", 
  "NAMA PEMILIK & HUB. DGN DEBITUR", 
  "Luas Tanah & Bangunan", 
  "NILAI PASAR", 
  "NILAI LIKUIDITAS", 
  "PETUGAS APPRAISAL", 
  "KET."
];

const tableDataAgunan = selectedData?.tableDataAgunan || []; // Data for the table

const data8 = tableDataAgunan.map((item, index) => [
  item.jenisAgunan || '',
  item.noDokumen || '0',
  item.namaPemilikDanHubDebitur || '',
  item.luasTanahBangunan || '0',
  item.nilaiPasar || '0',
  item.nilaiLikuiditas || '0',
  item.petugasAppraisal || '',
  item.KetAgunan || ''
]);

// Set the table position
const tableStartY5 = dataAgunanY + 5; // Start the table below the text
const tableWidth = boxWidth8; // Same width as the previous box

// Add the table headers8
doc.autoTable({
  startY: tableStartY5,
  head: [headers8],
  body: data8,
  margin: { top: 10, left: 10, right: 10, bottom: 10 },
  styles: {
    fontSize: 6,
    cellPadding: 1,
  },
  headStyles: {
    fillColor: [128, 128, 128], // Set header background color to gray
    textColor: [255, 255, 255], // Set header text color to white
    fontStyle: 'bold', // Bold text for headers
    halign: 'center', // Center-align text horizontally
    valign: 'middle', // Center-align text vertically
    fontSize: 6,
  },
  columnStyles: {
    0: { cellWidth: 12 },
    1: { cellWidth: 15 },
    2: { cellWidth: 35 },
    3: { cellWidth: 35 },
    4: { cellWidth: 25 },
    5: { cellWidth: 25 },
    6: { cellWidth: 20 },
    7: { cellWidth: 20 },
  },
});

// Add "Catatan Data Agunan:" below the table
const notesStartY = doc.lastAutoTable.finalY + 8; // Position text below the table
doc.setFontSize(8);
doc.setTextColor(0); // Black color
doc.text("Catatan Data Agunan:", 8, notesStartY);

// Add the notes from selectedData?.catatanDataAgunan
const catatanDataAgunan = selectedData?.catatanDataAgunan || [];
const formattedNotes = catatanDataAgunan.map(note => (note === "" ? "\n" : note)).join("\n");
const notesY = notesStartY + 5; // Position the notes below the label
doc.text(formattedNotes, 10, notesY);
  
const totalPages13 = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages13; i++) {
  doc.setPage(i); // Pindah ke halaman tertentu
  const previousTextColor = doc.getTextColor(); 
  doc.setFontSize(8); // Atur ukuran font
  doc.setTextColor(150); // Atur warna teks
  doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
  doc.setTextColor(previousTextColor);
}

if (doc.lastAutoTable.finalY > 10) {
  doc.addPage();
}

// Menambahkan logo
doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

// Menambahkan judul
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

// Garis horizontal di bawah judul
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

let analysisStartY7 = 40; // Jarak awal untuk elemen berikutnya

// Menambahkan teks "FOTO USAHA"
doc.setFontSize(8);
doc.text("FOTO AGUNAN", 10, analysisStartY7);

// Alamat Lokasi
const alamatPerusahaanUsaha2 = selectedData?.alamatPerusahaanUsaha || "Tidak ada informasi";
const maxWidthAlamat2 = 160;
const alamatLines2 = doc.splitTextToSize(alamatPerusahaanUsaha2, maxWidthAlamat2);

// Posisi alamat agar lebih rapi
const startYAlamat2 = analysisStartY7 + 8;
doc.text("Alamat Agunan :", 10, startYAlamat2);
doc.text(alamatLines2, 40, startYAlamat2, { maxWidth: maxWidthAlamat2 });

// Menentukan posisi berikutnya
const alamatHeight2 = alamatLines2.length * 5;
const nextStartY2 = startYAlamat2 + alamatHeight2 + 6; // Mengurangi jarak antar elemen

analysisStartY7 = nextStartY2;

// Menambahkan Foto Usaha
const startY9 = Math.max(analysisStartY7 - 4);
const photoAgunan = selectedData?.photoAgunan || [];

// Mengambil array foto dan menambahkannya
const photoWidth2 = 53;
const photoHeight2 = 40;
const gap2 = 10;
const photosPerRow2 = 3;
const totalPhotoRows2 = Math.ceil(photoAgunan.length / photosPerRow2);
const totalPhotoHeight2 = totalPhotoRows2 * photoHeight2 + (totalPhotoRows2 + 1) * gap2;

doc.setFontSize(8);

doc.setLineWidth(0.5);
doc.rect(10, startY9, (photoWidth2 + gap2) * photosPerRow2 - gap2 + 10, totalPhotoHeight2 + 10);

// Menambahkan foto ke dalam kotak dengan teks masing-masing di atasnya
for (let i = 0; i < photoAgunan.length; i++) {
  const row = Math.floor(i / photosPerRow2); // Baris saat ini
  const col = i % photosPerRow2; // Kolom saat ini

  const x = 15 + col * (photoWidth2 + gap2); // Posisi X untuk foto
  const y = startY9 + 5 + row * (photoHeight2 + gap2); // Posisi Y untuk foto

  // Ambil deskripsi dari photoAgunan
  const description = photoAgunan[i]?.description || "Deskripsi tidak tersedia";

  // Menambahkan teks deskripsi di atas gambar
  doc.text(description, x, y - 1);

  // Menambahkan gambar foto jika ada
  if (photoAgunan[i]?.url) {
    doc.addImage(
      photoAgunan[i].url, // URL gambar dari data Firebase
      "JPEG",
      x,
      y,
      photoWidth2,
      photoHeight
    );
  }
}

  const totalPages2 = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages2; i++) {
    doc.setPage(i); // Pindah ke halaman tertentu
    const previousTextColor = doc.getTextColor(); 
    doc.setFontSize(8); // Atur ukuran font
    doc.setTextColor(150); // Atur warna teks
    doc.text(`Halaman ${i}`, 190, 290, { align: "right" }); // Tambahkan teks
    doc.setTextColor(previousTextColor);
  }

if (doc.lastAutoTable.finalY > 10) {
  doc.addPage();
}

doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
doc.setFontSize(14);
doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
doc.setLineWidth(0.5);
doc.line(10, 30, 200, 30);

const textX = 10;
const textY = doc.lastAutoTable.finalY - 70;
doc.setFontSize(8);
doc.text("4. Legalitas Usaha / Pekerjaan", textX, textY);

const boxX2 = 10;
const boxY2 = textY + 3;
const boxWidth9 = 190;
const boxHeight11 = 10 + 5 * (selectedData?.legalitasUsaha?.length || 1);

// Menggambar box
doc.rect(boxX2, boxY2, boxWidth9, boxHeight11);

let yText = boxY2 + 8;
const lineHeight3 = 3; 
doc.setFontSize(8);

selectedData?.legalitasUsaha?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(text, boxWidth9 - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yText);
    yText += lineHeight3;
  });
});

// Adding section 5
const section5Y = yText + 10;  // Adjust position below the previous section
doc.setFontSize(8);
doc.text("5. Kesimpulan & Rekomendasi", textX, section5Y);

// Adding subheading 'a. Faktor Positif' inside the box and drawing the box around it
const gapBeforeBox = 2;
const subheadingY = section5Y + gapBeforeBox;
const boxY3 = subheadingY + 3;  // Box starts right after the subheading
const boxHeight12 = 3 + 5 * (selectedData?.faktorPositif?.length || 1); // Height adjusts based on content
doc.rect(boxX2, boxY3, boxWidth9, boxHeight12);

let yTextFaktorPositif = boxY3 + 8; // Starting position for the text inside the box

doc.text("a. Faktor Positif", boxX2 + 5, yTextFaktorPositif);
yTextFaktorPositif += lineHeight3;  // Adjusting y position after subheading

// Adding Faktor Positif values inside the box
selectedData?.faktorPositif?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(text, boxWidth9 - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yTextFaktorPositif);
    yTextFaktorPositif += lineHeight3;
  });
});

const section6Y = yTextFaktorPositif + 5;  // Menyesuaikan posisi di bawah bagian sebelumnya

const gapBeforeBox2 = 2;
const subheadingY2 = section6Y + gapBeforeBox2;
const boxY4 = subheadingY2 + 3;  // Box dimulai tepat setelah subjudul
const boxHeight13 = 5 + 5 * (selectedData?.faktorNegatifMitigasi?.length || 1); // Tinggi box disesuaikan berdasarkan konten
doc.rect(boxX2, boxY4, boxWidth9, boxHeight13);

let yTextFaktorNegatif = boxY4 + 6; // Posisi awal untuk teks di dalam box

doc.text("b. Faktor Negatif & Mitigasi", boxX2 + 5, yTextFaktorNegatif);
yTextFaktorNegatif += lineHeight3;  // Menyesuaikan posisi y setelah subjudul

selectedData?.faktorNegatifMitigasi?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(text, boxWidth9 - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yTextFaktorNegatif);
    yTextFaktorNegatif += lineHeight3;
  });
});

const section7Y = yTextFaktorNegatif + 4;
const gapBeforeBox3 = 2;
const subheadingY3 = section7Y + gapBeforeBox3;
const boxY5 = subheadingY3 + 0;
const boxHeight14 = 5 + 5 * (selectedData?.rekomendasi?.length || 1);
doc.rect(boxX2, boxY5, boxWidth9, boxHeight14);

let yTextRekomendasi = boxY5 + 5;

doc.text("c. Rekomendasi", boxX2 + 5, yTextRekomendasi);
yTextRekomendasi += lineHeight3;

selectedData?.rekomendasi?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(text, boxWidth9 - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yTextRekomendasi);
    yTextRekomendasi += lineHeight3;
  });
});

const gapBeforeBox4 = 2;
const section8Y = yTextRekomendasi + gapBeforeBox4; // Posisi Y setelah rekomendasi
const boxY6 = section8Y;
const boxHeight15 = Math.max(
  10 + 5 * (selectedData?.persyaratanSebelumAkad?.length || 1),
  10 + 5 * (selectedData?.persyaratanSaatAkad?.length || 1)
);

// Buat kotak besar
doc.rect(boxX2, boxY6, boxWidth9, boxHeight15);

// Bagi kotak menjadi dua kolom
const halfWidth = boxWidth9 / 2;
doc.line(boxX2 + halfWidth, boxY6, boxX2 + halfWidth, boxY6 + boxHeight15);

// Judul kolom
const headingYOffset = 5;
doc.text("Persyaratan Sebelum Akad", boxX2 + 5, boxY6 + headingYOffset);
doc.text("Persyaratan Saat Akad", boxX2 + halfWidth + 5, boxY6 + headingYOffset);

// Isi kolom
let yTextSebelumAkad = boxY6 + headingYOffset + 5;
selectedData?.persyaratanSebelumAkad?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(`${text}`, halfWidth - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yTextSebelumAkad);
    yTextSebelumAkad += lineHeight3;
  });
});

let yTextSaatAkad = boxY6 + headingYOffset + 5;
selectedData?.persyaratanSaatAkad?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(`${text}`, halfWidth - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + halfWidth + 5, yTextSaatAkad);
    yTextSaatAkad += lineHeight3;
  });
});

const gapBeforeBox5 = 2;
const section9Y = boxY6 + boxHeight15 + gapBeforeBox5; // Posisi setelah kotak persyaratan
const boxY7 = section9Y;
const boxHeight16 = 5 + 5 * (selectedData?.deviasi?.length || 1);

// Buat kotak deviasi
doc.rect(boxX2, boxY7, boxWidth9, boxHeight16);

let yTextDeviasi = boxY7 + 5;

// Judul deviasi
doc.text("Deviasi", boxX2 + 5, yTextDeviasi);
yTextDeviasi += lineHeight3;

// Isi deviasi
selectedData?.deviasi?.forEach(item => {
  const text = item === "" ? "/" : item;
  const wrappedText = doc.splitTextToSize(`• ${text}`, boxWidth9 - 10);
  wrappedText.forEach(line => {
    doc.text(line, boxX2 + 5, yTextDeviasi);
    yTextDeviasi += lineHeight3;
  });
});

const gapBeforeBox6 = 5;
const section10Y = boxY7 + boxHeight16 + gapBeforeBox6; // Posisi setelah deviasi
doc.text("6. Struktur Kredit", boxX2, section10Y);

const tableY = section10Y + 5;
const rowHeight2 = 10;
const columnWidth = boxWidth9 / 2;

// Data struktur kredit
const strukturKreditData = [
  { label: "Plafon", value: selectedData?.plafon || "Rp." },
  { label: "Bunga", value: `${selectedData?.sukuBunga || ""}` },
  { label: "Tenor", value: selectedData?.tenor || "" },
  { label: "Provisi", value: selectedData?.provisi || "Rp." },
  { label: "Admin", value: selectedData?.admin || "Rp." }
];

const strukturKreditDataRight = [
  { label: "Asuransi jiwa", value: selectedData?.asuransiJiwa || "Rp." },
  { label: "Asuransi Kebakaran", value: selectedData?.asuransiKebakaran || "Rp." },
  { label: "Biaya Notaris", value: selectedData?.biayaNotaris || "Rp." },
  { label: "Angsuran", value: selectedData?.angsuran || "" }
];

// Hitung tinggi tabel berdasarkan jumlah baris maksimum
const maxRows2 = Math.max(strukturKreditData.length, strukturKreditDataRight.length);
const tableHeight = rowHeight2 * maxRows2;

// Buat kotak tabel
doc.rect(boxX2, tableY, boxWidth9, tableHeight);

// Garis tengah vertikal
doc.line(boxX2 + columnWidth, tableY, boxX2 + columnWidth, tableY + tableHeight);

// Garis horizontal untuk baris
for (let i = 1; i < maxRows2; i++) {
  const y = tableY + i * rowHeight2;
  doc.line(boxX2, y, boxX2 + boxWidth9, y);
}

// Isi kolom kiri
strukturKreditData.forEach((item, index) => {
  const yPosition = tableY + index * rowHeight2 + 5;
  doc.text(item.label, boxX2 + 2, yPosition);
  doc.text(item.value, boxX2 + 2, yPosition + 5);
});

// Isi kolom kanan
strukturKreditDataRight.forEach((item, index) => {
  const yPosition = tableY + index * rowHeight2 + 5;
  doc.text(item.label, boxX2 + columnWidth + 2, yPosition);
  doc.text(item.value, boxX2 + columnWidth + 2, yPosition + 5);
});


  if (doc.lastAutoTable.finalY > 10) {
    doc.addPage();
  }
  
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);
  
  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });
  
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

// Atur posisi awal
const startX = 26;
const startYx = 80;
const colWidth = 54;
const rowHeight = 60;

// Tambahkan tabel
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.rect(startX, startYx, colWidth, rowHeight); // Kolom 1
doc.rect(startX + colWidth, startYx, colWidth, rowHeight); // Kolom 2
doc.rect(startX + colWidth * 2, startYx, colWidth, rowHeight); // Kolom 3

// Judul kolom
doc.text("Diajukan oleh\nAccount Officer", startX + 5, startYx + 10);
doc.text("Dibuat oleh\nCredit Analyst", startX + colWidth + 5, startYx + 10);
doc.text("Disetujui oleh\nDirektur Utama", startX + colWidth * 2 + 5, startYx + 10);

// Tambahkan Tanggal
const dateY = startYx + 20;
doc.text("Tanggal :", startX + 5, dateY);
doc.text("Tanggal :", startX + colWidth + 5, dateY);
doc.text("Tanggal :", startX + colWidth * 2 + 5, dateY);

// Tambahkan area tanda tangan (garis)
const lineY = startYx + rowHeight - 15; // Jarak lebih besar dari tanggal
doc.line(startX + 5, lineY, startX + colWidth - 5, lineY); // Garis tanda tangan kolom 1
doc.line(startX + colWidth + 5, lineY, startX + colWidth * 2 - 5, lineY); // Garis tanda tangan kolom 2
doc.line(startX + colWidth * 2 + 5, lineY, startX + colWidth * 3 - 5, lineY); // Garis tanda tangan kolom 3

// Tambahkan Nama di bawah tanda tangan
doc.setFont("helvetica", "bold");
doc.text("", startX + 5, startYx + rowHeight - 5);
doc.text("Saka Taruma Aji Prasetya", startX + colWidth + 5, startYx + rowHeight - 5);
doc.text("Lea Christine S", startX + colWidth * 2 + 5, startYx + rowHeight - 5);

// // Tambahkan tanda tangan digital jika tersedia
// if (selectedData?.signature) {
//   const cleanSignature = selectedData?.signature.replace(/^"|"$/g, ""); // Bersihkan tanda kutip
//   if (cleanSignature.startsWith("data:image/png;base64,")) {
//     const signatureWidth = 50;
//     const signatureHeight = 30;
//     const signatureX = startX + colWidth + (colWidth / 2) - (signatureWidth / 2);
//     const signatureY = lineY - 25;

//     doc.addImage(cleanSignature, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
//   } else {
//     console.error("Format tanda tangan tidak valid.");
//   }
// }

// Menyimpan PDF
doc.save("MAK_Form.pdf");
}
