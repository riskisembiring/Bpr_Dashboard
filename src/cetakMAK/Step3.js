import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  LoadingOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Table, Form, Input, Button, Space, Upload, message } from "antd";
import axios from "axios";
import { NumericFormat } from "react-number-format";

const Step3 = ({ formData, setFormData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const data = formData.tableInvoicePembelian || [];
  const data2 = formData.tableInvoicePembelian2 || [];
  const data3 = formData.tableBuktiTransaksiPembelian || [];
  const data4 = formData.tableBuktiTransaksiPembelian4 || [];
  const data5 = formData.tableHasilVerifikasiSupplier || [];
  const data6 = formData.tableHasilVerifikasiSupplier6 || [];
  const [fileList, setFileList] = useState([]);

  const handleInputChange = (value, key, column, tableKey) => {
    const newData = (tableKey === "tableInvoicePembelian" ? data : data2).map(
      (row) => {
        if (row.key === key) {
          return { ...row, [column]: value };
        }
        return row;
      }
    );
    setFormData({ ...formData, [tableKey]: newData });
  };


  const handleInputChange2 = (value, key, column, tableKey2) => {
    const newData = (
      tableKey2 === "tableBuktiTransaksiPembelian" ? data3 : data4
    ).map((row) => {
      if (row.key === key) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setFormData({ ...formData, [tableKey2]: newData });
  };

  const handleInputChange3 = (value, key, column, tableKey3) => {
    const newData = (
      tableKey3 === "tableHasilVerifikasiSupplier" ? data5 : data6
    ).map((row) => {
      if (row.key === key) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setFormData({ ...formData, [tableKey3]: newData });
  };

  const addRow = (tableKey) => {
    const newRow = {
      key: (
        (tableKey === "tableInvoicePembelian" ? data : data2).length + 1
      ).toString(),
      invoices: "",
      nominals: "",
      namaSupplier: "",
    };
    const newData = [
      ...(tableKey === "tableInvoicePembelian" ? data : data2),
      newRow,
    ];
    setFormData({ ...formData, [tableKey]: newData });
  };

  const addRow2 = (tableKey2) => {
    const newRow = {
      key: (
        (tableKey2 === "tableBuktiTransaksiPembelian" ? data3 : data4).length +
        1
      ).toString(),
      namaToko: "",
      nominalBelanja: "",
    };
    const newData = [
      ...(tableKey2 === "tableBuktiTransaksiPembelian" ? data3 : data4),
      newRow,
    ];
    setFormData({ ...formData, [tableKey2]: newData });
  };

  const addRow3 = (tableKey3) => {
    const newRow = {
      key: (
        (tableKey3 === "tableHasilVerifikasiSupplier" ? data5 : data6).length +
        1
      ).toString(),
      namaToko: "",
      noteleponWeb: "",
    };
    const newData = [
      ...(tableKey3 === "tableHasilVerifikasiSupplier" ? data5 : data6),
      newRow,
    ];
    setFormData({ ...formData, [tableKey3]: newData });
  };

  const removeRow = (key, tableKey) => {
    const newData = (
      tableKey === "tableInvoicePembelian" ? data : data2
    ).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey]: newData });
  };

  const removeRow2 = (key, tableKey2) => {
    const newData = (
      tableKey2 === "tableBuktiTransaksiPembelian" ? data3 : data4
    ).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey2]: newData });
  };

  const removeRow3 = (key, tableKey3) => {
    const newData = (
      tableKey3 === "tableHasilVerifikasiSupplier" ? data5 : data6
    ).filter((row) => row.key !== key);
    setFormData({ ...formData, [tableKey3]: newData });
  };

  const columns = (tableKey) => [
    {
      title: "Invoice",
      dataIndex: "invoices",
      key: "invoices",
      render: (text, record) => (
        <Input
          value={record.invoices}
          placeholder="Masukkan Invoice"
          onChange={(e) =>
            handleInputChange(e.target.value, record.key, "invoices", tableKey)
          }
          className="responsive-input"
        />
      ),
      width: 280,
    },
    {
      title: "Nominal",
      dataIndex: "nominals",
      key: "nominals",
      render: (text, record) => (
        <NumericFormat
          value={String(record.nominals)}
          placeholder="Masukkan Nominal"
          onValueChange={(values) =>
            handleInputChange(
              String(values.value),
              record.key,
              "nominals",
              tableKey
            )
          }
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={0}
          fixedDecimalScale={false}
          className="responsive-input"
        />
      ),
      width: 200,
    },
    {
      title: "Nama Supplier",
      dataIndex: "namaSupplier",
      key: "namaSupplier",
      render: (text, record) => (
        <Input
          value={record.namaSupplier}
          placeholder="Masukkan Nama Supplier"
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              record.key,
              "namaSupplier",
              tableKey
            )
          }
          className="responsive-input"
        />
      ),
      width: 280,
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

  const columns2 = (tableKey2) => [
    {
      title: "Nama Toko",
      dataIndex: "namaToko",
      key: "namaToko",
      render: (text, record) => (
        <Input
          value={record.namaToko}
          placeholder="Masukkan Nama Toko"
          onChange={(e) =>
            handleInputChange2(
              e.target.value,
              record.key,
              "namaToko",
              tableKey2
            )
          }
          className="responsive-input"
        />
      ),
      width: 280,
    },
    {
      title: "Nominal Belanja",
      dataIndex: "nominalBelanja",
      key: "nominalBelanja",
      render: (text, record) => (
        <NumericFormat
        value={String(record.nominalBelanja)}
        placeholder="Masukkan Nominal Belanja"
        onValueChange={(values) =>
          handleInputChange2(
            String(values.value),
            record.key,
            "nominalBelanja",
            tableKey2
          )
        }
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        decimalScale={0}
        fixedDecimalScale={false}
        className="responsive-input"
      />
      ),
      width: 200,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeRow2(record.key, tableKey2)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  const columns3 = (tableKey3) => [
    {
      title: "Nama Toko",
      dataIndex: "namaToko",
      key: "namaToko",
      render: (text, record) => (
        <Input
          value={record.namaToko}
          placeholder="Masukkan Nama Toko"
          onChange={(e) =>
            handleInputChange3(
              e.target.value,
              record.key,
              "namaToko",
              tableKey3
            )
          }
          className="responsive-input"
        />
      ),
    },
    {
      title: "No. telpon/web dan online shop",
      dataIndex: "noteleponWeb",
      key: "noteleponWeb",
      render: (text, record) => (
        <Input
          value={record.noteleponWeb}
          placeholder="Masukkan No. telpon/web dan online shop"
          onChange={(e) =>
            handleInputChange3(
              e.target.value,
              record.key,
              "noteleponWeb",
              tableKey3
            )
          }
          className="responsive-input"
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
            onClick={() => removeRow3(record.key, tableKey3)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const initialFileList = (formData.photoUsaha || []).map((item, index) => ({
      uid: index.toString(),
      name: item.url.split("/").pop(),
      url: item.url,
      description: item.description || "",
    }));
    setFileList(initialFileList);
  }, [formData.photoUsaha]);

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
        "https://api-nasnus.vercel.app/api/upload",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success(`${file.name} uploaded successfully.`);

        const fileUrl = response.data.data;
        const updatedPhotos = [
          ...(formData.photoUsaha || []),
          { url: fileUrl, description: "" },
        ];
        setFormData({ ...formData, photoUsaha: updatedPhotos });

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
    const updatedPhotos = formData.photoUsaha.filter(
      (photo) => photo.url !== file.url
    );
    setFormData({ ...formData, photoUsaha: updatedPhotos });
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
    const updatedPhotos = [...formData.photoUsaha];
    updatedPhotos[index].description = value;
    setFormData({ ...formData, photoUsaha: updatedPhotos });
    setFileList(
      updatedPhotos.map((item, idx) => ({
        uid: idx.toString(),
        name: item.url.split("/").pop(),
        url: item.url,
        description: item.description,
      }))
    );
  };

  return (
    <>
      <Form.Item
        label="Profil Debitur"
        name="profilDebitur"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Profil Debitur"
          autoSize={{ minRows: 6, maxRows: 8 }}
        />
      </Form.Item>

      <Form.Item
        label="Analisa Usaha / Pekerjaan"
        name="analisaUsahaPekerjaan"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Analisa Usaha / Pekerjaan"
          autoSize={{ minRows: 6, maxRows: 8 }}
        />
      </Form.Item>

      <Form.Item
        label="Aspek Pengadaan Barang/Bahan Baku"
        name="aspekPengadaanBarang"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Aspek Pengadaan Barang/Bahan Baku"
          autoSize={{ minRows: 6, maxRows: 8 }}
        />
      </Form.Item>
      <h4>Tabel Invoice Pembelian</h4>
      <Table
        columns={columns("tableInvoicePembelian")}
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
        onClick={() => addRow("tableInvoicePembelian")}
        style={{ marginTop: "8px", marginBottom: '12px' }}
      >
        Tambah Baris
      </Button>
    
      <Form.Item
        label="Note Invoice Pembelian"
        name="noteInvoice"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Note"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      </Form.Item>
      <h4>Tabel Bukti Transaksi Pembelian</h4>
      <Table
        columns={columns2("tableBuktiTransaksiPembelian")}
        dataSource={data3}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow2("tableBuktiTransaksiPembelian")}
        style={{ marginTop: "8px", marginBottom: '12px' }}
      >
        Tambah Baris
      </Button>
      <h4>Tabel Hasil Verifikasi Suplayer bahan baku</h4>
      <Table
        columns={columns3("tableHasilVerifikasiSupplier")}
        dataSource={data5}
        pagination={false}
        bordered
        style={{ marginBottom: "16px" }}
        scroll={{ x: "max-content" }}
        responsive
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addRow3("tableHasilVerifikasiSupplier")}
        style={{ marginTop: "8px", marginBottom: '12px' }}
      >
        Tambah Baris
      </Button>

      <Form.Item
        label="Aspek Pemasaran/Distribusi"
        name="aspekPemasaranDistribusi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Aspek Pemasaran/Distribusi"
          autoSize={{ minRows: 10, maxRows: 8 }}
        />
      </Form.Item>

      <Form.Item
        label="Kontrak Kerja Yang Dimiliki"
        name="kontrakKerjaDimiliki"
        // rules={[{ required: true, message: "Harap masukkan nama debitur Anda!" }]}
      >
        <Input placeholder="Masukkan Kontrak Kerja Yang Dimiliki" />
      </Form.Item>

      <Form.Item
        label="Aspek Rencana Pengembangan Usaha"
        name="aspekRencanaPengembanganUsaha"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea
          placeholder="Masukkan Aspek Rencana Pengembangan Usaha"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      </Form.Item>
      <h4>Foto Usaha</h4>
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
          {isUploading ? "Uploading..." : "Upload Foto Usaha"}
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

export default Step3;
