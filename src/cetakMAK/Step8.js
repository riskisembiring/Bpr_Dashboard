import React, { useState } from "react";
import { Form, Input, DatePicker } from "antd";
import { NumericFormat } from "react-number-format";
import dayjs from 'dayjs';

const Step8 = ({ formData, setFormData }) => {
  const [nominal, setNominal] = useState("");

  const handleNominalChange = (value) => {
    setNominal(value);
  };

  return (
    <>
      <h3>4. Legalitas Usaha / Pekerjaan</h3>
      <Form.Item
        label="Legalitas Usaha / Pekerjaan"
        name="legalitasUsaha"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
      }}
        rules={[{ required: true, message: "Legalitas Usaha / Pekerjaan wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Legalitas Usaha / Pekerjaan" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={300}/>
      </Form.Item>
      <h3>5. Kesimpulan & Rekomendasi</h3>
      <Form.Item
        label="Faktor Positif"
        name="faktorPositif"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
      }}
        rules={[{ required: true, message: "Faktor Positif wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Legalitas Faktor Positif" autoSize={{ minRows: 4, maxRows: 8 }}/>
      </Form.Item>

      <Form.Item
        label="Faktor Negatif & Mitigasi"
        name="faktorNegatifMitigasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
      }}
        rules={[{ required: true, message: "Faktor Negatif & Mitigasi wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Faktor Faktor Negatif & Mitigasi" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={300}/>
      </Form.Item>

      <Form.Item
        label="Rekomendasi"
        name="rekomendasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
        }}
        rules={[{ required: true, message: "Rekomendasi wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Rekomendasi" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={100}/>
      </Form.Item>

      <Form.Item
        label="Persyaratan Sebelum Akad"
        name="persyaratanSebelumAkad"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
        }}
        rules={[{ required: true, message: "Persyaratan Sebelum Akad wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Persyaratan Sebelum Akad" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={100}/>
      </Form.Item>

      <Form.Item
        label="Persyaratan Saat Akad"
        name="persyaratanSaatAkad"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
        }}
        rules={[{ required: true, message: "Persyaratan Saat Akad wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Persyaratan Saat Akad" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={100}/>
      </Form.Item>

      <Form.Item
        label="Deviasi"
        name="deviasi"
        getValueProps={(value) => ({ value: (value || []).join("\n") })}
        getValueFromEvent={(e) => {
          const lines = e.target.value.split("\n").filter((line) => line.trim() !== "");
          return lines.length > 0 ? lines : undefined;
        }}
        rules={[{ required: true, message: "Deviasi wajib di isi!" }]}
      >
        <Input.TextArea placeholder="Masukkan Deviasi" autoSize={{ minRows: 4, maxRows: 8 }} maxLength={100}/>
      </Form.Item>

      <h3>6. Struktur Kredit</h3>
        <div className="form-item">
          <Form.Item label="Plafon" name="plafon" rules={[
              {
                required: true,
                message: "Plafon wajib di isi",
              },
            ]}>
            <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Bunga" name="bunga" rules={[
            {
              required: true,
              message: "Bunga wajib dipilih",
            },
          ]}>
            <Input placeholder="Masukkan Bunga" maxLength={100}/>
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Tenor" name="tenor" rules={[
            {
              required: true,
              message: "Tenor wajib dipilih",
            },
          ]}>
            <Input placeholder="Masukkan Tenor" maxLength={100}/>
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Provisi" name="provisi" rules={[
            {
              required: true,
              message: "Provisi wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Admin" name="admin" rules={[
            {
              required: true,
              message: "Admin wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Asuransi jiwa" name="asuransiJiwa" rules={[
            {
              required: true,
              message: "Asuransi jiwa wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Asuransi Kebakaran" name="asuransiKebakaran" rules={[
            {
              required: true,
              message: "Asuransi Kebakaran wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Biaya Notaris" name="biayaNotaris" rules={[
            {
              required: true,
              message: "Biaya Notaris wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item label="Angsuran" name="angsuran" rules={[
            {
              required: true,
              message: "Angsuran wajib dipilih",
            },
          ]}>
          <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              className="responsive-input"
              renderText={(value) => (
                <Input value={value} className="nominal-input" />
              )}
            />
          </Form.Item>
        </div>

        <div className="form-item" style={{ display: 'none' }}>
        <Form.Item label="Tanggal Submit" name="tanggalSubmit" >
          <DatePicker disabled value={dayjs()} />
        </Form.Item>
        </div>

         <div className="form-item" style={{ display: 'none' }}>
           <Form.Item label="Tanggal Edit" name="tanggalEdit">
             <DatePicker disabled value={dayjs()} />
           </Form.Item>
         </div>
    </>
  );
};

export default Step8;
