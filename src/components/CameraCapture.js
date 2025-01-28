import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Typography, message } from 'antd';

const { Title } = Typography;

const CameraCapture = forwardRef(({ handleFileChange, handleBase64 }, ref) => {
  const [fileName, setFileName] = useState('CapturedImage.png');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [image, setImage] = useState(null);
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

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.split(',')[1];
  
    // Mengecek apakah gambar adalah base64
    console.log("Base64 image:", base64Data);
    console.log(":", dataUrl);
  
    setImage(dataUrl);
    setFileName(`CapturedImage_${new Date().getTime()}.png`);
    handleFileChange(`CapturedImage_${new Date().getTime()}.png`); // Pastikan data URL base64 dikirim ke parent
    handleBase64(base64Data);
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
      disabled={isCameraActive}
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
        disabled={!isCameraActive}
      >
        Ambil Foto
      </Button>
      <Button
        type="danger"
        onClick={stopCamera}
        disabled={!isCameraActive}
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
<canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

    </div>
  );
});

export default CameraCapture;
