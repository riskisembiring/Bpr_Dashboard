import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Typography, message } from 'antd';

const { Title } = Typography;

const CameraCapture = forwardRef(({ handleFileChange }, ref) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('CapturedImage.png');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mulai kamera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        message.error('Gagal mengakses kamera. Pastikan kamera terhubung.');
      });
  };

  // Ambil gambar dari stream video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
    const newFileName = `CapturedImage_${new Date().getTime()}.png`; // Nama file baru
    setFileName(newFileName);
    
    // Kirim foto dan nama file ke parent
    handleFileChange(dataUrl, newFileName);
  };

  // Stop kamera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    } else {
      console.warn("Stream is already null or undefined.");
    }
  };

  // Expose stopCamera method to parent component
  useImperativeHandle(ref, () => ({
    stopCamera,
  }));

  return (
    <div>
      <Form.Item label="Foto" name="foto">
        <Button
          type="primary"
          onClick={startCamera}
          disabled={isCameraActive} // Disable jika kamera sudah aktif
        >
          Mulai Kamera
        </Button>
      </Form.Item>

      <Form.Item>
        <video
          ref={videoRef}
          width="100%" // Agar video responsif
          height="auto"
          autoPlay
          style={{ border: '1px solid #ccc', borderRadius: '5px' }}
        ></video>
      </Form.Item>

      <Form.Item label="" name="foto">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            type="primary"
            onClick={captureImage}
            disabled={!isCameraActive} // Disable jika kamera belum aktif
          >
            Ambil Foto
          </Button>
          <Button
            type="danger"
            onClick={stopCamera}
            disabled={!isCameraActive} // Disable jika kamera tidak aktif
          >
            Stop Kamera
          </Button>
        </div>
      </Form.Item>

      {/* Preview Gambar dan Nama File */}
      {image && (
        <Form.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Title level={5}>Preview Gambar</Title>
          <img src={image} alt="Captured" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          <div>{fileName}</div>
        </Form.Item>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
});

export default CameraCapture;
