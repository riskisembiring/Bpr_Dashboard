import React, { useState } from "react";
import { Table, Input, Button, Form, Collapse } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";

const { Panel } = Collapse;

const Step5 = ({ formData, setFormData }) => {
  const [analisaList, setAnalisaList] = useState(
    formData.analisaList || [
      // {
      //   key: "1",
      //   rekeningKoranBank: "",
      //   noRekening: "",
      //   atasNama: "",
      //   periode: "",
      //   tableData: [],
      // },
    ]
  );

  const handleInputChange = (value, analisaKey, rowKey, column) => {
    const updatedList = analisaList.map((analisa) => {
      if (analisa.key === analisaKey) {
        const updatedData = analisa.tableData.map((row) =>
          row.key === rowKey ? { ...row, [column]: value } : row
        );
        return { ...analisa, tableData: updatedData };
      }
      return analisa;
    });
    setAnalisaList(updatedList);
    setFormData({ ...formData, analisaList: updatedList });
  };

  const addAnalisa = () => {
    const newKey = (analisaList.length + 1).toString();
    const newAnalisa = {
      key: newKey,
      rekeningKoranBank: "",
      noRekening: "",
      atasNama: "",
      periode: "",
      tableData: [],
    };
    const updatedList = [...analisaList, newAnalisa];
    setAnalisaList(updatedList);
    setFormData({ ...formData, analisaList: updatedList });
  };

  const addRow = (analisaKey) => {
    const updatedList = analisaList.map((analisa) => {
      if (analisa.key === analisaKey) {
        const newRow = {
          key: (analisa.tableData.length + 1).toString(),
          bulan: "",
          mutasiDebet: "",
          qty1: "",
          mutasiKredit: "",
          qty2: "",
          saldoRataRata: "",
        };
        return { ...analisa, tableData: [...analisa.tableData, newRow] };
      }
      return analisa;
    });
    setAnalisaList(updatedList);
    setFormData({ ...formData, analisaList: updatedList });
  };

  const removeRow = (analisaKey, rowKey) => {
    const updatedList = analisaList.map((analisa) => {
      if (analisa.key === analisaKey) {
        const filteredData = analisa.tableData.filter((row) => row.key !== rowKey);
        return { ...analisa, tableData: filteredData };
      }
      return analisa;
    });
    setAnalisaList(updatedList);
    setFormData({ ...formData, analisaList: updatedList });
  };

  const columns = (analisaKey) => [
    {
      title: "Bulan",
      dataIndex: "bulan",
      render: (text, record) => (
        <Input
          value={record.bulan}
          placeholder="Masukkan Bulan"
          onChange={(e) => handleInputChange(e.target.value, analisaKey, record.key, "bulan")}
        />
      ),
    },
    {
      title: "Mutasi Debet",
      dataIndex: "mutasiDebet",
      render: (text, record) => (
        <NumericFormat
          value={record.mutasiDebet}
          placeholder="Masukkan Mutasi Debet"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, analisaKey, record.key, "mutasiDebet")}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty1",
      render: (text, record) => (
        <NumericFormat
          value={record.qty1}
          placeholder="Masukkan Qty"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, analisaKey, record.key, "qty1")}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Mutasi Kredit",
      dataIndex: "mutasiKredit",
      render: (text, record) => (
        <NumericFormat
          value={record.mutasiKredit}
          placeholder="Masukkan Mutasi Kredit"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, analisaKey, record.key, "mutasiKredit")}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty2",
      render: (text, record) => (
        <NumericFormat
          value={record.qty2}
          placeholder="Masukkan Qty"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, analisaKey, record.key, "qty2")}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Saldo Rata-Rata",
      dataIndex: "saldoRataRata",
      render: (text, record) => (
        <NumericFormat
          value={record.saldoRataRata}
          placeholder="Masukkan Saldo Rata-Rata"
          thousandSeparator="."
          decimalSeparator="," 
          onValueChange={(values) => handleInputChange(values.value, analisaKey, record.key, "saldoRataRata")}
          className="responsive-input"
        />
      ),
    },
    {
      title: "Aksi",
      render: (_, record) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => removeRow(analisaKey, record.key)}>
          Hapus
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h4>2. ANALISA REKENING KORAN</h4>
      <Button type="primary" icon={<PlusOutlined />} onClick={addAnalisa} style={{ marginBottom: "16px" }}>
        Tambah Analisa
      </Button>
      <Collapse accordion>
        {analisaList.map((analisa) => (
          <Panel header={`Analisa ${analisa.key}`} key={analisa.key}>
            <Form layout="vertical">
              <Form.Item label="Rekening Koran Bank">
                <Input
                  value={analisa.rekeningKoranBank}
                  placeholder="Masukkan Rekening Koran Bank"
                  onChange={(e) => {
                    const updatedList = analisaList.map((item) =>
                      item.key === analisa.key ? { ...item, rekeningKoranBank: e.target.value } : item
                    );
                    setAnalisaList(updatedList);
                    setFormData({ ...formData, analisaList: updatedList });
                  }}
                />
              </Form.Item>
              <Form.Item label="No. Rekening">
                <Input
                  value={analisa.noRekening}
                  placeholder="Masukkan No. Rekening"
                  onChange={(e) => {
                    const updatedList = analisaList.map((item) =>
                      item.key === analisa.key ? { ...item, noRekening: e.target.value } : item
                    );
                    setAnalisaList(updatedList);
                    setFormData({ ...formData, analisaList: updatedList });
                  }}
                />
              </Form.Item>
              <Form.Item label="Atas Nama">
                <Input
                  value={analisa.atasNama}
                  placeholder="Masukkan Atas Nama"
                  onChange={(e) => {
                    const updatedList = analisaList.map((item) =>
                      item.key === analisa.key ? { ...item, atasNama: e.target.value } : item
                    );
                    setAnalisaList(updatedList);
                    setFormData({ ...formData, analisaList: updatedList });
                  }}
                />
              </Form.Item>
              <Form.Item label="Periode">
                <Input
                  value={analisa.periode}
                  placeholder="Masukkan Periode"
                  onChange={(e) => {
                    const updatedList = analisaList.map((item) =>
                      item.key === analisa.key ? { ...item, periode: e.target.value } : item
                    );
                    setAnalisaList(updatedList);
                    setFormData({ ...formData, analisaList: updatedList });
                  }}
                />
              </Form.Item>
            </Form>
            <Table
              columns={columns(analisa.key)}
              dataSource={analisa.tableData}
              pagination={false}
              bordered
              scroll={{ x: "max-content" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addRow(analisa.key)}
              style={{ marginTop: "8px" }}
            >
              Tambah Data
            </Button>
          </Panel>
        ))}
      </Collapse>
      <br></br>
    </div>
  );
};

export default Step5;
