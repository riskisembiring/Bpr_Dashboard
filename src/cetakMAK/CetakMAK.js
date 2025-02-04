import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Table, Modal } from "antd";
import moment from "moment";
import { jsPDF } from "jspdf";  // Import jsPDF
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

  useEffect(() => {
    const storedData = localStorage.getItem("formMarketingData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDataDebitur(parsedData);
    }
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

  const handleSave = () => {
    const values = form.getFieldsValue();
    const updatedFormData = { ...formData, ...values };

    const storedData = localStorage.getItem("formMarketingData");
    let newData = storedData ? JSON.parse(storedData) : [];
    newData.push(updatedFormData);
    localStorage.setItem("formMarketingData", JSON.stringify(newData));

    setDataDebitur(newData);

    alert("Data berhasil disimpan ke localStorage!");
    setShowModal(false);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Customizing the title and table
    doc.setFontSize(18);
    doc.text("Data Debitur", 14, 16); // Title

    doc.autoTable({
      head: [["Nama Debitur", "Nomor MAK", "Tanggal MAK"]],
      body: dataDebitur.map((data) => [
        data.namaDebitur,
        data.nomorMak,
        moment(data.tanggalMak).format("DD-MM-YYYY"),
      ]),
      startY: 20,
      theme: "grid",
    });

    // Save the generated PDF
    doc.save("data_debitur.pdf");
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
            <Button type="primary" onClick={() => setShowModal(true)} style={{ marginRight: "10px" }}>
              Tambah Data
            </Button>
            <Button type="primary" onClick={handleExportToPDF}>
              Export to PDF
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={dataDebitur} rowKey="nama" pagination={false} />
      </div>

      <Modal
        title="Form Data Debitur"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        closable={false}
        width={1200}
      >
        <Form form={form} layout="vertical" style={{ marginBottom: "20px" }}>
          {renderFormStep()}
          <Form.Item style={{ display: 'flex', justifyContent: 'right' }}>
            {formStep === 3 ? (
              <>
                <Button type="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button 
                  style={{ marginLeft: "10px" }} 
                  onClick={() => { 
                    setFormStep(1);
                    setShowModal(false); 
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" onClick={handleNextStep}>
                  Next
                </Button>
                {formStep > 1 && (
                  <Button 
                    style={{ marginLeft: "10px" }} 
                    onClick={handleBackStep} // Back button for step 2 and 3
                  >
                    Back
                  </Button>
                )}
              </>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CetakMak;
