import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Input, Form, Select, Radio, message, Spin, Typography } from "antd";
import ExportToExcel from "./ExportToExcel";
import CameraCapture from "./CameraCapture";
import Location from "./Location";
import "../styles/Collection.css";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { Title } = Typography;

const Collection = ({ userRole }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const locationRef = useRef(null);
  const cameraRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [isModalOpenKet, setIsModalOpenKet] = useState(false);
  const [modalContentKet, setModalContentKet] = useState("");
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);


  const keteranganOptions = [
    "Pembayaran cicilan per bulan.",
    "Keterlambatan pembayaran.",
    "Penyelesaian penuh.",
    "Penjadwalan ulang pembayaran.",
  ];

  const aktifitasOptions = [
    "Bertemu Debitur",
    "Tidak bertemu debitur",
    "Debitur melakukan pembayaran",
    "Debitur membuat janji bayar",
    "Debitur melakukan perlawanan",
  ];

  // Fetch data from API on component mount
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const username = localStorage.getItem("username");
  
    // Set user data berdasarkan username
    setUserData({ username });
  
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-nasnus.vercel.app/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
  
        let filtered;
        if (userRole === "collector") {
          // Jika userRole adalah collector, tampilkan data untuk username yang login
          filtered = result.filter((item) => item.nameUser === username);
        } else {
          // Jika userRole bukan collector, tampilkan semua data
          filtered = result;
        }
  
        // Menyimpan data dari API ke state
        setData(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading ke false setelah data di-fetch
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Reset isDataAdded agar tidak terus memicu useEffect
    if (isDataAdded) {
      setIsDataAdded(false);
    }
  }, [isDataAdded]);

  const resetFieldsVal = () => {
    form.setFieldsValue({ location: null });
    form.setFieldsValue({ foto: null });
  };

  const handleNew = () => {
    resetFieldsVal();
    // form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
    // setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsModalVisible(true);
    // setCurrentRecord(null);
    // setCurrentRecord(record);
    form.setFieldsValue(record);
    resetFieldsVal();
  };

  const cek = () => {
    console.log('cek', form.getFieldValue("foto"))
    console.log('form.validateFields()', form.validateFields(["foto"]));
  }

  const handleAccessCheck = () => {
    if (userRole === "collector" || userRole === "verifikator" || userRole === "direksi") {
      return true;
    }
  };

  const handleSave = async (values) => {
    const updatedLocation = currentRecord?.location || locationRef.current?.getLocation();
  
    // Pastikan location valid sebelum lanjut
    if (!updatedLocation) {
      message.error("Silakan lihat lokasi terlebih dahulu!");
      return;  // Hentikan proses jika lokasi tidak valid
    }
  
    const updatedFoto = currentRecord?.foto || "";
    const updatedBase64 = currentRecord?.fotoBase64 || "";
  
    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    const hideLoading = message.loading("Menyimpan data...", 0);
  
    try {
      // Validasi terlebih dahulu
      const validateResult = await form.validateFields();
      if (validateResult) {
        if (isEditing && currentRecord) {
          // Update data jika sedang dalam mode edit
          const response = await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...currentRecord,
              ...values,
              location: updatedLocation,
              foto: updatedFoto,
              tanggal: currentDate,
              nameUser: userData?.username,
              fotoBase64: updatedBase64,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Gagal memperbarui data di server");
          }
          message.success("Data berhasil diubah.");
          // form.setFieldsValue({ uploadfoto: null });  // Reset nilai foto
        } else {
          // Simpan data baru jika tidak dalam mode edit
          const newRecord = {
            key: `${data.length + 1}`,
            ...values,
            location: updatedLocation,
            foto: updatedFoto,
            tanggal: currentDate,
            nameUser: userData?.username,
            fotoBase64: updatedBase64,
            status: "Belum di cek",
          };
  
          const response = await fetch("https://api-nasnus.vercel.app/api/data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecord),
          });
  
          if (!response.ok) {
            throw new Error("Gagal menambahkan data baru ke server");
          }
          message.success("Data berhasil disimpan.");
        }
        form.resetFields();
        if (cameraRef.current) {
         cameraRef.current.stopCamera();
         cameraRef.current.clearPreview();
       }
       if (locationRef.current) {
         await locationRef.current.resetLocation();
       }
       setIsDataAdded(true);
       setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.message || "Terjadi kesalahan.");
    } finally {
      hideLoading();
    }
  };
  
  const handleStatusChange = async (value, record) => {
    try {
      // Update data lokal
      const updatedData = data.map((item) =>
        item.key === record.key
          ? { ...item, status: value === "" ? "Belum di cek" : value }
          : item
      );  
      setData(updatedData);
  
      // Kirim perubahan ke server menggunakan API
      await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...record,
          status: value === "" ? "Belum di cek" : value,
        }),
      }); 
    } catch (error) {
    }
  };

  const handleFileChange = (foto) => {
    setCurrentRecord((prev) => ({ ...prev, foto }));
  };

  const handleBase64 = (fotoBase64) => {
    setCurrentRecord((prev) => ({ ...prev, fotoBase64 }));
  };
//       const updatedData = data.map((item) =>
//         item.key === record.key ? { ...item, catatan: value } : item
//       );
//       setData(updatedData);

//     await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...record,
//         catatan: record.catatan
//       }),
//     });
//   } catch (error) {
//   }
// };

const handleCatatanChange = (record, value) => {
  const updatedData = data.map((item) =>
    item.key === record.key ? { ...item, catatan: value } : item
  );
  setData(updatedData);
};

const onclickSaveCatatan = async (record) => {
  setLoadingKey(record.key);
  try {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, catatan: record.catatan } : item
    );
    setData(updatedData);

    await fetch(`https://api-nasnus.vercel.app/api/data/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...record,
        catatan: record.catatan,
      }),
    });
    message.success("Catatan berhasil disimpan.");
  } catch (error) {
    message.error("Gagal menyimpan catatan.");
    console.error(error);
  } finally {
    setLoadingKey(null);
  }
};


const handleCancel = async () => {
  try {
    form.resetFields();
    handleFileChange(null);
    if (cameraRef.current) {
      cameraRef.current.stopCamera();
      cameraRef.current.clearPreview();
    }
    if (locationRef.current) {
      await locationRef.current.resetLocation();
    }
    setIsModalVisible(false);
    // await form.validateFields();
  } catch (error) {
    console.error("Error during cancel process:", error);
  }
};

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const updateLocation = (location) => {
    if (isEditing && currentRecord) {
      const updatedData = data.map((item) =>
        item.key === currentRecord.key ? { ...item, location } : item
      );
      setData(updatedData);
    } else {
      setCurrentRecord((prev) => ({ ...prev, location }));
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set gambar ke state
    setIsModalImageVisible(true); // Tampilkan modal
  };

  const handleCreateOrUpdate = () => {
    if (cameraRef.current && !cameraRef.current.validatePhoto()) {
      return; // Jika validasi gagal, hentikan eksekusi
    }
  };
  const filteredData = userRole === 'direksi'
  ? data.filter((item) =>
      searchText === "" || 
      (item.status && item.status.toLowerCase().includes(searchText.toLowerCase()))
    )
  : data.filter((item) =>
      item.namaDebitur?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.aktifitas?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSelectId = (id) => {
      setSelectedId(id);
    };

    const handleShowModalKet = (text) => {
      setModalContentKet(text);
      setIsModalOpenKet(true);
    };
  
    const handleCloseModalKet = () => {
      setIsModalOpenKet(false);
      setModalContentKet("");
    };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      hidden: true
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      // hidden: userRole !== 'collector' ? false : true,
      sorter: (a, b) => a.tanggal.localeCompare(b.tanggal),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nama User",
      dataIndex: "nameUser",
      key: "nameUser",
      // hidden: userRole === 'direksi' ? false : true,
      sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nama Debitur",
      dataIndex: "namaDebitur",
      key: "namaDebitur",
      sorter: (a, b) => a.namaDebitur.localeCompare(b.namaDebitur),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Aktifitas",
      dataIndex: "aktifitas",
      key: "aktifitas",
      sorter: (a, b) => a.aktifitas.localeCompare(b.aktifitas),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Hasil",
      dataIndex: "hasil",
      key: "hasil",
      sorter: (a, b) => a.hasil.localeCompare(b.hasil),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      width: 150,
      render: (text) => {
        return text.length > 100 ? (
          <>
            {text.substring(0, 100)}...
            <Button type="link" onClick={() => handleShowModalKet(text)}>
              Lihat Selengkapnya
            </Button>
          </>
        ) : (
          text
        );
      },
    },
    // {
    //   title: "Foto",
    //   dataIndex: "foto",
    //   key: "foto",
    //   sorter: (a, b) => a.foto.localeCompare(b.foto),
    //   sortDirections: ["ascend", "descend"],
    // },
    {
      title: "Foto",
      dataIndex: "fotoBase64", 
      key: "fotoBase64",
      render: (text) => {
        const base64WithPrefix = `data:image/png;base64,${text}`;
        return (
          <img
            src={base64WithPrefix}
            alt="fotoBase64"
            style={{ width: "70px", height: "auto", borderRadius: "8px", cursor: "pointer" }}
            onClick={() => handleImageClick(base64WithPrefix)} // Tangkap event klik
          />
        );
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ["ascend", "descend"],
      render: (text) => <a href={`https://www.google.com/maps/place/${text}`} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: "10px" }} disabled={userRole !== "collector"}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      hidden: userRole === 'collector' ? true : false,
      render: (_, record) => (
        <div>
          <Select
            value={record.status || "Belum di cek"}
            style={{ width: 120, marginRight: "10px" }}
            onChange={(value) => handleStatusChange(value, record)}
            disabled={userRole !== "verifikator"}
            placeholder="Pilih Status"
          >
            {/* <Option value='Belum di cek'>Pilih Status</Option> */}
            <Option value="approve">Approve</Option>
            <Option value="reject">Reject</Option>
          </Select>
          <TextArea
            value={record.catatan || ""}
            placeholder="Catatan"
            onChange={(e) => handleCatatanChange(record, e.target.value)}
            style={{ width: 300, height: 100 }}
            disabled={userRole !== "verifikator"}
          />
          <Button type="primary" 
          onClick={() => onclickSaveCatatan(record)}
          loading={loadingKey === record.key}>Save Catatan</Button>        
      </div>
      ),
    }
  ];

  return (
<div>
{handleAccessCheck() ? (
  <>
      {loading ? (
        <Spin tip="Loading..."> {/* Menampilkan indikator loading */}
          <div style={{ height: 200 }} /> {/* Area untuk memastikan Spinner tampil dengan baik */}
        </Spin>
      ) : (
        <div>
    <div className="container">
      {/* Search Input */}
      <Input
        placeholder={
          userRole === "direksi"
            ? "Search by Status (Approve/Reject/Belum di cek)"
            : "Search by Nama Debitur atau Aktifitas"
        }
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="button-group">
        <Button
          onClick={handleNew}
          type="primary"
          disabled={userRole !== "collector"}
        >
          New
        </Button>

        {/* Button Export to Excel */}
        <ExportToExcel data={data} disabled={userRole === "collector"} />
      </div>
    </div>

      <Table
        columns={columns.filter((column) => !column.hidden)}
        dataSource={filteredData}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleSelectId(record.id),
          style: {
            backgroundColor: selectedId === record.id ? "#e6f7ff" : "", // Menandai baris yang dipilih
          },
        })}
        scroll={{ x: 1200, y: 400 }}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Keterangan Lengkap"
        open={isModalOpenKet}
        onCancel={handleCloseModalKet}
        closable={false}
        footer={[
          <Button key="close" onClick={handleCloseModalKet}>
            Tutup
          </Button>,
        ]}
      >
        <p>{modalContentKet}</p>
      </Modal>
      
      <Modal
        visible={isModalImageVisible}
        footer={null}
        onCancel={() => setIsModalImageVisible(false)}
        width={500}
        closable={true} // Opsi untuk menampilkan tombol close
      >
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
      </Modal>

      <Modal
        title={isEditing ? "Edit Data" : "New Data"}
        visible={isModalVisible}
        footer={null}
        style={{ top: 20 }}
        closable={false}
      >
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <Form
            key={currentRecord?.key || "new"}
            form={form}
            initialValues={{
              ...currentRecord,
              tanggal: new Date().toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            }}
            onFinish={handleSave}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            {/* Input Tanggal */}
            <Form.Item
              label="Tanggal"
              name="tanggal"
              hidden={true}
            >
              <Input
                value={new Date().toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              />
            </Form.Item>

            {/* Input Nama Debitur */}
            <Form.Item
              label="Nama Debitur"
              name="namaDebitur"
              rules={[{ required: true, message: "Please input Nama Debitur!" }]}
            >
              <Input />
            </Form.Item>

            {/* Input Aktifitas */}
            <Form.Item
              label="Aktifitas"
              name="aktifitas"
              rules={[{ required: true, message: "Please select Aktifitas!" }]}
            >
              <Radio.Group>
                {aktifitasOptions.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Hasil" name="hasil" rules={[{ required: true, message: "Please select Hasil!" }]}>
              <Select>
                {keteranganOptions.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Input Keterangan */}
            <Form.Item label="Keterangan" name="keterangan"
              rules={[{ required: true, message: "Please input keterangan!" }]}>
              <TextArea />
            </Form.Item>

            {/* Camera Component */}
            <CameraCapture ref={cameraRef} handleFileChange={handleFileChange} handleBase64={handleBase64} />

            {/* Location Component */}
            <Location ref={locationRef} updateLocation={updateLocation} form={form}/>

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleCreateOrUpdate}>
                {isEditing ? "Update" : "Create"}
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
              <Button onClick={cek} style={{ marginLeft: "10px", display: 'none' }}>
                Cek
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
      )}
      </>
       ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Title level={4}>User '{userRole}' tidak memiliki akses untuk membuka menu ini!</Title>
          <div style={{ fontSize: "30px" }}>😞</div>
        </div>
      )}
    </div>

  );
};

export default Collection;
