import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Typography, message } from 'antd';
import axios from "axios";
// import FormData from 'form-data';

const { Title } = Typography;

const CameraCapture = forwardRef(({ handleFileChange, handleBase64, onUploadStatusChange }, ref) => {
  const [fileName, setFileName] = useState('CapturedImage.png');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error('Error accessing camera: ', err);
        message.error('Gagal mengakses kamera. Pastikan kamera terhubung.');
      });
  };

const captureImage = async () => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/png");
  
  // Set preview image
  setImage(dataUrl);
  
  // Generate filename
  const newFileName = `CapturedImage_${Date.now()}.png`;
  setFileName(newFileName);

  const blob = await (await fetch(dataUrl)).blob();

  console.log("Blob size:", blob.size);

  const formData = new FormData();
  formData.append("file", blob, newFileName);
  formData.append("fileName", newFileName);
  formData.append("folder", "bprNasnus");

  try {
    setIsUploading(true);
    onUploadStatusChange?.(true);

    // Use proxy - requests to /api/* will be forwarded to https://api-nasnus.vercel.app
    const response = await axios.post(
      "https://api-nasnus.vercel.app/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload response:", response.data);

    if (response.data && response.data.data) {
      // Get the URL from response
      const uploadedUrl = response.data.data;
      message.success("Foto berhasil diupload");
      
      // Call the callback with the uploaded URL if provided
      if (handleFileChange) {
        handleFileChange(uploadedUrl);
      }
    } else {
      message.error("Format respons tidak valid");
    }

  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    message.error("Upload gagal: " + (error.response?.data?.message || error.message));
  } finally {
    setIsUploading(false);
    onUploadStatusChange?.(false);
  }
};

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const clearPreview = () => {
    setImage(null); // Clear preview image
    setFileName('CapturedImage.png');
  };

  useImperativeHandle(ref, () => ({
    stopCamera,
    clearPreview,
    validatePhoto: () => {
      if (isUploading) {
        message.loading('Upload foto masih berjalan, tunggu sampai selesai.', 1.5);
        return false;
      }
      if (!isCameraActive) {
        // message.error('Kamera belum aktif, silakan nyalakan kamera terlebih dahulu!');
        return false;
      }
      if (!image) {
        // message.error('Silakan ambil foto terlebih dahulu!');
        return false;
      }
      // message.success('Foto valid!');
      return true;
    },
  }));

  return (
<div>
<Form.Item
  label="Foto"
  name="foto"
  rules={[
    {
      required: !isCameraActive ,
      message: 'Silahkan tekan Mulai Kamera terlebih dahulu!',
    },
  ]}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Button
      type="primary"
      onClick={startCamera}
      disabled={isCameraActive || isUploading}
    >
      Mulai Kamera
    </Button>
    <video
      ref={videoRef}
      width="100%"
      height="auto"
      autoPlay
      style={{ marginTop: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
    ></video>
    </div>
    </Form.Item>
  <Form.Item
    label=""
    // name="ambilFoto"
    // rules={[
    //   {
    //     required: isCameraActive,
    //     message: 'Silakan ambil foto terlebih dahulu!',
    //   },
    // ]}
  >
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
      <Button
        type="primary"
        onClick={captureImage}
        disabled={!isCameraActive || isUploading}
        loading={isUploading}
      >
        Ambil Foto
      </Button>
      <Button
        type="danger"
        onClick={stopCamera}
        disabled={!isCameraActive || isUploading}
      >
        Stop Kamera
      </Button>
      <Button
        type="default"
        onClick={clearPreview}
        style={{ display: 'none' }}
      >
        Clear Preview
      </Button>
    </div>
  </Form.Item>


{/* Preview Gambar */}
{image && (
  <Form.Item
    label="Preview Gambar"
    name="preview"
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={5}>Preview Gambar</Title>
      <img
        src={image}
        alt="Captured"
        style={{
          maxWidth: '100%',
          maxHeight: '400px',
          objectFit: 'contain',
        }}
      />
      <div>{fileName}</div>
    </div>
  </Form.Item>
)}
  <canvas
    ref={canvasRef}
    width={640}
    height={480}
    style={{ display: "none" }}
  ></canvas>
    </div>
  );
});

export default CameraCapture;
