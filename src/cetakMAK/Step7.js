import React, { useState, useEffect } from "react";
import { Form, Table, Input, Button, Space, Upload, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const Step7 = ({ formData, setFormData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const data = formData.tableDataAgunan || [];
  const data2 = formData.tableDataAgunan2 || [];

  useEffect(() => {
    const initialFileList = (formData.photoAgunan || []).map((item, index) => ({
      uid: index.toString(),
      name: item.url.split("/").pop(),
      url: item.url,
      description: item.description || "",
    }));
    setFileList(initialFileList);
  }, [formData.photoAgunan]);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    if (fileList.length >= 12) {
      message.error("You can only upload up to 12 photos");
      onError(new Error("Upload limit reached."));
      return;
    }

    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      message.error(`${file.name} exceeds the maximum file size of 500 KB.`);
      onError(new Error("File size exceeds limit."));
      return;
    }

    setIsUploading(true);
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

        const fileUrl = response.data.data;
        const updatedPhotos = [
          ...(formData.photoAgunan || []),
          { url: fileUrl, description: "" },
        ];
        setFormData({ ...formData, photoAgunan: updatedPhotos });

        setFileList(
          updatedPhotos.map((item, index) => ({
            uid: index.toString(),
            name: item.url.split("/").pop(),
            url: item.url,
            description: item.description,
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
      setIsUploading(false);
    }
  };

  const handleRemove = (file) => {
    const updatedPhotos = formData.photoAgunan.filter(
      (photo) => photo.url !== file.url
    );
    setFormData({ ...formData, photoAgunan: updatedPhotos });
    setFileList(
      updatedPhotos.map((item, index) => ({
        uid: index.toString(),
        name: item.url.split("/").pop(),
        url: item.url,
        description: item.description,
      }))
    );
  };

  const handleDescriptionChange = (index, value) => {
    const updatedPhotos = [...formData.photoAgunan];
    updatedPhotos[index].description = value;
    setFormData({ ...formData, photoAgunan: updatedPhotos });
    setFileList(
      updatedPhotos.map((item, idx) => ({
        uid: idx.toString(),
        name: item.url.split("/").pop(),
        url: item.url,
        description: item.description,
      }))
    );
  };

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (tableKey === "tableDataAgunan" ? data : data2).map(
      (row) => {
        if (row.key === key) {
          return { ...row, [column]: value };
        }
        return row;
      }
    );
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (tableKey === "tableDataAgunan" ? data : data2).filter(
      (row) => row.key !== key
    );
    setFormData({ ...formData, [tableKey]: newData });
  };

  const addRow = (tableKey) => {
    const newRow = {
      key: (
        (tableKey === "tableDataAgunan" ? data : data2).length + 1
      ).toString(),
      jenisAgunan: "",
      noDokumen: "",
      namaPemilikDanHubDebitur: "",
      luasTanahBangunan: "",
      nilaiPasar: "",
      nilaiLikuiditas: "",
      petugasAppraisal: "",
      KetAgunan: "",
    };
    const newData = [
      ...(tableKey === "tableDataAgunan" ? data : data2),
      newRow,
    ];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Jenis Agunan",
      dataIndex: "jenisAgunan",
      key: "jenisAgunan",
      render: (text, record) => (
        <Input
          value={record.jenisAgunan}
          placeholder="Masukkan Jenis Agunan"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "jenisAgunan",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "No Dokumen",
      dataIndex: "noDokumen",
      key: "noDokumen",
      render: (text, record) => (
        <Input
          value={record.noDokumen}
          placeholder="Masukkan No Dokumen"
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "noDokumen", tableKey)
          }
        />
      ),
    },
    {
      title: "Nama Pemilik & Hub Dengan Debitur",
      dataIndex: "namaPemilikDanHubDebitur",
      key: "namaPemilikDanHubDebitur",
      render: (text, record) => (
        <Input
          value={record.namaPemilikDanHubDebitur}
          placeholder="Masukkan Nama Pemilik & Hub Dengan Debitur"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "namaPemilikDanHubDebitur",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "Luas Tanah & bangunan",
      dataIndex: "luasTanahBangunan",
      key: "luasTanahBangunan",
      render: (text, record) => (
        <Input
          value={record.luasTanahBangunan}
          placeholder="Masukkan Luas Tanah & bangunan"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "luasTanahBangunan",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "Nilai Pasar",
      dataIndex: "nilaiPasar",
      key: "nilaiPasar",
      render: (text, record) => (
        <Input
          value={record.nilaiPasar}
          placeholder="Masukkan Nilai Pasar"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "nilaiPasar",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "Nilai Likuiditas",
      dataIndex: "nilaiLikuiditas",
      key: "ket",
      render: (text, record) => (
        <Input
          value={record.nilaiLikuiditas}
          placeholder="Masukkan Nilai Likuiditas"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "nilaiLikuiditas",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "Petugas Appraisal",
      dataIndex: "petugasAppraisal",
      key: "petugasAppraisal",
      render: (text, record) => (
        <Input
          value={record.petugasAppraisal}
          placeholder="Masukkan Petugas Appraisal"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "petugasAppraisal",
              tableKey
            )
          }
        />
      ),
    },
    {
      title: "Ket.",
      dataIndex: "ketAgunan",
      key: "ketAgunan",
      render: (text, record) => (
        <Input
          value={record.ketAgunan}
          placeholder="Masukkan Keterangan"
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "ketAgunan", tableKey)
          }
        />
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeRow(record.key, tableKey)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>
        2. Analisa Repayment Capacity Berdasarkan Laporan Keuangan Proforma
      </h3>
      <Form.Item
        label="Analisa Repayment Capacity"
        name="analisaRepaymentCapacity"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Analisa Repayment Capacity"
          autoSize={{ minRows: 8, maxRows: 8 }}
        />
      </Form.Item>

      <h3>3. Data Agunan</h3>
      <Table
        columns={columns("tableDataAgunan")}
        dataSource={data}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow("tableDataAgunan")}
        style={{ marginTop: "8px", marginBottom: "12px" }}
      >
        Tambah Baris
      </Button>
      <Form.Item
        label="Catatan Data Agunan"
        name="catatanDataAgunan"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Catatan Data Agunan"
          autoSize={{ minRows: 8, maxRows: 8 }}
        />
      </Form.Item>
      <h4>Foto Agunan</h4>
      <Upload
        customRequest={handleUpload}
        fileList={fileList}
        onRemove={handleRemove}
        multiple={false}
        maxCount={12}
        showUploadList={{ showRemoveIcon: true }}
        accept="image/*"
      >
        <Button
          icon={isUploading ? <LoadingOutlined /> : <UploadOutlined />}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Foto Agunan"}
        </Button>
      </Upload>

      {fileList.map((file, index) => (
        <div key={file.uid} style={{ marginTop: 10 }}>
          <Input
            placeholder={`Tambahkan deskripsi foto ${index + 1}`}
            value={file.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
        </div>
      ))}
      <br></br>
    </>
  );
};

export default Step7;
