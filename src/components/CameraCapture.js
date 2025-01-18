import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Typography } from 'antd';

const { Title } = Typography;

const CameraCapture = forwardRef(({ handleFileChange }, ref) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('CapturedImage.png');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mulai kamera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  };

  // Ambil gambar dari stream video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
    setFileName(`CapturedImage_${new Date().getTime()}.png`);
    handleFileChange(`CapturedImage_${new Date().getTime()}.png`); // Kirim foto yang diambil ke parent
  };

  // Stop kamera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  // Expose stopCamera method to parent component
  useImperativeHandle(ref, () => ({
    stopCamera,
  }));

  return (
    <div>
      <Form.Item label="Foto" name="foto">
        <Button type="primary" onClick={startCamera}>Mulai Kamera</Button>
      </Form.Item>

      {/* Video Feed */}
      <Form.Item>
        <video ref={videoRef} width="150%" height="auto" autoPlay></video>
      </Form.Item>

      {/* Tombol Ambil Foto */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" onClick={captureImage} style={{ marginRight: '10px' }}>
          Ambil Foto
        </Button>
      </div>

      {/* Preview Gambar dan Nama File */}
      {image && (
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Title level={5}>Preview Gambar</Title>
          <img src={image} alt="Captured" width="100%" />
          <div>{fileName}</div>
        </Form.Item>
      )}

      {/* Canvas Tersembunyi untuk Snapshot */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <br />
    </div>
  );
});

export default CameraCapture;
