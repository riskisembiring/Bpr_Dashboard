import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleExportToPDF = (selectedData) => {
  const doc = new jsPDF();

  // Halaman 1: Menambahkan konten pertama
  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  // Header
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
    ["No. KTP", ":", selectedData?.noKTP || "N/A", "Jenis Usaha", ":", selectedData?.jenisUsaha || "N/A"],
    ["No. NPWP", ":", selectedData?.noNPWP || "N/A", "Bentuk Usaha", ":", selectedData?.bentukUsaha || "N/A"],
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

  doc.text("RINGKASAN PENGAJUAN KREDIT", 10, doc.lastAutoTable.finalY + 10);

  const ringkasanData = [
    [selectedData?.plafon || "N/A", selectedData?.sukuBunga || "N/A", selectedData?.tenor || "N/A", selectedData?.biayaProvinsi || "N/A", selectedData?.biayaAdm || "N/A", selectedData?.nilaiPasar || "N/A", selectedData?.nilaiLikuiditas || "N/A", selectedData?.angsuranBulan || "N/A"]
  ];

  doc.autoTable({
    head: [['Plafon', 'Suku Bunga', 'Tenor', 'Biaya Provisi', 'Biaya Adm', 'Nilai Pasar', 'Nilai Likuiditas', 'Angsuran Perbulan']],
    body: ringkasanData,
    theme: 'grid',
    startY: doc.lastAutoTable.finalY + 15,
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

  // Menambahkan Dasar Rekomendasi Account Officer
  const recommendationStartY = doc.lastAutoTable.finalY + 10; // Menambahkan jarak setelah tabel ringkasan
  const boxWidth = 180;
  const boxHeight = 10;

  doc.setFontSize(10);
  doc.text("Dasar Rekomendasi Account Officer:", 10, recommendationStartY);
  doc.setLineWidth(0.5);
  doc.rect(10, recommendationStartY + 5, boxWidth, boxHeight);

  const recommendationText = selectedData?.dasarRekomendasiAccOff || "N/A";
  doc.text(recommendationText, 15, recommendationStartY + 12, { maxWidth: boxWidth - 10 });

  // Menambahkan ANALISA KREDIT
  const analysisStartY = recommendationStartY + 25; // Menambahkan jarak dari dasar rekomendasi
  doc.setFontSize(10);
  doc.text("ANALISA KREDIT", 10, analysisStartY);

  const userGoals = selectedData?.userGoals || ["Tidak ada informasi"];

  // Menambahkan nomor list ke setiap item dalam array
  const numberedGoals = userGoals.map((goal, index) => `${index + 1}. ${goal}`);
  
  // Menggabungkan array dengan baris baru
  const userGoalsText = numberedGoals.join("\n");
  
  // Menghitung dimensi teks
  const textDimensions = doc.getTextDimensions(userGoalsText);
  const boxHeightt = textDimensions.h + 10; // Menambahkan padding agar kotak sedikit lebih tinggi dari teks
  
  // Menentukan posisi Y untuk kotak dan teks
  const startY = analysisStartY + 12; // Menyesuaikan Y sesuai dengan posisi analisa kredit
  
  // Membuat kotak untuk ANALISA KREDIT dengan tinggi dinamis
  doc.setLineWidth(0.5);
  doc.rect(10, startY - 5, boxWidth, boxHeightt); // Menggunakan boxHeight yang dinamis
  
  // Menuliskan isi dalam kotak
  doc.text(userGoalsText, 15, startY, { maxWidth: boxWidth - 10 });

  //

  // const debtProfiles = selectedData?.debtProfiles || ["Tidak ada informasi"];

  // // Menambahkan nomor list ke setiap item dalam array
  // const numberedGoalss = debtProfiles.map((goal, index) => `${index + 1}. ${goal}`);
  
  // // Menggabungkan array dengan baris baru
  // const debtProfilesText = numberedGoalss.join("\n");
  
  // // Menghitung dimensi teks
  // const textDimensionss = doc.getTextDimensions(debtProfilesText);
  // const boxHeighttt = textDimensionss.h + 10; // Menambahkan padding agar kotak sedikit lebih tinggi dari teks
  
  // // Menentukan posisi Y untuk kotak dan teks
  // const startYy = analysisStartY + 12; // Menyesuaikan Y sesuai dengan posisi analisa kredit
  
  // // Membuat kotak untuk ANALISA KREDIT dengan tinggi dinamis
  // doc.setLineWidth(0.5);
  // doc.rect(10, startYy - 5, boxWidth, boxHeighttt); // Menggunakan boxHeight yang dinamis
  
  // // Menuliskan isi dalam kotak
  // doc.text(debtProfilesText, 15, startYy, { maxWidth: boxWidth - 10 });
  
  // Memeriksa apakah konten melebihi satu halaman
  if (doc.lastAutoTable.finalY > 190) {
    doc.addPage();  // Menambahkan halaman baru jika konten melebihi batas
  }

  // Halaman 2: Menambahkan konten ke halaman kedua jika diperlukan
  if (doc.lastAutoTable.finalY > 270) {
    doc.addPage();  // Menambahkan halaman baru jika konten melebihi batas
  }

  doc.addImage("/images/logo1.png", "PNG", 10, 10, 60, 20);

  doc.setFontSize(14);
  doc.text("MEMORANDUM ANALISA KREDIT", 200, 25, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  const newTableData = [
    ["Column 1", "Column 2", "Column 3"],
    ["Data 1", "Data 2", "Data 3"],
    ["Data 4", "Data 5", "Data 6"]
  ];

  doc.autoTable({
    head: [['Column 1', 'Column 2', 'Column 3']],
    body: newTableData,
    theme: 'grid',
    startY: 45,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      lineHeight: 1,
    },
    margin: { top: 15 },
  });

  // Menyimpan PDF
  doc.save("MAK_Form.pdf");
};
