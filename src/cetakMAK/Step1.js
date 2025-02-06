import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Card, DatePicker, Radio } from "antd";
import { NumericFormat } from 'react-number-format';

const Step1 = ({ form }) => {
  const [nominal, setNominal] = useState("");

  <NumericFormat
    value={nominal}
    thousandSeparator="."
    decimalSeparator=","
    prefix="Rp "
    onValueChange={(values) => handleNominalChange(values.value)}
    renderText={(value) => <Input value={value} />}
  />

  const handleNominalChange = (value) => {
    setNominal(value);
  };

  return (
    <>
      <Row gutter={16}>
      <Col span={12}>
      <Form.Item
            label="Nama Debitur"
            name="namaDebitur"
            // rules={[{ required: true, message: "Harap masukkan nama debitur Anda!" }]}
          >
            <Input placeholder="Masukkan Nama Debitur" style={{textTransform: 'uppercase'}}/>
          </Form.Item>
          <Form.Item
            label="Nomor MAK"
            name="nomorMak"
            // rules={[{ required: true, message: "Harap masukkan no MAK!" }]}
          >
            <Input placeholder="Masukkan nomor MAK" rows={3} style={{textTransform: 'uppercase'}}/>
          </Form.Item>
          <Form.Item
            label="Tanggal MAK"
            name="tanggalMak"
            // rules={[{ required: true, message: "Harap masukkan tanggal MAK!" }]}
          >
             <DatePicker 
              format="DD-MM-YYYY" 
              placeholder="Pilih tanggal MAK" 
              style={{ width: "100%" }} 
            />
          </Form.Item>
          <Form.Item
            label="Nama Account Officer"
            name="namaAccOfficer"
            // rules={[{ required: true, message: "Harap masukkan nama Account Officer!" }]}
          >
            <Input placeholder="Masukkan nama Account Officer" style={{textTransform: 'uppercase'}}/>
          </Form.Item>
          <Form.Item
            label="No.Telp Debitur"
            name="noTelpDeb"
            // rules={[{ required: true, message: "Harap masukkan no Telp Debitur!" }]}
          >
            <Input placeholder="Masukkan no Telp Debitur" onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
          </Form.Item>
          <Form.Item
            label="No.Telp Pasangan Debitur"
            name="noTelpPasDeb"
            // rules={[{ required: true, message: "Harap masukkan no Telp Pasangan Debitur!" }]}
          >
            <Input placeholder="Masukkan no Telp Pasangan Debitur"onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
          </Form.Item>
          <Form.Item
            label="Alamat Sesuai KTP"
            name="alamatSesuaiKtp"
            // rules={[{ required: true, message: "Harap masukkan alamat Sesuai KTP!" }]}
          >
            <Input placeholder="Masukkan alamat Sesuai KTP" style={{textTransform: 'uppercase'}}/>
          </Form.Item>
          <Form.Item
            label="No.KTP"
            name="noKtp"
            // rules={[{ required: true, message: "Harap masukkan no KTP!" }]}
          >
            <Input placeholder="Masukkan no KTP"onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
          </Form.Item>
          <Form.Item
            label="No.NPWP"
            name="noNpwp"
            // rules={[{ required: true, message: "Harap masukkan no NPW!" }]}
          >
            <Input placeholder="Masukkan no NPW"onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
          </Form.Item>
          <Form.Item
          label="Status Tempat Tinggal"
          name="statusTempatTinggal"
          // rules={[{ required: true, message: "Harap masukkan status tempat tinggal!" }]}
        >
        <Radio.Group>
          <Radio value="milikSendiri">Milik Sendiri</Radio>
          <Radio value="sewaKontrak">Sewa/Kontrak</Radio>
        </Radio.Group>
      </Form.Item>
      <Card title="Data Pekerjaan" bordered={true} style={{ width: '100%' }}>
        <Form.Item
          label="Jenis Pekerjaan"
          name="jenisPekerjaan"
          // rules={[{ required: true, message: "Harap masukkan jenis Pekerjaan!" }]}
        >
          <Input placeholder="Masukkan jenis pekerjaan" style={{textTransform: 'uppercase'}}/>
        </Form.Item>

        <Form.Item
          label="Jabatan"
          name="jabatan"
          // rules={[{ required: true, message: "Harap masukkan Jabatan!" }]}
        >
          <Input placeholder="Masukkan Jabatan" style={{textTransform: 'uppercase'}}/>
        </Form.Item>

        <Form.Item
          label="Lama Bekerja"
          name="lamaBekerja"
          // rules={[{ required: true, message: "Harap masukkan lama bekerja!" }]}
        >
          <Input placeholder="Masukkan lama bekerja"onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
        </Form.Item>
        <Form.Item
          label="Status Karyawan"
          name="statusKaryawan"
          // rules={[{ required: true, message: "Harap masukkan status karyawan!" }]}
        >
          <Input placeholder="Masukkan status karyawan" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
      </Card>
        <Form.Item
          label="Keterkaitan dengan BPR"
          name="keterkaitandgnBpr"
          // rules={[{ required: true, message: "Pilih Keterkaitan dengan BPR!" }]}
        >
          <Radio.Group>
            <Radio value="terkait">Terkait</Radio>
            <Radio value="tidakTerkait">Tidak Terkait</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Status Pembiayaan"
          name="statusPembiayaan"
          // rules={[{ required: true, message: "Pilih Status Pembiayaan!" }]}
        >
          <Radio.Group>
            <Radio value="sendiri">Sendiri</Radio>
            <Radio value="sindikasi">Sindikasi</Radio>
          </Radio.Group>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          label="Jenis Kredit"
          name="jenisKredit"
          // rules={[{ required: true, message: "Pilih Jenis Kredit!" }]}
        >
          <Radio.Group>
            <Radio value="konsumtif">Konsumtif</Radio>
            <Radio value="modalKerja">Modal Kerja</Radio>
            <Radio value="investasi">Investasi</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Jenis Pengajuan Kredit"
          name="jenisPengajuanKredit"
          // rules={[{ required: true, message: "Pilih Jenis Pengajuan!" }]}
        >
          <Radio.Group>
            <Radio value="baru">Baru</Radio>
            <Radio value="repeatOrder">Repeat Order</Radio>
            <Radio value="topUp">Top Up</Radio>
            <Radio value="restrukturisasi">Restrukturisasi</Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item
          label="Nominal Pengajuan"
          name="nominalPengajuan"
          // rules={[{ required: true, message: "Harap masukkan nominal pengajuan!" }]}
        >
            <NumericFormat
              value={nominal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              onValueChange={(values) => handleNominalChange(values.value)}
              renderText={(value) => <Input value={value} />}
            />
          </Form.Item>
          <Form.Item
          label="Jenis Jaminan"
          name="jenisJaminan"
          // rules={[{ required: true, message: "Pilih Jenis Jaminan!" }]}
        >
        <Radio.Group>
          <Radio value="shm">SHM</Radio>
          <Radio value="shgb">SHGB</Radio>
          <Radio value="lainnya">Lainnya</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
          label="Jenis Pekerjaan Debtur"
          name="jenisPekerjaanDebt"
          // rules={[{ required: true, message: "Pilih Jenis Pekerjaan Debtur!" }]}
        >
        <Radio.Group>
          <Radio value="karyawan">Karyawan</Radio>
          <Radio value="wiraswasta">Wiraswasta</Radio>
          <Radio value="Profesi">Profesi</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
          label="Jenis Pekerjaan Pasangan"
          name="jenisPekerjaanPasangan"
          // rules={[{ required: true, message: "Pilih Jenis Pekerjaan Pasangan!" }]}
        >
        <Radio.Group>
          <Radio value="karyawan">Karyawan</Radio>
          <Radio value="wiraswasta">Wiraswasta</Radio>
          <Radio value="tidakBekerja">Tidak Bekerja</Radio>
          <Radio value="Profesi">Profesi</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
          label="Alamat Domisili (Jika tidak sesuai KTP)"
          name="alamatDomisili"
          // rules={[{ required: true, message: "Harap masukkan Alamat Domisili!" }]}
        >
          <Input placeholder="Masukkan Alamat Domisili" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Form.Item
          label="Alamat Jaminan"
          name="alamatJaminan"
          // rules={[{ required: true, message: "Harap masukkan Alamat Jaminan!" }]}
        >
          <Input placeholder="Masukkan Alamat Jaminan" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Form.Item
          label="Nama Perusaahan/Usaha"
          name="namaPerusahaanUsaha"
          // rules={[{ required: true, message: "Harap masukkan Nama Perusaahan/Usaha!" }]}
        >
          <Input placeholder="Masukkan Nama Perusaahan/Usaha" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Form.Item
          label="Alamat Perusaahan/Usaha"
          name="alamatPerusahaanUsaha"
          // rules={[{ required: true, message: "Harap masukkan Alamat Perusaahan/Usaha!" }]}
        >
          <Input placeholder="Masukkan Alamat Perusaahan/Usaha" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Card title="Data Usaha" bordered={true} style={{ width: '100%' }}>
      <Form.Item
          label="Jenis Usaha"
          name="jenisUsaha"
          // rules={[{ required: true, message: "Harap masukkan jenis Usaha!" }]}
        >
          <Input placeholder="Masukkan jenis Usaha" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Form.Item
          label="Bentuk Usaha"
          name="bentukUsaha"
          // rules={[{ required: true, message: "Harap masukkan Bentuk Usaha!" }]}
        >
          <Input placeholder="Masukkan Bentuk Usaha" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        <Form.Item
          label="Lama Usaha"
          name="lamaUsaha"
          // rules={[{ required: true, message: "Harap masukkan Lama Usaha!" }]}
        >
          <Input placeholder="Masukkan Lama Usaha" onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
        </Form.Item>
        <Form.Item
          label="Status Tempat Usaha"
          name="statusTempatUsaha"
          // rules={[{ required: true, message: "Harap masukkan Status Tempat Usaha!" }]}
        >
          <Input placeholder="Masukkan jenis Status Tempat Usaha" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        </Card>
        <Form.Item
          label="Tujuan Penggunaan Dana"
          name="tujuanPenggunaanDana"
          // rules={[{ required: true, message: "Harap masukkan Tujuan Penggunaan Dana!" }]}
        >
          <Input placeholder="Masukkan Tujuan Penggunaan Dana" style={{textTransform: 'uppercase'}}/>
        </Form.Item>
        </Col>
        </Row>
    </>
  );
};

export default Step1;
