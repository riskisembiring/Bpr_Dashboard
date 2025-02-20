import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Table, Modal, Spin } from "antd";
import moment from "moment";
import { handleExportToPDF } from "./PdfDebitur";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import "../styles/CetakMak.css";

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
    invoiceInput: "",
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
            setSelectedRowKey(result.data[0].nomorMak);
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

  const handleNextStep = () => {
    const values = form.getFieldsValue();
    setFormData((prevData) => ({
      ...prevData,
      ...values,
    }));
    setFormStep(formStep + 1);
  };

  const handleBackStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSave = async () => {
    const values = form.getFieldsValue();
    const updatedFormData = { ...formData, ...values };

    try {
      const response = await fetch("http://localhost:3000/api/data-mak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const result = await response.json();

      if (response.ok) {
        setDataDebitur((prevData) => [...prevData, updatedFormData]);
        alert("Data berhasil disimpan!");
        setShowModal(false);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data!");
    }
  };

  const columns = [
    {
      title: "Nama User",
      dataIndex: "namaUser",
      key: "namaUser",
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
  ];

  const onRowClick = (record) => {
    setSelectedRowKey(record.nomorMak); // Store selected row key
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
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Title
                    level={5}
                    style={{ flex: 1, fontSize: "16px", margin: 0 }}
                  >
                    Daftar Data Debitur
                  </Title>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                      marginTop: "8px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => setShowModal(true)}
                      style={{
                        marginRight: "10px",
                        fontSize: "14px",
                        padding: "6px 12px",
                      }}
                    >
                      Tambah Data
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (selectedRowKey) {
                          const selectedRow = dataDebitur.find(
                            (item) => item.nomorMak === selectedRowKey
                          );
                          handleExportToPDF(selectedRow);
                        } else {
                          alert("Please select a row to export.");
                        }
                      }}
                      style={{ fontSize: "14px", padding: "6px 12px" }}
                    >
                      Export to PDF
                    </Button>
                  </div>
                </div>

                <Table
                  columns={columns}
                  dataSource={dataDebitur}
                  rowKey="nomorMak"
                  pagination={false}
                  onRow={(record) => ({
                    onClick: () => onRowClick(record),
                  })}
                  rowClassName={(record) =>
                    record.nomorMak === selectedRowKey ? "selected-row" : ""
                  }
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
                              tableRekapitulatif: [],
                              tableRekapitulatif2: [],
                              tableAnalisaRekKoran: [],
                              tableAnalisaRekKoran2: [],
                              tableAnalisaRekKoran3: [],
                              tableLabaRugiProforma: [],
                              tableNeracaProforma: [],
                              tableDataAgunan: [],
                              photoAgunan: [],
                              tableData: [],
                              signature: null,
                            }));
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
                            form.resetFields();
                            setFormStep(1);
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
                              tableRekapitulatif: [],
                              tableRekapitulatif2: [],
                              tableAnalisaRekKoran: [],
                              tableAnalisaRekKoran2: [],
                              tableAnalisaRekKoran3: [],
                              tableLabaRugiProforma: [],
                              tableNeracaProforma: [],
                              tableDataAgunan: [],
                              tableData: [],
                              photoAgunan: [],
                              signature: null,
                            }));
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
