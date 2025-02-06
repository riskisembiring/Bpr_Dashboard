import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Table, Modal } from "antd";
import moment from "moment";
import { handleExportToPDF } from "./PdfDebitur";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "../styles/CetakMak.css";

const { Title } = Typography;

const CetakMak = () => {
  const [form] = Form.useForm();
  const [dataDebitur, setDataDebitur] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedRowKey, setSelectedRowKey] = useState(null); // Default selected row key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-nasnus.vercel.app/api/data-mak");
        const result = await response.json();
        if (response.ok) {
          setDataDebitur(result.data);
          if (result.data.length > 0) {
            setSelectedRowKey(result.data[0].nomorMak); // Set default selected row
          }
        } else {
          console.error("Failed to fetch data:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      const response = await fetch("https://api-nasnus.vercel.app/api/data-mak", {
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
        return <Step2 form={form} />;
      case 3:
        return <Step3 form={form} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4}>Daftar Data</Title>
          <div>
            <Button
              type="primary"
              onClick={() => setShowModal(true)}
              style={{ marginRight: "10px" }}
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
            ? "Form Data Debitur"
            : formStep === 2
            ? "Form Ringkasan Pengajuan Kredit"
            : "Form Analisa Kredit"
        }
        visible={showModal}
        closable={false}
        footer={null}
        width={1200}
      >
        <Form form={form} layout="vertical" style={{ marginBottom: "20px" }}>
          {renderFormStep()}
          <Form.Item style={{ display: "flex", justifyContent: "right" }}>
            {formStep === 1 ? (
              <>
                <Button
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary"style={{ marginLeft: "10px" }} onClick={handleNextStep}>
                  Next
                </Button>
              </>
            ) : formStep === 2 || formStep === 3 ? (
              <>
                <Button                 
                  onClick={() => {
                    setFormStep(1);
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button style={{ marginLeft: "10px" }}
                  onClick={handleBackStep}
                >
                  Previous
                </Button>
                <Button type="primary" style={{ marginLeft: "10px" }} onClick={formStep === 3 ? handleSave : handleNextStep}>
                  {formStep === 3 ? "Submit" : "Next"}
                </Button>
              </>
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CetakMak;
