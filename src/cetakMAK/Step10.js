import React, {useRef, useState, useEffect } from "react";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, List, message, Radio } from "antd";
import axios from "axios";

const Step10 = ({ formData, setFormData }) => {
  const [fileList, setFileList] = useState([]);
  const [useDigitalSignature, setUseDigitalSignature] = useState(false);
  const canvasRef = useRef(null);

  // Memuat data dari `formData.businessPhotos` saat komponen dirender
  useEffect(() => {
    const initialFileList = (formData.businessPhotos || []).map(
      (url, index) => ({
        uid: index.toString(),
        name: url.split("/").pop(), // Ambil nama file dari URL
        url,
      })
    );
    setFileList(initialFileList);
  }, [formData.businessPhotos]);

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    if (fileList.length >= 3) {
      // Cek apakah sudah ada 3 foto
      message.error("You can only upload up to 3 photos.");
      onError(new Error("Upload limit reached."));
      return;
    }

    const maxSize = 500 * 1024; // 500 KB dalam byte
    if (file.size > maxSize) {
      message.error(`${file.name} exceeds the maximum file size of 500 KB.`);
      onError(new Error("File size exceeds limit."));
      return;
    }

    setIsUploading(true); // Tampilkan loading
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success(`${file.name} uploaded successfully.`);
        console.log(response.data.data);
        // const fileUrl = `https://ik.imagekit.io/4jhgq1ri0/bprNasnus/${file.name}`;
        const fileUrl = response.data.data;
        // Perbarui formData.businessPhotos hanya dengan URL
        const updatedPhotos = [...(formData.businessPhotos || []), fileUrl];
        setFormData({ ...formData, businessPhotos: updatedPhotos });

        // Perbarui fileList untuk menampilkan nama file
        setFileList(
          updatedPhotos.map((url, index) => ({
            uid: index.toString(),
            name: url.split("/").pop(), // Ambil nama file dari URL
            url,
          }))
        );

        onSuccess({ data: fileUrl });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error(`${file.name} failed to upload.`);
      onError(error);
    } finally {
      setIsUploading(false); // Sembunyikan loading
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
    const offsetX = e.nativeEvent
      ? e.nativeEvent.offsetX
      : e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent
      ? e.nativeEvent.offsetY
      : e.touches[0].clientY - canvas.getBoundingClientRect().top;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    const ctx = canvas.getContext("2d");
    const offsetX = e.nativeEvent
      ? e.nativeEvent.offsetX
      : e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent
      ? e.nativeEvent.offsetY
      : e.touches[0].clientY - canvas.getBoundingClientRect().top;

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

  const handleRemove = (file) => {
    // Hapus URL dari businessPhotos di formData
    const updatedPhotos = formData.businessPhotos.filter(
      (photo) => photo !== file.url
    );
    setFormData({ ...formData, businessPhotos: updatedPhotos });

    // Perbarui fileList
    setFileList(
      updatedPhotos.map((url, index) => ({
        uid: index.toString(),
        name: url.split("/").pop(), // Ambil nama file dari URL
        url,
      }))
    );
  };

  return (
    <>
      <Upload
        customRequest={handleUpload}
        fileList={fileList}
        onRemove={handleRemove}
        multiple={false}
        maxCount={3}
        showUploadList={{ showRemoveIcon: true }}
        accept="image/*"
      >
        <Button
          icon={isUploading ? <LoadingOutlined /> : <UploadOutlined />}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </Upload>

      <Form.Item label="Tujuan Pengguna">
        <Input
          value={formData.userGoalInput}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, userGoalInput: e.target.value }))
          }
          placeholder="Masukkan tujuan pengguna"
        />
        <Button
          onClick={handleAddUserGoal}
          disabled={!formData.userGoalInput.trim()}
        >
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
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                touchAction: "none",
                borderRadius: 15,
              }}
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
    </>
  );
};

export default Step10;
