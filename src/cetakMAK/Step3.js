import React from "react";
import { Form, Radio } from "antd";

const Step3 = ({ form }) => {
  return (
    <>
      <Form.Item label="Jenis Kredit" name="jenisKredit">
        <Radio.Group>
          <Radio value="konsumtif">Konsumtif</Radio>
          <Radio value="modalKerja">Modal Kerja</Radio>
          <Radio value="investasi">Investasi</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default Step3;
