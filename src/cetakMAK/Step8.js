import React, { useState, useEffect } from "react";
import { Form, Table, Input, Button, Space, Upload, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const Step8 = ({ formData, setFormData }) => {
  return (
    <>
      <h3>4. Legalitas Usaha / Pekerjaan</h3>
      <Form.Item
        label="Legalitas Usaha / Pekerjaan"
        name="legalitasUsaha"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Legalitas Usaha / Pekerjaan" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>
      <h3>5. Kesimpulan & Rekomendasi</h3>
      <Form.Item
        label="Faktor Positif"
        name="faktorPositif"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Legalitas Faktor Positif" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Faktor Negatif & Mitigasi"
        name="faktorNegatifMitigasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Faktor Faktor Negatif & Mitigasi" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Rekomendasi"
        name="rekomendasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Rekomendasi" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Persyaratan Sebelum Akad"
        name="persyaratanSebelumAkad"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Persyaratan Sebelum Akad" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Persyaratan Saat Akad"
        name="persyaratanSaatAkad"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Persyaratan Saat Akad" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Deviasi"
        name="deviasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => e.target.value.split("\n")}
      >
        <Input.TextArea placeholder="Masukkan Deviasi" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <h3>6. Struktur Kredit</h3>
        <div className="form-item">
          <Form.Item label="Plafon" name="plafon">
            <Input placeholder="Masukkan Plafon" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Bunga" name="bunga">
            <Input placeholder="Masukkan Bunga" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Tenor" name="tenor">
            <Input placeholder="Masukkan Tenor" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Provisi" name="provisi">
            <Input placeholder="Masukkan Biaya provisi" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Admin" name="admin">
            <Input placeholder="Masukkan Biaya Admin" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Asuransi jiwa" name="asuransiJiwa">
            <Input placeholder="Masukkan Asuransi jiwa" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Asuransi Kebakaran" name="asuransiKebakaran">
            <Input placeholder="Masukkan Asuransi Kebakaran" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Biaya Notaris" name="biayaNotaris">
            <Input placeholder="Masukkan Biaya Notaris" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Angsuran" name="angsuran">
            <Input placeholder="Masukkan Angsuran" />
          </Form.Item>
        </div>
    </>
  );
};

export default Step8;
