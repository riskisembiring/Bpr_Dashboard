import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Table, Modal, Spin } from "antd";
import moment from "moment";
import { handleExportToPDF } from "./PdfDebitur";
import { handleExportToExcel } from "./ExcelDebitur";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import "../styles/CetakMak.css";
import dayjs from "dayjs";

const { Title } = Typography;

const CetakMak = () => {
  const [form] = Form.useForm();
  const [dataDebitur, setDataDebitur] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    invoiceanalisaUsahaPekerjaan: "",
    invoices: [],
    nominalInput: "",
    nominals: [],
    namaSupplierInput: "",
    namaSuppliers: [],
    userGoalInput: "",
    userGoals: [],
    photoUsaha: [],
    photoAgunan: [],
    businessPhotos: [],
    analisaUsahaPekerjaan: [],
    aspekPengadaanBarang: [],
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role); // Simpan user role di state

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api-nasnus.vercel.app/api/data-mak"
        );
        const result = await response.json();
        if (response.ok) {
          setDataDebitur(result.data);
          if (result.data.length > 0) {
            setSelectedRowKey(result.data[0].id);
          }
        } else {
          console.error("Failed to fetch data:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccessCheck = () => {
    return (
      userRole === "marketing" ||
      userRole === "analisis" ||
      userRole === "direksi"
    );
  };

  const handleNextStep = async () => {
    console.log("test", formStep);
    try {
      await form.validateFields();
      if (
        formStep === 2 &&
        (!formData.tableRingkasanPengajuanKredit ||
          formData.tableRingkasanPengajuanKredit.length === 0)
      ) {
        alert("Data Ringkasan Pengajuan Kredit tidak boleh kosong!");
        return;
      }
      if (
        formStep === 3 &&
        (!formData.tableInvoicePembelian ||
          (formData.tableInvoicePembelian.length === 0 &&
            formData.selectedJob === "Wiraswasta"))
      ) {
        alert("Data Invoice Pembelian tidak boleh kosong!");
        return;
      }
      if (
        formStep === 3 &&
        (!formData.tableBuktiTransaksiPembelian ||
          (formData.tableBuktiTransaksiPembelian.length === 0 &&
            formData.selectedJob === "Wiraswasta"))
      ) {
        alert("Bukti Transaksi Pembelian tidak boleh kosong!");
        return;
      }
      if (
        formStep === 3 &&
        (!formData.tableHasilVerifikasiSupplier ||
          (formData.tableHasilVerifikasiSupplier.length === 0 &&
            formData.selectedJob === "Wiraswasta"))
      ) {
        alert("Data Hasil Verifikasi Suplayer bahan baku tidak boleh kosong!");
        return;
      }
      if (
        formStep === 3 &&
        (!formData.photoUsaha ||
          (formData.photoUsaha.length === 0 &&
            formData.selectedJob === "Wiraswasta"))
      ) {
        alert("Data Foto Usaha tidak boleh kosong!");
        return;
      }
      if (
        formStep === 4 &&
        (!formData.slikTables || formData.slikTables.length === 0)
      ) {
        alert("Data Rekapitulasi Slik tidak boleh kosong!");
        return;
      }
      if (
        formStep === 5 &&
        (!formData.slikTables || formData.analisaList.length === 0)
      ) {
        alert("Data Analisa Rekening Koran tidak boleh kosong!");
        return;
      }
      if (
        formStep === 6 &&
        (!formData.tableLabaRugiProforma ||
          (formData.tableLabaRugiProforma.length === 0 &&
            formData.selectedJob === "Wiraswasta"))
      ) {
        alert("Data Laporan Laba Rugi Proforma tidak boleh kosong!");
        return;
      }
      if (
        formStep === 7 &&
        (!formData.tableDataAgunan || formData.tableDataAgunan.length === 0)
      ) {
        alert("Data Agunan tidak boleh kosong!");
        return;
      }
      if (
        formStep === 7 &&
        (!formData.photoAgunan || formData.photoAgunan.length === 0)
      ) {
        alert("Data Foto Agunan tidak boleh kosong!");
        return;
      }
      const values = form.getFieldsValue();
      setFormData((prevData) => ({
        ...prevData,
        ...values,
      }));

      // Pindah ke step berikutnya
      setFormStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log("Validasi gagal:", error);
    }
  };

  const handleBackStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      const isEditMode = selectedRowKey !== null;

      const tanggalSubmit = !isEditMode
        ? dayjs().format("DD-MM-YYYY")
        : undefined;
      const tanggalEdit = isEditMode ? dayjs().format("DD-MM-YYYY") : undefined;

      let updatedFormData = {
        ...formData,
        ...values, // Menggunakan values hasil validasi
        aspekPengadaanBarang:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.aspekPengadaanBarang || [],
        tableInvoicePembelian:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.tableInvoicePembelian || [],
        noteInvoice:
          formData.selectedJob !== "Wiraswasta" ? [] : formData.noteInvoice || [],
        tableBuktiTransaksiPembelian:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.tableBuktiTransaksiPembelian || [],
        tableHasilVerifikasiSupplier:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.tableHasilVerifikasiSupplier || [],
        aspekPemasaranDistribusi:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.aspekPemasaranDistribusi || [],
        kontrakKerjaDimiliki:
          formData.selectedJob !== "Wiraswasta"
            ? ""
            : formData.kontrakKerjaDimiliki || "",
        aspekRencanaPengembanganUsaha:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.aspekRencanaPengembanganUsaha || [],
        photoUsaha:
          formData.selectedJob !== "Wiraswasta" ? [] : formData.photoUsaha || [],
        tableLabaRugiProforma:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.tableLabaRugiProforma || [],
        tableNeracaProforma:
          formData.selectedJob !== "Wiraswasta"
            ? []
            : formData.tableNeracaProforma || [],
        ...(isEditMode ? { tanggalEdit } : { tanggalSubmit }),
      };

      let url = "https://api-nasnus.vercel.app/api/data-mak"; // Default untuk POST
      let method = "POST";

      if (isEditMode) {
        url = `https://api-nasnus.vercel.app/api/update-mak/${selectedRowKey}`;
        method = "PUT";
        updatedFormData = { ...updatedFormData, id: selectedRowKey };
      } else {
        delete updatedFormData.id;
      }
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const result = await response.json();
      if (response.ok) {
        if (isEditMode) {
          setDataDebitur((prevData) =>
            prevData.map((item) =>
              item.id === selectedRowKey
                ? { ...item, ...updatedFormData }
                : item
            )
          );
        } else {
          const newData = { ...updatedFormData, id: result.id };
          setDataDebitur((prevData) => [...prevData, newData]);
        }
        alert("Data berhasil disimpan!");
        clearData();
        setFormStep(1);
        setSelectedRowKey(null);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Validasi gagal atau terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan data!");
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setShowModal(false);
    form.resetFields();
    setFormData((prev) => ({
      ...prev,
      invoiceInput: "",
      invoices: [],
      nominalInput: "",
      nominals: [],
      namaSupplierInput: "",
      namaSuppliers: [],
      userGoalInput: "",
      userGoals: [],
      photoUsaha: [],
      tableRingkasanPengajuanKredit: [],
      tableInvoicePembelian: [],
      tableBuktiTransaksiPembelian: [],
      tableHasilVerifikasiSupplier: [],
      catatanHasilSlik: [],
      slikTables: [],
      analisaList: [],
      tableLabaRugiProforma: [],
      tableNeracaProforma: [],
      tableDataAgunan: [],
      photoAgunan: [],
      tableData: [],
    }));
  };

  const handleEdit = (record) => {
    const formattedRecord = {
      ...record,
      tanggalMak: record.tanggalMak ? moment(record.tanggalMak) : null,
      tanggalSubmit: record.tanggalSubmit ? moment(record.tanggalSubmit) : null,
      tanggalEdit: record.tanggalEdit ? moment(record.tanggalEdit) : null,
    };
    form.setFieldsValue(formattedRecord);

    setFormData({
      ...record,
    });

    setFormStep(1);
    setShowModal(true);
    setSelectedRowKey(record.id);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Nama Kredit Analis (CA)",
      dataIndex: "namaUser",
      key: "namaUser",
    },
    {
      title: "Nama Marketing (AO)",
      dataIndex: "namaAccOfficer",
      key: "namaAccOfficer",
    },
    {
      title: "Nama Debitur",
      dataIndex: "namaDebitur",
      key: "namaDebitur",
    },
    {
      title: "Nomor MAK",
      dataIndex: "nomorMak",
      key: "nomorMak",
    },
    {
      title: "Tanggal MAK",
      dataIndex: "tanggalMak",
      key: "tanggalMak",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Plafon",
      dataIndex: "plafon",
      key: "plafon",
    },
    // {
    //   title: "Tanggal Submit",
    //   dataIndex: "tanggalSubmit",
    //   key: "tanggalSubmit",
    //   render: (text) => moment(text).format("DD-MM-YYYY"),
    // },
    {
      title: "Tanggal Edit",
      dataIndex: "tanggalEdit",
      key: "tanggalEdit",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleEdit(record)}
          style={{ fontSize: "14px" }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const onRowClick = (record) => {
    setSelectedRowKey(record.id); // Store selected row key
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return <Step1 form={form} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      case 6:
        return <Step6 formData={formData} setFormData={setFormData} />;
      case 7:
        return <Step7 formData={formData} setFormData={setFormData} />;
      case 8:
        return <Step8 form={form} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {handleAccessCheck() ? (
        <>
          {isLoading ? (
            <Spin tip="Loading...">
              {" "}
              {/* Menampilkan indikator loading */}
              <div style={{ height: 200 }} />{" "}
              {/* Area untuk memastikan Spinner tampil dengan baik */}
            </Spin>
          ) : (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div className="header-user-container">
                    <Button
                      type="primary"
                      onClick={() => {
                        setSelectedRowKey(null);
                        setShowModal(true);
                      }}
                    >
                      Tambah Data
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (selectedRowKey) {
                          const selectedRow = dataDebitur.find(
                            (item) => item.id === selectedRowKey
                          );
                          handleExportToPDF(selectedRow);
                        } else {
                          alert("Please select a row to export.");
                        }
                      }}
                      style={{
                        backgroundColor: "#800000",
                        borderColor: "#800000",
                      }}
                    >
                      Export to PDF
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (Array.isArray(dataDebitur)) {
                          handleExportToExcel(dataDebitur);
                        } else {
                          alert("Data Debitur is not an array.");
                        }
                      }}
                      style={{
                        backgroundColor: "#006400",
                        borderColor: "#006400",
                      }}
                    >
                      Export to Excel
                    </Button>
                  </div>
                </div>

                <Table
                  columns={columns}
                  dataSource={dataDebitur}
                  rowKey="id"
                  onRow={(record) => ({
                    onClick: () => onRowClick(record),
                    style: {
                      backgroundColor:
                        selectedRowKey === record.id ? "#e6f7ff" : "",
                    },
                  })}
                  rowClassName={(record) =>
                    record.id === selectedRowKey ? "selected-row" : ""
                  }
                  pagination={{
                    pageSize: 10,
                    onChange: (page, pageSize) => {
                      console.log(`Page: ${page}, PageSize: ${pageSize}`);
                    },
                  }}
                />
              </div>

              <Modal
                title={
                  formStep === 1
                    ? "Data Debitur"
                    : formStep === 2
                    ? "Ringkasan Pengajuan Kredit"
                    : formStep === 3
                    ? "I.   ANALISA KUALITATIF"
                    : formStep === 4
                    ? "II.  ANALISA KUANTITATIF"
                    : formStep === 5
                    ? ""
                    : formStep === 6
                    ? ""
                    : formStep === 7
                    ? ""
                    : formStep === 8
                    ? ""
                    : ""
                }
                visible={showModal}
                closable={false}
                footer={null}
                width={1200}
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ marginBottom: "20px" }}
                >
                  {renderFormStep()}
                  <Form.Item
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    {formStep === 1 ? (
                      <>
                        <Button
                          onClick={() => {
                            clearData();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={handleNextStep}
                        >
                          Next
                        </Button>
                      </>
                    ) : formStep === 2 ||
                      formStep === 3 ||
                      formStep === 4 ||
                      formStep === 5 ||
                      formStep === 6 ||
                      formStep === 7 ||
                      formStep === 8 ? (
                      <>
                        <Button
                          onClick={() => {
                            setFormStep(1);
                            clearData();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={handleBackStep}
                        >
                          Previous
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={formStep === 8 ? handleSave : handleNextStep}
                        >
                          {formStep === 8 ? "Submit" : "Next"}
                        </Button>
                      </>
                    ) : null}
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Title level={4}>
            User '{userRole}' tidak memiliki akses untuk membuka menu ini!
          </Title>
          <div style={{ fontSize: "30px" }}>😞</div>
        </div>
      )}
    </div>
  );
};

export default CetakMak;
