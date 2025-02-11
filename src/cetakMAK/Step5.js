import React, { useState } from "react";
import { Form, Input, Button, List } from "antd";
import axios from 'axios';

const Step5 = ({ form }) => {
  const [catatanAgunan, setcatatanAgunan] = useState([]);
  const [catatanAgunanInput, setcatatanAgunanInput] = useState("");

    const [files, setFiles] = useState([]);
    const [imageAgunan, setimageAgunan] = useState([]);
    const [uploading, setUploading] = useState(false); 
    const [loadingImages, setLoadingImages] = useState([]);

  const handleAddcatatanAgunan = () => {
    if (catatanAgunanInput.trim()) {
      const newcatatanAgunan = [...catatanAgunan, catatanAgunanInput];
      setcatatanAgunan(newcatatanAgunan);

      form.setFieldsValue({
        catatanAgunan: newcatatanAgunan,
      });

      setcatatanAgunanInput("");
    }
  };

  const handleRemovecatatanAgunan = (index) => {
    const newcatatanAgunan = catatanAgunan.filter((_, i) => i !== index);
    setcatatanAgunan(newcatatanAgunan);

    form.setFieldsValue({
      catatanAgunan: newcatatanAgunan,
    });
  };

  const handlecatatanAgunanChange = (e) => {
    setcatatanAgunanInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      alert('Pilih file terlebih dahulu!');
      return;
    }

    if (files.length >= 3) {
      alert('Maksimal hanya bisa upload 3 gambar.');
      return;
    }

    if (selectedFile.size > 500 * 1024) {
      alert('Ukuran file tidak boleh lebih dari 500 KB.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Hanya file berformat JPEG, JPG, atau PNG yang diperbolehkan.');
      return;
    }

    setFiles((prevFiles) => [...prevFiles, selectedFile]);
    setLoadingImages((prevLoading) => [...prevLoading, false]); // Tambahkan placeholder loading
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Pilih file terlebih dahulu!');
      return;
    }
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setLoadingImages((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[i] = true;
          return updatedLoading;
        });
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        uploadedUrls.push(response.data.data);
        setLoadingImages((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[i] = false;
          return updatedLoading;
        });
      }
      const updatedimageAgunan = [...uploadedUrls];
      setimageAgunan(updatedimageAgunan);
      form.setFieldsValue({ imageAgunan: updatedimageAgunan });
      alert('Upload berhasil!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat meng-upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    const updatedLoading = [...loadingImages];
    updatedLoading.splice(index, 1);
    setFiles(updatedFiles);
    setLoadingImages(updatedLoading);
  };

  return (
    <div>
      <h3>2. Analisa Rekening Koran</h3>
      <Form.Item label="Laporan Neraca Keuangan" name="laporanNeraca">
        <Input placeholder="Masukkan Laporan Neraca Keuangan" />
      </Form.Item>
      <Form.Item label="Laporan Laba Rugi" name="laporanLabarugi">
        <Input placeholder="Masukkan Laporan Laba Rugi" />
      </Form.Item>
      <h3>3. Analisa Repayment Capacity</h3>
      <Form.Item
        label="Analisa Repayment Capacity"
        name="analisaRepaymentCapacity"
      >
        <Input placeholder="Masukkan Analisa Repayment Capacity" />
      </Form.Item>
      <h3>4. Perhitungan IDIR & DSR</h3>
      <Form.Item label="IDIR" name="idr">
        <Input placeholder="Masukkan IDIR" />
      </Form.Item>
      <Form.Item label="DSR" name="dsr">
        <Input placeholder="Masukkan DSR" />
      </Form.Item>

      <h1>Data Agunan</h1>
      <Form.Item label="Jenis Agunan" name="jenisAgunan">
        <Input placeholder="Masukkan Jenis Agunan" />
      </Form.Item>
      <Form.Item label="No. Dokumen" name="noDokumen">
        <Input placeholder="Masukkan No. Dokumen" />
      </Form.Item>
      <Form.Item
        label="Nama Pemilik & Hub. dengan Debitur"
        name="namapemilikHubDeb"
      >
        <Input placeholder="Masukkan Nama Pemilik & Hub. dengan Debitur" />
      </Form.Item>
      <Form.Item label="Nilai Pasar" name="nilaiPasar">
        <Input placeholder="Masukkan Nilai Pasar" />
      </Form.Item>
      <Form.Item label="Nilai Likuiditas" name="nilaiLikuiditas">
        <Input placeholder="Masukkan Nilai Likuiditas" />
      </Form.Item>
      <Form.Item label="Petugas Appraisal" name="petugasAppraisal">
        <Input placeholder="Masukkan Petugas Appraisal" />
      </Form.Item>
      <Form.Item label="Keterangan" name="ket">
        <Input placeholder="Masukkan Keterangan" />
      </Form.Item>
      <Form.Item label="Catatan Data Agunan">
        <Input
          value={catatanAgunanInput}
          onChange={handlecatatanAgunanChange}
          placeholder="Masukkan Catatan Data Agunan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddcatatanAgunan}
        style={{ marginBottom: "16px" }}
        disabled={catatanAgunan.length >= 3}
      >
        Tambah Catatan Data Agunan
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Catatan Data Agunan (Max 3)"
        bordered
        dataSource={catatanAgunan}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovecatatanAgunan(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item name="catatanAgunan" hidden>
        <Input type="hidden" />
      </Form.Item>
      <div>
        <Form.Item label="Upload Foto Agunan" name="imageAgunan">
          <Input type="file" onChange={handleFileChange} />
          <Button
            onClick={handleUpload}
            disabled={files.length === 0}
            loading={uploading}
          >
            Upload Foto
          </Button>
        </Form.Item>
        <div>
          <h3 style={{fontWeight: 'normal'}}>Foto yang dipilih:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name}{" "}
                <Button
                  type="link"
                  danger
                  onClick={() => handleRemoveFile(index)}
                  disabled={uploading}
                >
                  Hapus
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{fontWeight: 'normal'}}>Foto yang di-upload:</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {imageAgunan.map((url, index) => (
              <div
                key={index}
                style={{
                  width: "150px",
                  height: "150px",
                  overflow: "hidden",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Form.Item label="Legalitas Usaha / Pekerjaan" name="legalitasUsahaPekerjaan">
        <Input placeholder="Masukkan Legalitas Usaha / Pekerjaan" />
      </Form.Item>
      <br></br>
    </div>
  );
};

export default Step5;
