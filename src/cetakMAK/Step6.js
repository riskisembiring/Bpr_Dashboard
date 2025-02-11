import React, { useState } from "react";
import { Form, Input, Button, List } from "antd";

const Step5 = ({ form }) => {
  return (
    <div>
      <h3>7. Kesimpulan & Rekomendasi</h3>
        <Form.Item label="Faktor Positif" name="faktorPositif">
            <Input placeholder="Masukkan Faktor Positif" />
        </Form.Item>
        <Form.Item label="Faktor Negatif & Mitigasi" name="faktorNegatifMitigasi">
            <Input placeholder="Masukkan Faktor Negatif & Mitigasi" />
        </Form.Item>
        <Form.Item label="Rekomendasi" name="rekomendasi">
            <Input placeholder="Masukkan Rekomendasi" />
        </Form.Item>
        <Form.Item label="Persyaratan Sebelum Akad" name="persyaratanSebelumAkad">
            <Input placeholder="Masukkan Persyaratan Sebelum Akad" />
        </Form.Item>
        <Form.Item label="Persyaratan Saat Akad" name="persyaratanSaatAkad">
            <Input placeholder="Masukkan Persyaratan Saat Akad" />
        </Form.Item>
        <Form.Item label="Devias" name="deviasi">
            <Input placeholder="Masukkan Devias" />
        </Form.Item>

        <h3>8. Struktur Kredit</h3>
        <Form.Item label="Plafon" name="plafonKredit">
            <Input placeholder="Masukkan Plafon" />
        </Form.Item>
        <Form.Item label="Bunga" name="bungaKredit">
            <Input placeholder="Masukkan Bunga" />
        </Form.Item>
        <Form.Item label="Tenor" name="tenorKredit">
            <Input placeholder="Masukkan Tenor" />
        </Form.Item>
        <Form.Item label="Provisi" name="provisiKredit">
            <Input placeholder="Masukkan Provisi" />
        </Form.Item>
        <Form.Item label="Admin" name="adminKredit">
            <Input placeholder="Masukkan Admin" />
        </Form.Item>
        <Form.Item label="Asuransi Jiwa" name="asuransiJiwaKredit">
            <Input placeholder="Masukkan Asuransi Jiwa" />
        </Form.Item>
        <Form.Item label="Asuransi Kebakaran" name="asuransiKebakaranKredit">
            <Input placeholder="Masukkan Asuransi Kebakaran" />
        </Form.Item>
        <Form.Item label="Biaya Notaris" name="biayaNotarisKredit">
            <Input placeholder="Masukkan Biaya Notaris" />
        </Form.Item>
        <Form.Item label="Angsuran" name="angsuranKredit">
            <Input placeholder="Masukkan Angsuran" />
        </Form.Item>
    </div>
  );
};
export default Step5;
