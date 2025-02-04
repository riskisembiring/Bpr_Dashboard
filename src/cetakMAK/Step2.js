import React from "react";
import { Form, Input } from "antd";

const Step2 = ({ form }) => {
  return (
    <>
      <Form.Item label="Nama Account Officer" name="namaAccOfficer">
        <Input placeholder="Masukkan nama Account Officer" style={{ textTransform: 'uppercase' }} />
      </Form.Item>
      <Form.Item label="No.Telp Debitur" name="noTelpDeb">
        <Input placeholder="Masukkan no Telp Debitur" />
      </Form.Item>
    </>
  );
};

export default Step2;
