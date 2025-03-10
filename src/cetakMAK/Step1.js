import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Card, DatePicker, Radio, Checkbox } from "antd";
import { NumericFormat } from "react-number-format";
import moment from "moment";

const Step1 = ({ form }) => {
  const [nominal, setNominal] = useState("");
  const [userData, setUserData] = useState(null);
  const [jenisJaminan, setJenisJaminan] = useState(form.getFieldValue("jenisJaminan") || "");
  const [lainnya, setLainnya] = useState(form.getFieldValue("jenisJaminanLainnya") || "");
  const [sameAddress, setSameAddress] = useState(false);
  const [sameAddressDom, setSameAddressDom] = useState(false);

  const handleCheckboxDomisilliChange = (e) => {
    const isChecked = e.target.checked;
    setSameAddress(isChecked);

    if (isChecked) {
      const ktpAddress = form.getFieldValue("alamatSesuaiKtp");
      form.setFieldsValue({ alamatDomisili: ktpAddress });
    } else {
      form.setFieldsValue({ alamatDomisili: "" });
    }
  };

  const handleCheckboxJaminanChange = (e) => {
    const isChecked = e.target.checked;
    setSameAddressDom(isChecked);

    if (isChecked) {
      const ktpAddress = form.getFieldValue("alamatSesuaiKtp");
      form.setFieldsValue({ alamatJaminan: ktpAddress });
    } else {
      form.setFieldsValue({ alamatJaminan: "" });
    }
  };

  // const handleKtpAddressChange = (e) => {
  //   if (sameAddress) {
  //     form.setFieldsValue({ alamatDomisili: e.target.value });
  //   }
  // };

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
    form.setFieldsValue({ jenisJaminan: value });

    if (value !== "Lainnya") {
      setLainnya("");
      form.setFieldsValue({ jenisJaminanLainnya: "" });
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
            style={{ display: "none" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nama Debitur"
            name="namaDebitur"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Nama Debitur wajib diisi",
              },
            ]}
          >
            <Input placeholder="Masukkan Nama Debitur" maxLength={50}/>
          </Form.Item>

          <Form.Item
            label="Nomor MAK"
            name="nomorMak"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Nomor MAK wajib diisi",
              },
            ]}
          >
            <Input placeholder="Masukkan nomor MAK" maxLength={50}/>
          </Form.Item>

          <Form.Item label="Tanggal MAK" name="tanggalMak" 
            rules={[
              {
                required: true,
                message: "Tanggal MAK wajib diisi",
              },
            ]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="Pilih tanggal MAK"
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return current && current > moment().endOf("day"); // Nonaktifkan tanggal setelah hari ini
              }}
            />
          </Form.Item>

          <Form.Item
            label="Nama Account Officer"
            name="namaAccOfficer"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Nama Account Officer wajib diisi",
              },
            ]}
          >
            <Input placeholder="Masukkan nama Account Officer" maxLength={50}/>
          </Form.Item>

          <Form.Item
            label="No. Telp Debitur"
            name="noTelpDeb"
            rules={[
              {
                required: true,
                message: "No. Telp Debitur wajib diisi",
              },
              {
                pattern: /^8[1-9][0-9]{6,10}$/,
                message:
                  "Nomor telepon harus dimulai dengan 8 dan memiliki 8-13 digit setelah +62",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("noTelpPasDeb") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "No.Telp Debitur tidak boleh sama dengan No. Telp Pasangan Debitur"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Masukkan No. Telp Debitur"
              addonBefore="+62"
              maxLength={12}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="No. Telp Pasangan Debitur"
            name="noTelpPasDeb"
            rules={[
              {
                required: true,
                message: "No. Telp Debitur Pasangan Wajib diisi",
              },
              {
                pattern: /^8[1-9][0-9]{6,10}$/,
                message:
                  "Nomor telepon harus dimulai dengan 8 dan memiliki 8-13 digit setelah +62",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("noTelpDeb") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "No.Telp Debitur tidak boleh sama dengan No. Telp Pasangan Debitur"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Masukkan No Telp Debitur"
              addonBefore="+62"
              maxLength={12}
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
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Alamat Sesuai KTP wajib diisi",
              },
            ]}
          >
            <Input placeholder="Masukkan alamat Sesuai KTP" maxLength={200}/>
          </Form.Item>

          <Form.Item
            label="No.KTP"
            name="noKtp"
            rules={[
              {
                required: true,
                message: "No. KTP wajib diisi",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Hanya boleh memasukkan angka",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("noNpwp") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("No.KTP tidak boleh sama dengan No. NPWP")
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Masukkan No KTP"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={16}
            />
          </Form.Item>

          <Form.Item
            label="No.NPWP"
            name="noNpwp"
            rules={[
              {
                required: true,
                message: "No. NPWP wajib diisi",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Hanya boleh memasukkan angka",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("noKtp") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("No. NPWP tidak boleh sama dengan No.KTP")
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Masukkan no NPWP"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={50}
            />
          </Form.Item>

          <Form.Item label="Status Tempat Tinggal" name="statusTempatTinggal" rules={[
              {
                required: true,
                message: "Status Tempat Tinggal wajib diisi",
              },
            ]}>
            <Radio.Group>
              <Radio value="Milik Sendiri">Milik Sendiri</Radio>
              <Radio value="Sewa Kontrak">Sewa/Kontrak</Radio>
            </Radio.Group>
          </Form.Item>

          <Card title="Data Pekerjaan" bordered style={{ width: "100%" }}>
            <Form.Item
              label="Jenis Pekerjaan"
              name="jenisPekerjaan"
              normalize={(value) => value?.toUpperCase() || ""}
            >
              <Input placeholder="Masukkan jenis pekerjaan" maxLength={50}/>
            </Form.Item>

            <Form.Item
              label="Jabatan"
              name="jabatan"
              normalize={(value) => value?.toUpperCase() || ""}
            >
              <Input placeholder="Masukkan Jabatan" maxLength={50}/>
            </Form.Item>

            <Form.Item label="Lama Bekerja" name="lamaBekerja" 
              >
              <Input placeholder="Masukkan lama bekerja" maxLength={50}/>
            </Form.Item>

            <Form.Item label="Status Karyawan" name="statusKaryawan"
            >
              <Radio.Group>
                <Radio value="Karyawan Tetap">Karyawan Tetap</Radio>
                <Radio value="Kontrak">Kontrak</Radio>
                <Radio value="Magang">Magang</Radio>
                <Radio value="Pekerja Lepas">Pekerja Lepas</Radio>
              </Radio.Group>
            </Form.Item>
          </Card>

          <Form.Item label="Keterkaitan dengan BPR" name="keterkaitandgnBpr"
          rules={[
            {
              required: true,
              message: "Keterkaitan dengan BPR wajib dipilih",
            },
          ]}>
            <Radio.Group>
              <Radio value="Terkait">Terkait</Radio>
              <Radio value="Tidak Terkait">Tidak Terkait</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Status Pembiayaan" name="statusPembiayaan" rules={[
            {
              required: true,
              message: "Status Pembiayaan wajib dipilih",
            },
          ]}>
            <Radio.Group>
              <Radio value="Sendiri">Sendiri</Radio>
              <Radio value="Sindikasi">Sindikasi</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        {/* Kolom Kanan */}
        <Col span={12}>
          <Form.Item label="Jenis Kredit" name="jenisKredit" rules={[
            {
              required: true,
              message: "Jenis Kredit wajib dipilih",
            },
          ]}>
            <Radio.Group>
              <Radio value="Konsumtif">Konsumtif</Radio>
              <Radio value="ModalKerja">Modal Kerja</Radio>
              <Radio value="Investasi">Investasi</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Jenis Pengajuan Kredit" name="jenisPengajuanKredit" rules={[
            {
              required: true,
              message: "Jenis Pengajuan Kredit wajib dipilih",
            },
          ]}>
            <Radio.Group>
              <Radio value="Baru">Baru</Radio>
              <Radio value="Repeat Order">Repeat Order</Radio>
              <Radio value="Top Up">Top Up</Radio>
              <Radio value="Restrukturisasi">Restrukturisasi</Radio>
              <Radio value="Back To Back">Back To Back</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Nominal Pengajuan"
            name="nominalPengajuan"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Nominal Pengajuan wajib di isi",
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

          <Form.Item
          label="Jenis Jaminan"
          name="jenisJaminan"
          rules={[{ required: true, message: "Pilih Jenis Jaminan!" }]}
        >
          <Radio.Group
            onChange={handleJenisJaminanChange}
            value={jenisJaminan}
          >
            <Radio value="SHM">SHM</Radio>
            <Radio value="SHGB">SHGB</Radio>
            <Radio value="Lainnya">Lainnya</Radio>
          </Radio.Group>  
        </Form.Item>

        {jenisJaminan === "Lainnya" && (
          <Form.Item
            label="Jenis Jaminan Lainnya"
            name="jenisJaminanLainnya"  // Jangan kirimkan nama ini di form submission
            rules={[{ required: true, message: "Masukkan jenis jaminan lainnya!" }]}
            normalize={(value) => value?.toUpperCase() || ""}
          >
            <Input
              value={lainnya}
              onChange={(e) => setLainnya(e.target.value)}  // Pastikan setLainnya digunakan untuk mengubah nilai input
              placeholder="Masukkan jenis jaminan lainnya"
            />
          </Form.Item>
        )}

          <Form.Item label="Jenis Pekerjaan Debitur" name="jenisPekerjaanDebt" rules={[
              {
                required: true,
                message: "Jenis Pekerjaan Debitur wajib dipilih",
              },
            ]}>
            <Radio.Group>
              <Radio value="Karyawan">Karyawan</Radio>
              <Radio value="Wiraswasta">Wiraswasta</Radio>
              <Radio value="Profesi">Profesi</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Jenis Pekerjaan Pasangan"
            name="jenisPekerjaanPasangan"
            rules={[
              {
                required: true,
                message: "Jenis Pekerjaan Pasangan wajib dipilih",
              },
            ]}>
            <Radio.Group>
              <Radio value="Karyawan">Karyawan</Radio>
              <Radio value="Wiraswasta">Wiraswasta</Radio>
              <Radio value="TidakBekerja">Tidak Bekerja</Radio>
              <Radio value="Profesi">Profesi</Radio>
            </Radio.Group>
          </Form.Item>

          <Checkbox onChange={handleCheckboxDomisilliChange}>
            Apakah alamat domisili sama dengan alamat KTP?
          </Checkbox>

          <Form.Item
            label="Alamat Domisili (Jika tidak sesuai KTP)"
            name="alamatDomisili"
            rules={[{ required: true, message: "Alamat domisili wajib di isi" }]}
            normalize={(value) => value?.toUpperCase() || ""}
          >
            <Input
              placeholder="Masukkan alamat domisili"
              disabled={sameAddress} // Nonaktifkan input jika checkbox dicentang
              maxLength={200}
            />
          </Form.Item>

          <Checkbox onChange={handleCheckboxJaminanChange}>
            Apakah alamat jaminan sama dengan alamat KTP?
          </Checkbox>

          <Form.Item
            label="Alamat Jaminan"
            name="alamatJaminan"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Alamat Jaminan wajib di isi",
              },
            ]}>
            <Input
              placeholder="Masukkan Alamat Jaminan"
              disabled={sameAddressDom}
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            label="Nama Perusahaan/Usaha"
            name="namaPerusahaanUsaha"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Nama Perusahaan/Usaha wajib di isi",
              },
            ]}>
            <Input placeholder="Masukkan Nama Perusahaan/Usaha" maxLength={50}/>
          </Form.Item>

          <Form.Item
            label="Alamat Perusahaan/Usaha"
            name="alamatPerusahaanUsaha"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Alamat Perusahaan/Usaha wajib di isi",
              },
            ]}>
            <Input placeholder="Masukkan Alamat Perusahaan/Usaha" maxLength={200}/>
          </Form.Item>

          <Card title="Data Usaha" bordered style={{ width: "100%" }}>
            <Form.Item
              label="Jenis Usaha"
              name="jenisUsaha"
              normalize={(value) => value?.toUpperCase() || ""}
              >
              <Input placeholder="Masukkan jenis Usaha" />
            </Form.Item>

            <Form.Item label="Bentuk Usaha" name="bentukUsaha" normalize={(value) => value?.toUpperCase() || ""} 
            >
              <Input
                placeholder="Masukkan Bentuk Usaha"
                maxLength={50}
              />
            </Form.Item>

            <Form.Item label="Lama Usaha" name="lamaUsaha" 
              >
              <Input placeholder="Masukkan Lama Usaha" maxLength={50}/>
            </Form.Item>

            <Form.Item
              label="Status Tempat Usaha"
              name="statusTempatUsaha"
              normalize={(value) => value?.toUpperCase() || ""}
              >
              <Input placeholder="Masukkan Status Tempat Usaha" maxLength={50}/>
            </Form.Item>
          </Card>

          <Form.Item
            label="Tujuan Penggunaan Dana"
            name="tujuanPenggunaanDana"
            normalize={(value) => value?.toUpperCase() || ""}
            rules={[
              {
                required: true,
                message: "Tujuan Penggunaan Dana wajib di isi",
              },
            ]}>
            <Input placeholder="Masukkan Tujuan Penggunaan Dana" maxLength={30}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Step1;
