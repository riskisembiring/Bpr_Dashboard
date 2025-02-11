import React, { useRef, useState } from "react";
import { Form, Input, Button, List, message, Radio } from "antd";
import axios from "axios";

const Step7 = ({ formData, setFormData }) => {
  const [useDigitalSignature, setUseDigitalSignature] = useState(false);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    // Validasi ukuran file (max 500 KB)
    if (selectedFile.size > 500 * 1024) {
      alert("Ukuran file tidak boleh lebih dari 500 KB.");
      return;
    }

    // Validasi tipe file
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Hanya file berformat JPEG, JPG, atau PNG yang diperbolehkan.");
      return;
    }

    const fileURL = URL.createObjectURL(selectedFile);
    setFormData((prev) => ({
      ...prev,
      businessPhotos: fileURL,
      selectedFile, // Menyimpan file yang dipilih untuk upload
    }));
  };

  const handleFileUpload = async () => {
    if (!formData.selectedFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", formData.selectedFile);

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("File berhasil diunggah!");
      } else {
        message.error("Terjadi kesalahan saat mengunggah file.");
      }
    } catch (error) {
      console.error("Error saat mengunggah file:", error);
      message.error("Terjadi kesalahan saat mengunggah file.");
    }
  };

  const handleAddUserGoal = () => {
    if (formData.userGoals.length >= 3) {
      message.warning(
        "Anda sudah menambahkan 3 tujuan pengguna, tidak dapat menambah lagi."
      );
      return;
    }
    if (formData.userGoalInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        userGoals: [...prev.userGoals, formData.userGoalInput],
        userGoalInput: "",
      }));
    }
  };

  const handleRemoveUserGoal = (index) => {
    setFormData((prev) => ({
      ...prev,
      userGoals: prev.userGoals.filter((_, i) => i !== index),
    }));
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const offsetX = e.nativeEvent ? e.nativeEvent.offsetX : e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent ? e.nativeEvent.offsetY : e.touches[0].clientY - canvas.getBoundingClientRect().top;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    const ctx = canvas.getContext("2d");
    const offsetX = e.nativeEvent ? e.nativeEvent.offsetX : e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent ? e.nativeEvent.offsetY : e.touches[0].clientY - canvas.getBoundingClientRect().top;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    canvas.isDrawing = false;

    // Simpan tanda tangan sebagai data URL
    const signatureDataURL = canvas.toDataURL("image/png");
    setFormData((prev) => ({
      ...prev,
      signature: signatureDataURL,
    }));
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFormData((prev) => ({
      ...prev,
      signature: null,
    }));
  };

  return (
    <div>
      <Form.Item label="Upload Foto Usaha" rules={[{ required: true }]}>
        <Input type="file" onChange={handleFileChange} />
        <Button
          onClick={handleFileUpload}
          disabled={!formData.selectedFile}
          style={{ marginTop: "10px" }}
        >
          Unggah Foto
        </Button>
      </Form.Item>
      {formData.businessPhotos && (
        <div>
          <h3 style={{ fontWeight: "normal" }}>Foto yang di-upload:</h3>
          <img
            src={formData.businessPhotos}
            alt="Uploaded"
            style={{ maxWidth: "150px" }}
          />
        </div>
      )}

      <Form.Item label="Tujuan Pengguna">
        <Input
          value={formData.userGoalInput}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, userGoalInput: e.target.value }))
          }
          placeholder="Masukkan tujuan pengguna"
        />
        <Button onClick={handleAddUserGoal} disabled={!formData.userGoalInput.trim()}>
          Tambahkan Tujuan
        </Button>
      </Form.Item>

      <List
        bordered
        dataSource={formData.userGoals}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button danger onClick={() => handleRemoveUserGoal(index)}>
                Hapus
              </Button>,
            ]}
          >
            {item}
          </List.Item>
        )}
      />

<div>
      <Form.Item label="Apakah ingin menggunakan Tanda Tangan Digital?">
        <Radio.Group
          value={useDigitalSignature}
          onChange={(e) => setUseDigitalSignature(e.target.value)}
        >
          <Radio value={true}>Iya</Radio>
          <Radio value={false}>Tidak</Radio>
        </Radio.Group>
      </Form.Item>

      {useDigitalSignature && (
        <Form.Item label="Tanda Tangan Digital">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            style={{ border: "1px solid #ccc", marginBottom: "10px", touchAction: "none", borderRadius: 15 }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              e.preventDefault();
              startDrawing(e);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              draw(e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              stopDrawing();
            }}
          />
          <Button onClick={clearSignature} style={{ marginTop: "10px" }}>
            Bersihkan Tanda Tangan
          </Button>
        </Form.Item>
      )}
    </div>
    </div>
  );
};

export default Step7;
