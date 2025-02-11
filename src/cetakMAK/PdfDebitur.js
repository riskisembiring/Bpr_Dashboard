import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleExportToPDF = (selectedData) => {
  const doc = new jsPDF();

  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  doc.setFontSize(10);
  doc.text("Data Debitur", 10, 38, { align: "left" });

  doc.setFontSize(8);
  const tableData = [
    ["Nama Debitur", ":", selectedData?.namaDebitur || "N/A", "Jenis Pengajuan Kredit", ":", selectedData?.jenisPengajuanKredit || "N/A"],
    ["Nomor MAK", ":", selectedData?.nomorMak || "N/A", "Nominal Pengajuan", ":", selectedData?.nominalPengajuan || "N/A"],
    ["Tanggal MAK", ":", selectedData?.tanggalMAK || "N/A", "Jenis Jaminan", ":", selectedData?.jenisJaminan || "N/A"],
    ["Nama Account Officer", ":", selectedData?.namaAccOfficer || "N/A", "Jenis Pekerjaan Debtur", ":", selectedData?.jenisPekerjaanDebt || "N/A"],
    ["Alamat Sesuai KTP", ":", selectedData?.alamatKTP || "N/A", "Jenis Pekerjaan Pasangan", ":", selectedData?.alamatDomisili || "N/A"],
    ["No.Telp Debitur", ":", selectedData?.noTelpDeb || "N/A", "Alamat Domisili", ":", selectedData?.alamatDomisili || "N/A"],
    ["No.Telp Pasangan Debitur", ":", selectedData?.noTelpPasDeb || "N/A", "Alamat Jaminan", ":", selectedData?.alamatJaminan || "N/A"],
    ["Alamat Sesuai KTP", ":", selectedData?.alamatSesuaiKtp || "N/A", "Nama Perusaahan/Usaha", ":", selectedData?.alamatPerusahaanUsaha || "N/A"],
    ["No. KTP", ":", selectedData?.noKtp || "N/A", "Jenis Usaha", ":", selectedData?.jenisUsaha || "N/A"],
    ["No. NPWP", ":", selectedData?.noNpwp || "N/A", "Bentuk Usaha", ":", selectedData?.bentukUsaha || "N/A"],
    ["Status Tempat Tinggal", ":", selectedData?.statusTempatTinggal || "N/A", "Lama Usaha", ":", selectedData?.lamaUsaha || "N/A"],
    ["Jenis Pekerjaan", ":", selectedData?.jenisPekerjaan || "N/A", "Status Tempat Usaha", ":", selectedData?.statusTempatUsaha || "N/A"],
    ["Jabatan", ":", selectedData?.jabatan || "N/A", "Tujuan Penggunaan Dana", ":", selectedData?.tujuanPenggunaanDana || "N/A"],
    ["Lama Bekerja", ":", selectedData?.lamaBekerja || "N/A", "Keterkaitan dengan BPR", ":", selectedData?.keterkaitandgnBpr || "N/A"],
    ["Status Karyawan", ":", selectedData?.statusKaryawan || "N/A", "Status Pembiayaan", ":", selectedData?.statusPembiayaan || "N/A"],
    ["Keterkaitan dengan BPR", ":", selectedData?.keterkaitandgnBpr || "N/A", "Tujuan Penggunaan Dana", ":", selectedData?.tujuanPenggunaanDana || "N/A"],
    ["Status Pembiayaan", ":", selectedData?.statusPembiayaan || "N/A", "Jenis Kredit", ":", selectedData?.jenisKredit || "N/A"],
  ];

  doc.autoTable({
    head: [],
    body: tableData,
    theme: "grid",
    startY: 43,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineHeight: 1,
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 5 },
      2: { cellWidth: 50 },
      3: { cellWidth: 50 },
      4: { cellWidth: 5 },
      5: { cellWidth: 30 },
    },
    margin: { top: 50 },
  });

  doc.text("RINGKASAN PENGAJUAN KREDIT", 10, doc.lastAutoTable.finalY + 8);

  const ringkasanData = [
    [selectedData?.plafon || "N/A", selectedData?.sukuBunga || "N/A", selectedData?.tenor || "N/A", selectedData?.biayaProvinsi || "N/A", selectedData?.biayaAdm || "N/A", selectedData?.nilaiPasar || "N/A", selectedData?.nilaiLikuiditas || "N/A", selectedData?.angsuranBulan || "N/A"]
  ];

  doc.autoTable({
    head: [['Plafon', 'Suku Bunga', 'Tenor', 'Biaya Provisi', 'Biaya Adm', 'Nilai Pasar', 'Nilai Likuiditas', 'Angsuran Perbulan']],
    body: ringkasanData,
    theme: 'grid',
    startY: doc.lastAutoTable.finalY + 13,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineHeight: 1,
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 20 },
    },
    margin: { top: 10 },
  });

  const recommendationStartY = doc.lastAutoTable.finalY + 8;
  const boxWidth = 180;
  const boxHeight = 20;


  doc.setFontSize(10);
  doc.text("Dasar Rekomendasi Account Officer:", 10, recommendationStartY);
  doc.setFontSize(8);
  doc.setLineWidth(0.5);
  doc.rect(10, recommendationStartY + 5, boxWidth, boxHeight);

  const recommendationText = selectedData?.dasarRekomendasiAccOff || "N/A";
  doc.text(recommendationText, 15, recommendationStartY + 12, { maxWidth: boxWidth - 10 });

  // Menambahkan ANALISA KREDIT
  const analysisStartY = recommendationStartY + 31;
  doc.setFontSize(8);
  doc.text("ANALISA KREDIT", 8, analysisStartY);

  const analysisStartY1 = recommendationStartY + 36;
  doc.setFontSize(8);
  doc.text("1. Tujuan Penggunaan", 8, analysisStartY1);

  const userGoals = selectedData?.userGoals || ["Tidak ada informasi"];
  const numberedGoals = userGoals.map((goal, index) => `${index + 1}. ${goal}`);
  const userGoalsText = numberedGoals.join("\n");
  const textDimensions = doc.getTextDimensions(userGoalsText);
  const boxHeightt = textDimensions.h + 10;
  const startY = analysisStartY + 12;
  doc.setLineWidth(0.5);
  doc.rect(10, startY - 5, boxWidth, boxHeightt);
  doc.text(userGoalsText, 15, startY, { maxWidth: boxWidth - 10 });

  const analysisStartY2 = recommendationStartY + 56;
  doc.setFontSize(8);
  doc.text("2. Profil Debitur & Hasil Cek Lingkungan", 8, analysisStartY2);
  const debtProfiles = selectedData?.debtProfiles || ["Tidak ada informasi"];
  const numberedGoalss = debtProfiles.map((goal, index) => `${index + 1}. ${goal}`);
  const debtProfilesText = numberedGoalss.join("\n");
  const textDimensionss = doc.getTextDimensions(debtProfilesText);
  const boxHeighttt = textDimensionss.h + 10;
  const startYy = analysisStartY + 32;
  doc.setLineWidth(0.5);
  doc.rect(10, startYy - 5, boxWidth, boxHeighttt);
  doc.text(debtProfilesText, 15, startYy, { maxWidth: boxWidth - 10 });

  if (doc.lastAutoTable.finalY > 190) {
    doc.addPage();
  }
  if (doc.lastAutoTable.finalY > 270) {
    doc.addPage();
  }
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  doc.setFontSize(8);
  doc.text("3. Analisa Usaha / Pekerjaan", 10, 38, { align: "left" });

  const boxStartY = 43;
  const boxHeightttt = 60;
  doc.rect(10, boxStartY, 190, boxHeightttt);

  let currentY = boxStartY + 7;
  doc.text("1. Latar Belakang & Aktivitas Usaha:", 15, currentY);
  doc.text(selectedData?.businessBackground || "N/A", 80, currentY);
  currentY += 7;
  doc.text("2. Supplier:", 15, currentY);
  doc.text(selectedData?.supplier || "N/A", 80, currentY);
  currentY += 7;
  doc.text("3. Pemasaran/Distribusi:", 15, currentY);
  doc.text(selectedData?.marketing || "N/A", 80, currentY);
  currentY += 7;
  doc.text("4. Kontrak Kerja yang dimiliki:", 15, currentY);
  doc.text(selectedData?.contracts || "N/A", 80, currentY);
  currentY += 7;
  doc.text("5. Rencana Pengembangan Usaha:", 15, currentY);
  doc.text(selectedData?.developmentPlan || "N/A", 80, currentY);
  currentY += 7;
  // Menambahkan bagian foto usaha
  doc.text("6. Foto Usaha:", 15, currentY);

  // Cek apakah ada URL gambar yang diberikan
  const imageUrl = selectedData?.businessPhotos || null;
  if (imageUrl) {
    // Menambahkan gambar ke dokumen pada koordinat (80, currentY + 7) dengan lebar dan tinggi yang ditentukan
    doc.addImage(imageUrl, 'JPEG', 80, currentY - 4, 30, 20); // Gambar ditempatkan di bawah teks "Foto Usaha"
  } else {
    // Jika tidak ada gambar, tampilkan teks alternatif
    doc.text("N/A", 80, currentY + 7);
  }

  doc.setFontSize(8);
  doc.text("4. Aspek Keuangan & Sumber Pengembalian Kredit", 10, 111, { align: "left" });

  doc.setFontSize(8);
  doc.text("1. Rekapitulasi SLIK", 15, 116, { align: "left" });

  // Rekapitulasi data harus berbentuk objek dengan properti array
const rekapitulasiSlikData = {
  namaRekap: selectedData?.namaRekap || ["N/A"],
  jabatanRekap: selectedData?.jabatanRekap || ["N/A"],
  jenisFasilitasRekap: selectedData?.jenisFasilitasRekap || ["N/A"],
  namaBankRekap: selectedData?.namaBankRekap || ["N/A"],
  tglMulaiRekap: selectedData?.tglMulaiRekap || ["N/A"],
  tglTempoRekap: selectedData?.tglTempoRekap || ["N/A"],
  tenorRekap: selectedData?.tenorRekap || ["N/A"],
  plafonRekap: selectedData?.plafonRekap || ["N/A"],
  osRekap: selectedData?.osRekap || ["N/A"],
  rateRekap: selectedData?.rateRekap || ["N/A"],
  angsuranRekap: selectedData?.angsuranRekap || ["N/A"],
  collRekap: selectedData?.collRekap || ["N/A"],
  agunanRekap: selectedData?.agunanRekap || ["N/A"],
  ketRekap: selectedData?.ketRekap || ["N/A"],
};

function formatNoColumn(data) {
  const formatted = [];

  for (let i = 0; i < data.namaRekap.length; i++) {
    const row = [
      i + 1, 
      data.namaRekap[i] || "N/A",
      data.jabatanRekap[i] || "N/A", 
      data.jenisFasilitasRekap[i] || "N/A",
      data.namaBankRekap[i] || "N/A",
      data.tglMulaiRekap[i] || "N/A", 
      data.tglTempoRekap[i] || "N/A",
      data.tenorRekap[i] || "N/A",
      data.plafonRekap[i] || "N/A", 
      data.osRekap[i] || "N/A",
      data.rateRekap[i] || "N/A",
      data.angsuranRekap[i] || "N/A",
      data.collRekap[i] || "N/A",
      data.agunanRekap[i] || "N/A",
      data.ketRekap[i] || "N/A",
    ];
    formatted.push(row);
  }

  return formatted;
}

// Format data menjadi array untuk AutoTable
const formattedData = formatNoColumn(rekapitulasiSlikData);

// Buat tabel PDF menggunakan AutoTable
doc.autoTable({
  head: [['No', 'Nama', 'Jabatan / Hub. dgn Debitur', 'Jenis Fasilitas', 'Nama Bank / LJK', 'Tgl. Mulai', 'Tgl. Jt. Tempo', 'Tenor', 'Plafon', 'O/S', 'Rate', 'Angsuran', 'Coll', 'Agunan', 'Ket']],
  body: formattedData,
  theme: 'grid',
  startY: doc.lastAutoTable.finalY - 78,
  styles: {
    fontSize: 6,
    cellPadding: 1,
  },
  columnStyles: {
    0: { cellWidth: 6 }, // Kolom No
    1: { cellWidth: 15 }, // Kolom Nama
    2: { cellWidth: 12 }, // Kolom Jabatan
    3: { cellWidth: 12 }, // Kolom Jenis Fasilitas
    4: { cellWidth: 12 }, // Kolom Nama Bank
    5: { cellWidth: 12 }, // Kolom Tgl. Mulai
    6: { cellWidth: 12 }, // Kolom Tgl. Jt. Tempo
    7: { cellWidth: 12 }, // Kolom Tenor
    8: { cellWidth: 12 }, // Kolom Plafon
    9: { cellWidth: 12 }, // Kolom O/S
    10: { cellWidth: 12 }, // Kolom Rate
    11: { cellWidth: 15 }, // Kolom Angsuran
    12: { cellWidth: 12 }, // Kolom Coll
    13: { cellWidth: 15 }, // Kolom Agunan
    14: { cellWidth: 15 }, // Kolom Ket
  },
  margin: { top: 10 }, // Margin atas
});

doc.text("Total:", 20, doc.lastAutoTable.finalY + 5);
const totalValue = selectedData?.totalRekap || "N/A"; 
doc.text(totalValue.toString(), 130, doc.lastAutoTable.finalY + 5);  

const recommendationStartY3 = doc.lastAutoTable.finalY + 3;
const boxWidth1 = 180; // Tetapkan lebar tetap untuk kotak

// Cek apakah `dasarRekomendasiAccOff` adalah array atau string
const recommendationTextArray = Array.isArray(selectedData?.catatanSlik)
    ? selectedData.catatanSlik
    : [selectedData?.catatanSlik || "N/A"];

// Format array menjadi daftar bernomor
const numberedRecommendations = recommendationTextArray.map(
    (item, index) => `${index + 1}. ${item}`
);
const recommendationText1 = numberedRecommendations.join("\n");

// Hitung dimensi teks
const textDimensions1 = doc.getTextDimensions(recommendationText1);

// Hitung tinggi kotak secara dinamis berdasarkan tinggi teks
const boxHeight1 = textDimensions1.h + 14; // Tambahkan padding untuk estetika

// Tambahkan kotak dengan ukuran dinamis
doc.setFontSize(8);
doc.setLineWidth(0.5);
doc.rect(10, recommendationStartY3 + 5, boxWidth1, boxHeight1);

// Tambahkan teks ke dalam kotak
doc.text(
    "Catatan Hasil SLIK:\n" + recommendationText1,
    15,
    recommendationStartY3 + 10,
    { maxWidth: boxWidth1 - 10 }
);

  doc.setFontSize(8);
  doc.text("2. Analisa Rekening Koran", 15, 178, { align: "left" });

  const boxStart1 = 180;
  const boxHeigh1 = 20;
  doc.rect(10, boxStart1, 190, boxHeigh1);

  let current1 = boxStart1 + 7;
  doc.text("a. Laporan Neraca Keuangan :", 15, current1);
  doc.text(selectedData?.laporanNeraca || "N/A", 65, current1);
  current1 += 7;
  doc.text("b. Laporan Laba Rugi :", 15, current1);
  doc.text(selectedData?.laporanLabarugi	 || "N/A", 65, current1);
  current1 += 7;

  doc.setFontSize(8);
  doc.text("3. Analisa Repayment Capacity", 15, 204, { align: "left" });

  const boxStart2 = 208;
  const boxHeigh2 = 11;
  doc.rect(10, boxStart2, 190, boxHeigh2);

  let current2 = boxStart2 + 7;
  doc.text("a. Laporan Neraca Keuangan :", 15, current2);
  doc.text(selectedData?.analisaRepaymentCapacity	 || "N/A", 65, current2);

  doc.setFontSize(8);
  doc.text("4. Perhitungan IDIR & DSR", 15, 225, { align: "left" });

  const boxStart3 = 229;
  const boxHeigh3 = 20;
  doc.rect(10, boxStart3, 190, boxHeigh3);

  let current3 = boxStart3 + 7;
  doc.text("a. IDIR :", 15, current3);
  doc.text(selectedData?.idr || "N/A", 65, current3);
  current3 += 7;
  doc.text("b. DSR :", 15, current3);
  doc.text(selectedData?.dsr || "N/A", 65, current3);
  current3 += 7;

  if (current3 > 240) {
  doc.addPage();
  }

  if (current3 > 270) {
    doc.addPage(); 
  }
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  doc.setFontSize(8);
  doc.text("5. Data Agunan", 10, 38, { align: "left" });

  const anggunanData = [
    [selectedData?.plafon || "N/A", selectedData?.sukuBunga || "N/A", selectedData?.tenor || "N/A", selectedData?.biayaProvinsi || "N/A", selectedData?.biayaAdm || "N/A", selectedData?.nilaiPasar || "N/A", selectedData?.nilaiLikuiditas || "N/A", selectedData?.angsuranBulan || "N/A"]
  ];

  doc.autoTable({
    head: [['JENIS AGUNAN', 'NO DOKUMEN', 'NAMA PEMILIK & HUB. DGN DEBITUR', 'NILAI PASAR', 'NILAI LIKUIDITAS', 'PETUGAS APPRAISAL', 'KET.']],
    body: anggunanData,
    theme: 'grid',
    startY: doc.lastAutoTable.finalY - 108,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineHeight: 1,
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 30 },
      6: { cellWidth: 20 },
    },
    margin: { top: 10 },
  });

  doc.setFontSize(8);
  doc.text("Catatan Data Agunan & Foto:", 20, doc.lastAutoTable.finalY + 6);
  
  let current4 = doc.lastAutoTable.finalY + 12;
  doc.setFontSize(8);
  
  doc.text("- ", 20, current4);
  doc.text(selectedData?.catatanAgunan?.[0] || "N/A", 25, current4);
  
  const imageAgunan = selectedData?.imageAgunan;
  if (imageAgunan && imageAgunan.length > 0) {
    imageAgunan.forEach((image, index) => {
      doc.addImage(image, "JPEG", 100, current4 - 5 + (index * 25), 10, 10); 
    });
  }
  
  current4 += 7;
  
  doc.text("- ", 20, current4);
  doc.text(selectedData?.catatanAgunan?.[1] || "N/A", 25, current4);
  
  const photo2 = selectedData?.imageAgunan?.[1];
  if (photo2) {
    doc.addImage(photo2, "JPEG", 100, current4 - 5, 10, 10);
  }
  current4 += 7;
  
  doc.text("- ", 20, current4);
  doc.text(selectedData?.catatanAgunan?.[2] || "N/A", 25, current4);
  
  const photo3 = selectedData?.imageAgunan?.[2];
  if (photo3) {
    doc.addImage(photo3, "JPEG", 100, current4 - 5, 10, 10);
  }
  current4 += 7;

  doc.setFontSize(8);

  // Judul dan kotak Legalitas Usaha/Pekerjaan
  doc.text("6. Legalitas Usaha / Pekerjaan", 10, 100, { align: "left" });

  const boxStart4 = 103;
  const boxHeight4 = 10;
  doc.rect(10, boxStart4, 190, boxHeight4);

  let current5 = boxStart4 + 6; // Posisi awal untuk teks dalam kotak
  doc.text(selectedData?.legalitasUsahaPekerjaan || "N/A", 15, current5);

  // Judul dan kotak Kesimpulan & Rekomendasi
  doc.setFontSize(8);
  doc.text("7. Kesimpulan & Rekomendasi", 10, 118, { align: "left" });

  const boxStart5 = 122;
  const boxHeight5 = 50;
  doc.rect(10, boxStart5, 190, boxHeight5);

  // Menyusun konten dalam kotak
  const lineSpacing = 6; // Jarak antar baris teks
  current5 = boxStart5 + 10; // Memulai dari dalam kotak Kesimpulan & Rekomendasi

  const leftColumnWidth = 80;

  // Faktor Positif
  doc.text("a. Faktor Positif", 15, current5);
  doc.text(selectedData?.faktorPositif || "N/A", 5 + leftColumnWidth, current5);

  // Faktor Negatif & Mitigasi
  current5 += lineSpacing;
  doc.text("b. Faktor Negatif & Mitigasi", 15, current5);
  doc.text(selectedData?.faktorNegatifMitigasi || "N/A", 5 + leftColumnWidth, current5);

  // Rekomendasi
  current5 += lineSpacing;
  doc.text("c. Rekomendasi", 15, current5);
  doc.text(selectedData?.rekomendasi || "N/A", 5 + leftColumnWidth, current5);

  // Persyaratan Sebelum dan Saat Akad
  current5 += lineSpacing;
  doc.text("Persyaratan Sebelum Akad", 15, current5);
  doc.text("Persyaratan Saat Akad", 15 + leftColumnWidth, current5);

  current5 += lineSpacing;
  doc.text(selectedData?.persyaratanSebelumAkad || "N/A", 15, current5);
  doc.text(selectedData?.persyaratanSaatAkad || "N/A", 15 + leftColumnWidth, current5);

  // Deviasi
  current5 += lineSpacing;
  doc.text("Deviasi", 15, current5);
  doc.text(selectedData?.deviasi || "N/A", 5 + leftColumnWidth, current5);

  doc.setFontSize(8);
  doc.text("8. Struktur Kredit", 10, 177, { align: "left" });

  const strukturKreditData = [
    ["Plafon", selectedData?.plafonKredit	 || "N/A"],
    ["Bunga", selectedData?.bungaKredit	 || "N/A"],
    ["Tenor", selectedData?.tenorKredit || "N/A"],
    ["Provisi", selectedData?.provisiKredit || "N/A"],
    ["Admin", selectedData?.adminKredit	 || "N/A"],
    ["Asuransi Jiwa", selectedData?.asuransiJiwaKredit || "N/A"],
    ["Asuransi Kebakaran", selectedData?.asuransiKebakaranKredit || "N/A"],
    ["Biaya Notaris", selectedData?.biayaNotarisKredit || "N/A"],
    ["Angsuran", selectedData?.angsuranKredit	 || "N/A"]
  ];

  doc.autoTable({
    body: strukturKreditData,
    theme: 'grid',
    startY: 181, 
    styles: {
      fontSize: 8,
      cellPadding: 4,
      lineHeight: 3,
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 150 },
    },
    margin: { top: 50 },
    bodyStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
  });

  if (current5 + 15 + doc.lastAutoTable.finalY > 270) {
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

// Tambahkan tanda tangan digital jika tersedia
if (selectedData?.signature) {
  const cleanSignature = selectedData?.signature.replace(/^"|"$/g, ""); // Bersihkan tanda kutip
  if (cleanSignature.startsWith("data:image/png;base64,")) {
    const signatureWidth = 50;
    const signatureHeight = 30;
    const signatureX = startX + colWidth + (colWidth / 2) - (signatureWidth / 2);
    const signatureY = lineY - 25;

    doc.addImage(cleanSignature, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
  } else {
    console.error("Format tanda tangan tidak valid.");
  }
}

// Menyimpan PDF
doc.save("MAK_Form.pdf");
}
