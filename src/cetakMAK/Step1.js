import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Card, DatePicker, Radio } from "antd";
import { NumericFormat } from "react-number-format";

const Step1 = ({ form }) => {
  const [nominal, setNominal] = useState("");
  const [userData, setUserData] = useState(null);
  const [jenisJaminan, setJenisJaminan] = useState(''); // Untuk menangani nilai pilihan
  const [lainnya, setLainnya] = useState('');

  useEffect(() => {
    const username = localStorage.getItem("username") || "Default User";
    setUserData({ username });
  }, []);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        namaUser: userData.username,
      });
    }
  }, [userData, form]);

  const handleNominalChange = (value) => {
    setNominal(value);
  };

  const handleJenisJaminanChange = (e) => {
    const value = e.target.value;
    setJenisJaminan(value);

    // Jika memilih "Lainnya", set input tambahan
    if (value === 'lainnya') {
      form.setFieldsValue({
        jenisJaminan: lainnya, // Mengisi field jenisJaminan dengan nilai "lainnya"
      });
    } else {
      form.setFieldsValue({
        jenisJaminan: value,
      });
    }
  };
  

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        {/* Kolom Kiri */}
        <Col span={12}>
          <Form.Item
            label="Nama User"
            name="namaUser"
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Nama Debitur"
            name="namaDebitur"
          >
            <Input placeholder="Masukkan Nama Debitur" />
          </Form.Item>
  
          <Form.Item
            label="Nomor MAK"
            name="nomorMak"
          >
            <Input
              placeholder="Masukkan nomor MAK"
            />
          </Form.Item>
  
          <Form.Item
            label="Tanggal MAK"
            name="tanggalMak"
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
          >
            <Input
              placeholder="Masukkan nama Account Officer"
            />
          </Form.Item>
  
          <Form.Item
            label="No.Telp Debitur"
            name="noTelpDeb"
          >
            <Input
              placeholder="Masukkan no Telp Debitur"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
  
          <Form.Item
            label="No.Telp Pasangan Debitur"
            name="noTelpPasDeb"
          >
            <Input
              placeholder="Masukkan no Telp Pasangan Debitur"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
  
          <Form.Item
            label="Alamat Sesuai KTP"
            name="alamatSesuaiKtp"
          >
            <Input placeholder="Masukkan alamat Sesuai KTP" />
          </Form.Item>
  
          <Form.Item
            label="No.KTP"
            name="noKtp"
          >
            <Input
              placeholder="Masukkan no KTP"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
  
          <Form.Item
            label="No.NPWP"
            name="noNpwp"
          >
            <Input
              placeholder="Masukkan no NPWP"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
  
          <Form.Item
            label="Status Tempat Tinggal"
            name="statusTempatTinggal"
          >
            <Radio.Group>
              <Radio value="milikSendiri">Milik Sendiri</Radio>
              <Radio value="sewaKontrak">Sewa/Kontrak</Radio>
            </Radio.Group>
          </Form.Item>
  
          <Card title="Data Pekerjaan" bordered style={{ width: "100%" }}>
            <Form.Item
              label="Jenis Pekerjaan"
              name="jenisPekerjaan"
            >
              <Input placeholder="Masukkan jenis pekerjaan" />
            </Form.Item>
  
            <Form.Item
              label="Jabatan"
              name="jabatan"
            >
              <Input placeholder="Masukkan Jabatan" />
            </Form.Item>
  
            <Form.Item
              label="Lama Bekerja"
              name="lamaBekerja"
            >
              <Input
                placeholder="Masukkan lama bekerja"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
  
            <Form.Item
              label="Status Karyawan"
              name="statusKaryawan"
            >
              <Input placeholder="Masukkan status karyawan" />
            </Form.Item>
          </Card>
  
          <Form.Item
            label="Keterkaitan dengan BPR"
            name="keterkaitandgnBpr"
          >
            <Radio.Group>
              <Radio value="terkait">Terkait</Radio>
              <Radio value="tidakTerkait">Tidak Terkait</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Status Pembiayaan"
            name="statusPembiayaan"
          >
            <Radio.Group>
              <Radio value="sendiri">Sendiri</Radio>
              <Radio value="sindikasi">Sindikasi</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
  
        {/* Kolom Kanan */}
        <Col span={12}>
          <Form.Item
            label="Jenis Kredit"
            name="jenisKredit"
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
            style={{ width: '100%' }} // Menambahkan lebar 100% pada Form.Item
          >
          <NumericFormat
            value={nominal}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            onValueChange={(values) => handleNominalChange(values.value)}
            renderText={(value) => <Input value={value} className="nominal-input" />}  // Menggunakan class CSS
          />
          </Form.Item>
  
          <Form.Item
            label="Jenis Jaminan"
            name="jenisJaminan"
            rules={[{ required: true, message: 'Pilih Jenis Jaminan!' }]}
          >
            <Radio.Group onChange={handleJenisJaminanChange} value={jenisJaminan}>
              <Radio value="shm">SHM</Radio>
              <Radio value="shgb">SHGB</Radio>
              <Radio value="lainnya">Lainnya</Radio>
            </Radio.Group>
          </Form.Item>
  
          {jenisJaminan === 'lainnya' && (
            <Form.Item
              label="Jenis Jaminan Lainnya"
              name="jenisJaminan"
            >
              <Input
                value={lainnya}
                onChange={(e) => {
                  setLainnya(e.target.value);
                  form.setFieldsValue({
                    jenisJaminan: e.target.value,
                  });
                }}
                placeholder="Masukkan jenis jaminan lainnya"
              />
            </Form.Item>
          )}
  
          <Form.Item
            label="Jenis Pekerjaan Debitur"
            name="jenisPekerjaanDebt"
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
          >
            <Input placeholder="Masukkan Alamat Domisili" />
          </Form.Item>
  
          <Form.Item
            label="Alamat Jaminan"
            name="alamatJaminan"
          >
            <Input placeholder="Masukkan Alamat Jaminan" />
          </Form.Item>
  
          <Form.Item
            label="Nama Perusahaan/Usaha"
            name="namaPerusahaanUsaha"
          >
            <Input placeholder="Masukkan Nama Perusahaan/Usaha" />
          </Form.Item>
  
          <Form.Item
            label="Alamat Perusahaan/Usaha"
            name="alamatPerusahaanUsaha"
          >
            <Input placeholder="Masukkan Alamat Perusahaan/Usaha" />
          </Form.Item>
  
          <Card title="Data Usaha" bordered style={{ width: "100%" }}>
            <Form.Item
              label="Jenis Usaha"
              name="jenisUsaha"
            >
              <Input placeholder="Masukkan jenis Usaha" />
            </Form.Item>
  
            <Form.Item
              label="Bentuk Usaha"
              name="bentukUsaha"
            >
              <Input placeholder="Masukkan Bentuk Usaha" />
            </Form.Item>
  
            <Form.Item
              label="Lama Usaha"
              name="lamaUsaha"
            >
              <Input
                placeholder="Masukkan Lama Usaha"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
  
            <Form.Item
              label="Status Tempat Usaha"
              name="statusTempatUsaha"
            >
              <Input placeholder="Masukkan Status Tempat Usaha" />
            </Form.Item>
          </Card>
  
          <Form.Item
            label="Tujuan Penggunaan Dana"
            name="tujuanPenggunaanDana"
          >
            <Input placeholder="Masukkan Tujuan Penggunaan Dana" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Step1;
