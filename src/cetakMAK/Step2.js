import React from "react";
import { Form, Input } from "antd";
import "../styles/Step2.css";
const Step2 = ({ form }) => {
  return (
    <div className="form-table">
      <div className="form-row">
        <div className="form-item">
          <Form.Item label="Plafon" name="plafon">
            <Input placeholder="Masukkan Plafon" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Suku Bunga" name="sukuBunga">
            <Input placeholder="Masukkan bunga" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Tenor" name="tenor">
            <Input placeholder="Masukkan tenor" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Biaya Provinsi" name="biayaProvinsi">
            <Input placeholder="Masukkan biaya provinsi" />
          </Form.Item>
        </div>
      </div>
      <div className="form-row">
        <div className="form-item">
          <Form.Item label="Biaya Adm" name="biayaAdm">
            <Input placeholder="Masukkan biaya Adm" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Nilai Pasar" name="nilaiPasar">
            <Input placeholder="Masukkan nilai pasar" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Nilai Likuiditas" name="nilaiLikuiditas">
            <Input placeholder="Masukkan nilai likuiditas" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Angsuran Bulan" name="angsuranBulan">
            <Input placeholder="Masukkan angsuran/bulan" />
          </Form.Item>
        </div>
        <div className="form-row">
        <div className="form-item" style={{ width: "100%" }}>
          <Form.Item label="Dasar Rekomendasi Account Officer" name="dasarRekomendasiAccOff">
            <Input.TextArea placeholder="Masukkan dasar rekomendasi account officer" />
          </Form.Item>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Step2;
