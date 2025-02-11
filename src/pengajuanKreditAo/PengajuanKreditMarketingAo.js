import React, { useState, useRef } from "react";
import { Button, Modal, Form, Input, Upload, message, Radio, Select, Table } from "antd";
import { UploadOutlined, CameraOutlined } from "@ant-design/icons";

const { Option } = Select;

const PengajuanKreditMarketingAo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isOtherJenis, setIsOtherJenis] = useState(false);
  const [isOtherKondisi, setIsOtherKondisi] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [fieldNameForCamera, setFieldNameForCamera] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    // form.resetFields();
    setCapturedPhotos({});
  };

  function dataURLtoFile(dataURL, filename) {
    const arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  
  const handleSubmit = (values) => {
    const combinedValues = {
      ...values,
      photos: capturedPhotos,
    };
    const formData = new FormData();
    
    // Menambahkan data form
    formData.append("nama", values.nama);
    formData.append("tujuan", values.tujuan);
    formData.append("jenisSertifikat", values.jenisSertifikat);
    formData.append("kondisiSertifikat", values.kondisiSertifikat);
    if (values.jenisSertifikatLainnya) {
      formData.append("jenisSertifikatLainnya", values.jenisSertifikatLainnya);
    }
    if (values.kondisiSertifikatLainnya) {
      formData.append("kondisiSertifikatLainnya", values.kondisiSertifikatLainnya);
    }
  
    // Menambahkan file foto
    Object.keys(capturedPhotos).forEach((key) => {
      const file = dataURLtoFile(capturedPhotos[key], key + '.png');
      formData.append("fotoKunjungan", file);
      console.log('File yang ditambahkan:', file);
    });
  
    // Mengirim data ke API
    fetch("http://localhost:3000/api/submit-kredit", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      setSubmittedData((prev) => [...prev, combinedValues]);
      // setSubmittedData((prev) => [...prev, data.data]);
      message.success("Data berhasil disubmit!");
      handleCancel();
    })
      .catch((error) => {
        message.error("Gagal mengirim data: " + error.message);
      });
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current && fieldNameForCamera) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const photo = canvasRef.current.toDataURL("image/png");

      setCapturedPhotos((prev) => ({
        ...prev,
        [fieldNameForCamera]: photo,
      }));
      handleCloseCamera();
    }
  };

  const handleOpenCamera = (fieldName) => {
    setIsCameraOpen(true);
    setFieldNameForCamera(fieldName);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => message.error("Gagal memutar video: " + err.message));
        }
      })
      .catch((err) => {
        message.error("Kamera tidak dapat diakses: " + err.message);
        setIsCameraOpen(false);
      });
  };

  const handleOpenDetailModal = (record) => {
    console.log('test', record); // Pastikan foto kunjungan ada di data
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedRecord(null);
    setIsDetailModalOpen(false);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setFieldNameForCamera(null);
  };

  const FileUploadButton = ({ label, name, accept = "*" }) => {
    const [fileList, setFileList] = useState([]);

    const uploadProps = {
      beforeUpload: () => false,
      accept,
      fileList,
      onChange: ({ fileList: newFileList }) => setFileList(newFileList),
    };

    return (
      <Form.Item
        label={label}
        name={name}
        // rules={[{ required: !fileList.length && !capturedPhotos[name], message: `Upload ${label.toLowerCase()}!` }]}
      >
        <Upload {...uploadProps} listType="picture">
          <Button icon={<UploadOutlined />} disabled={!!capturedPhotos[name]}>
            Upload
          </Button>
        </Upload>
        <Button
          type="dashed"
          icon={<CameraOutlined />}
          onClick={() => handleOpenCamera(name)}
          style={{ marginTop: "8px" }}
          disabled={!!fileList.length || !!capturedPhotos[name]}
        >
          Ambil Foto
        </Button>
        {capturedPhotos[name] && (
          <div style={{ marginTop: "16px" }}>
            <img src={capturedPhotos[name]} alt="Captured" style={{ width: "100%" }} />
          </div>
        )}
      </Form.Item>
    );
  };

  const columns = [
    {
      title: "Nama Calon Debitur",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Tujuan Pengajuan",
      dataIndex: "tujuan",
      key: "tujuan",
    },
    {
      title: "Jenis Sertifikat",
      dataIndex: "jenisSertifikat",
      key: "jenisSertifikat",
    },
    {
      title: "Foto Kunjungan",
      dataIndex: "fotoKunjungan",
      key: "fotoKunjungan",
      render: (text, record) => (
        record.photos && record.photos.fotoKunjungan ? (
          <img src={record.photos.fotoKunjungan} alt="Foto Kunjungan" style={{ width: '50px', height: 'auto' }} />
        ) : (
          <span>Foto tidak tersedia</span>
        )
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => handleOpenDetailModal(record)} type="link" style={{ marginRight: "10px" }}>
            Lihat lengkapnya
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'right'}}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          New
        </Button>
      </div>
      <Table dataSource={submittedData} columns={columns} rowKey="nama" style={{ marginTop: "20px" }} />
      <Modal title="Form Calon Debitur" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Nama Calon Debitur" name="nama" rules={[{ required: true, message: "Masukkan nama calon debitur!" }]}>
            <Input placeholder="Masukkan nama calon debitur" />
          </Form.Item>
          <Form.Item label="Tujuan Pengajuan" name="tujuan" rules={[{ required: true, message: "Masukkan tujuan pengajuan!" }]}>
            <Input placeholder="Masukkan tujuan pengajuan" />
          </Form.Item>
          <Form.Item label="Jenis Sertifikat" name="jenisSertifikat" rules={[{ required: true, message: "Pilih jenis sertifikat!" }]}>
            <Radio.Group onChange={(e) => setIsOtherJenis(e.target.value === "Lainnya")}>
              <Radio value="SHM">SHM</Radio>
              <Radio value="SHGB">SHGB</Radio>
              <Radio value="Lainnya">Lainnya</Radio>
            </Radio.Group>
          </Form.Item>
          {isOtherJenis && (
            <Form.Item label="Jenis Sertifikat Lainnya" name="jenisSertifikatLainnya" rules={[{ required: true, message: "Masukkan jenis sertifikat lainnya!" }]}>
              <Input placeholder="Masukkan jenis sertifikat lainnya" />
            </Form.Item>
          )}
          <Form.Item label="Kondisi Sertifikat" name="kondisiSertifikat" rules={[{ required: true, message: "Pilih kondisi sertifikat!" }]}>
            <Select placeholder="Pilih kondisi sertifikat" onChange={(value) => setIsOtherKondisi(value === "lainnya")}>
              <Option value="takeover">Takeover</Option>
              <Option value="onHand">On Hand</Option>
              <Option value="waris">Waris</Option>
              <Option value="lainnya">Lainnya</Option>
            </Select>
          </Form.Item>
          {isOtherKondisi && (
            <Form.Item label="Kondisi Sertifikat Lainnya" name="kondisiSertifikatLainnya" rules={[{ required: true, message: "Masukkan kondisi sertifikat lainnya!" }]}>
              <Input placeholder="Masukkan kondisi sertifikat lainnya" />
            </Form.Item>
          )}
          <FileUploadButton label="Foto Kunjungan" name="fotoKunjungan" accept=".jpg,.jpeg,.png"/>
          <FileUploadButton label="Foto Debitur" name="fotoDebitur" accept=".jpg,.jpeg,.png"/>
          <FileUploadButton label="Foto Sertifikat" name="fotoSertifikat" accept=".jpg,.jpeg,.png"/>
          <FileUploadButton label="Foto KTP" name="fotoKtp" accept=".jpg,.jpeg,.png"/>
          <FileUploadButton label="Foto KK" name="fotoKk" accept=".jpg,.jpeg,.png"/>
          <FileUploadButton label="Form Pengecekan Slik" name="formPengecekanSlik" accept="pdf,.docx,.doc,.xlsx"/>
          <FileUploadButton label="Form Pengajuan Kredit" name="formPengajuanKredit" accept="pdf,.docx,.doc,.xlsx"/>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button onClick={handleCancel}>Batal</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {isCameraOpen && (
        <Modal title="Ambil Foto" open={isCameraOpen} onCancel={handleCloseCamera} footer={null}>
          <video ref={videoRef} style={{ width: "100%" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
          <Button type="primary" onClick={handleCapturePhoto} style={{ marginTop: "8px" }}>
            Ambil Foto
          </Button>
        </Modal>
      )}
      {selectedRecord && (
        <Modal
          title="Detail Calon Debitur"
          open={isDetailModalOpen}
          onCancel={handleCloseDetailModal}
          footer={[<Button key="close" onClick={handleCloseDetailModal}>Tutup</Button>]}
        >
          <p><strong>Nama :</strong> {selectedRecord.nama}</p>
          <p><strong>Tujuan Pengajuan :</strong> {selectedRecord.tujuan}</p>
          <p><strong>Jenis Sertifikat :</strong> {selectedRecord.jenisSertifikat}</p>
          <p><strong>Kondisi Sertifikat :</strong> {selectedRecord.kondisiSertifikat}</p>
          <p><strong>Foto Kunjungan :</strong></p>
          {selectedRecord.photos.fotoKunjungan &&
            <img src={selectedRecord.photos.fotoKunjungan} alt="Foto Kunjungan" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Foto Debitur :</strong></p>
          {selectedRecord.photos.fotoDebitur &&
            <img src={selectedRecord.photos.fotoDebitur} alt="Foto Debitur" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Foto Sertifikat :</strong></p>
          {selectedRecord.photos.fotoSertifikat &&
            <img src={selectedRecord.photos.fotoSertifikat} alt="Foto Sertifikat" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Foto KTP :</strong></p>
          {selectedRecord.photos.fotoKtp &&
            <img src={selectedRecord.photos.fotoKtp} alt="Foto KTP" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Foto KK :</strong></p>
          {selectedRecord.photos.fotoKk &&
            <img src={selectedRecord.photos.fotoKk} alt="Foto KK" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Form Pengecekan Slik :</strong></p>
          {selectedRecord.photos.formPengecekanSlik &&
            <img src={selectedRecord.photos.formPengecekanSlik} alt="Form Pengecekan Slik" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          <p><strong>Form Pengajuan Kredit :</strong></p>
          {selectedRecord.photos.formPengajuanKredit &&
            <img src={selectedRecord.photos.formPengajuanKredit} alt="Form Pengajuan Kredit" style={{ maxWidth: '30%', height: 'auto' }} />
          }
          </Modal>
      )}
    </div>
  );
};

export default PengajuanKreditMarketingAo;
