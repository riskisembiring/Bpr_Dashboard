import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Row, Col, Table, Modal, Radio, Card } from "antd";

const { Title } = Typography;
const { Text } = Typography;

const CetakMAK = () => {
  const [formMarketing] = Form.useForm();
  const [dataList, setDataList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [userRole, setUserRole] = useState(""); // Menyimpan role pengguna (Marketing, Analisis, dll)

  useEffect(() => {
    // Ambil data role dari localStorage atau API
    const role = localStorage.getItem("role"); // Contoh mengambil role dari localStorage
    setUserRole(role || ""); // Mengatur role pengguna, default jika kosong
  }, []);

  const onFinish = (values) => {
    setDataList([...dataList, values]);
    setShowModal(false);
  };

  const handlePreview = (record) => {
    setSelectedData(record);
    setShowPrintModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    {
      title: "Nama Debitur",
      dataIndex: "namaDebitur",
      key: "namaDebitur",
    },
    {
      title: "Nomor MAK",
      dataIndex: "nomorMak",
      key: "nomorMak",
    },
    {
      title: "Tanggal MAK",
      dataIndex: "tanggalMak",
      key: "tanggalMak",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => setShowModal(true)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Preview",
      key: "preview",
      render: (_, record) => (
        <Button type="link" onClick={() => handlePreview(record)}>
          Lihat lengkapnya
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4}>Daftar Data</Title>
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
          >
            Tambah Data
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataList}
          rowKey="nama"
          pagination={false}
        />
      </div>

      <Modal
        title="Form Data Debitur"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        closable={false}
        width={1200}
      >
        <Form
          form={formMarketing}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginBottom: "20px" }}
        >
          <Row gutter={16}>
          <Col span={12}>
          <Form.Item
            label="Nama Debitur"
            name="namaDebitur"
            // rules={[{ required: true, message: "Harap masukkan nama debitur Anda!" }]}
          >
            <Input placeholder="Masukkan Nama Debitur"/>
          </Form.Item>
          <Form.Item
            label="Nomor MAK"
            name="nomorMak"
            // rules={[{ required: true, message: "Harap masukkan no MAK!" }]}
          >
            <Input placeholder="Masukkan nomor MAK" rows={3}/>
          </Form.Item>
          <Form.Item
            label="Tanggal MAK"
            name="tanggalMak"
            // rules={[{ required: true, message: "Harap masukkan tanggal MAK!" }]}
          >
            <Input placeholder="Masukkan tanggal MAK"/>
          </Form.Item>
          <Form.Item
            label="Nama Account Officer"
            name="namaAccOfficer"
            // rules={[{ required: true, message: "Harap masukkan nama Account Officer!" }]}
          >
            <Input placeholder="Masukkan nama Account Officer"/>
          </Form.Item>
          <Form.Item
            label="No.Telp Debitur"
            name="noTelpDeb"
            // rules={[{ required: true, message: "Harap masukkan no Telp Debitur!" }]}
          >
            <Input placeholder="Masukkan no Telp Debitur"/>
          </Form.Item>
          <Form.Item
            label="No.Telp Pasangan Debitur"
            name="noTelpPasDeb"
            // rules={[{ required: true, message: "Harap masukkan no Telp Pasangan Debitur!" }]}
          >
            <Input placeholder="Masukkan no Telp Pasangan Debitur"/>
          </Form.Item>
          <Form.Item
            label="Alamat Sesuai KTP"
            name="alamatSesuaiKtp"
            // rules={[{ required: true, message: "Harap masukkan alamat Sesuai KTP!" }]}
          >
            <Input placeholder="Masukkan alamat Sesuai KTP"/>
          </Form.Item>
          <Form.Item
            label="No.KTP"
            name="noKtp"
            // rules={[{ required: true, message: "Harap masukkan no KTP!" }]}
          >
            <Input placeholder="Masukkan no KTP"/>
          </Form.Item>
          <Form.Item
            label="No.NPWP"
            name="noNpwp"
            // rules={[{ required: true, message: "Harap masukkan no NPW!" }]}
          >
            <Input placeholder="Masukkan no NPW"/>
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
      <Form layout="vertical">
      <Card title="Data Pekerjaan" bordered={true} style={{ width: '100%' }}>
        <Form.Item
          label="Jenis Pekerjaan"
          name="jenisPekerjaan"
          // rules={[{ required: true, message: "Harap masukkan jenis Pekerjaan!" }]}
        >
          <Input placeholder="Masukkan jenis pekerjaan" />
        </Form.Item>

        <Form.Item
          label="Jabatan"
          name="jenisJabatan"
          // rules={[{ required: true, message: "Harap masukkan Jabatan!" }]}
        >
          <Input placeholder="Masukkan Jabatan" />
        </Form.Item>

        <Form.Item
          label="Lama Bekerja"
          name="lamaBekerja"
          // rules={[{ required: true, message: "Harap masukkan lama bekerja!" }]}
        >
          <Input placeholder="Masukkan lama bekerja" />
        </Form.Item>

        <Form.Item
          label="Status Karyawan"
          name="statusKaryawan"
          // rules={[{ required: true, message: "Harap masukkan status karyawan!" }]}
        >
          <Input placeholder="Masukkan status karyawan" />
        </Form.Item>
      </Card>
      </Form>
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
          label="Jenis Pengajuan"
          name="jenisPengajuan"
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
            <Input placeholder="Masukkan nominal pengajuan"/>
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
          <Input placeholder="Masukkan Alamat Domisili"/>
        </Form.Item>
        <Form.Item
          label="Alamat Jaminan"
          name="alamatJaminan"
          // rules={[{ required: true, message: "Harap masukkan Alamat Jaminan!" }]}
        >
          <Input placeholder="Masukkan Alamat Jaminan"/>
        </Form.Item>
        <Form.Item
          label="Nama Perusaahan/Usaha"
          name="namaPerusahaanUsaha"
          // rules={[{ required: true, message: "Harap masukkan Nama Perusaahan/Usaha!" }]}
        >
          <Input placeholder="Masukkan Nama Perusaahan/Usaha"/>
        </Form.Item>
        <Form.Item
          label="Alamat Perusaahan/Usaha"
          name="alamatPerusahaanUsaha"
          // rules={[{ required: true, message: "Harap masukkan Alamat Perusaahan/Usaha!" }]}
        >
          <Input placeholder="Masukkan Alamat Perusaahan/Usaha"/>
        </Form.Item>
        <Form layout="vertical">
        <Card title="Data Usaha" bordered={true} style={{ width: '100%' }}>
      <Form.Item
          label="Jenis Usaha"
          name="jenisUsaha"
          // rules={[{ required: true, message: "Harap masukkan jenis Usaha!" }]}
        >
          <Input placeholder="Masukkan jenis Usaha"/>
        </Form.Item>
        <Form.Item
          label="Bentuk Usaha"
          name="bentukUsaha"
          // rules={[{ required: true, message: "Harap masukkan Bentuk Usaha!" }]}
        >
          <Input placeholder="Masukkan Bentuk Usaha"/>
        </Form.Item>
        <Form.Item
          label="Lama Usaha"
          name="lamaUsaha"
          // rules={[{ required: true, message: "Harap masukkan Lama Usaha!" }]}
        >
          <Input placeholder="Masukkan jenis Lama Usaha"/>
        </Form.Item>
        <Form.Item
          label="Status Tempat Usaha"
          name="statusTempatUsaha"
          // rules={[{ required: true, message: "Harap masukkan Status Tempat Usaha!" }]}
        >
          <Input placeholder="Masukkan jenis Status Tempat Usaha"/>
        </Form.Item>
        </Card>
        </Form>
        <Form.Item
          label="Tujuan Penggunaan Dana"
          name="tujuanPenggunaanDana"
          // rules={[{ required: true, message: "Harap masukkan Tujuan Penggunaan Dana!" }]}
        >
          <Input placeholder="Masukkan Tujuan Penggunaan Dana"/>
        </Form.Item>
        </Col>
        </Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="primary" htmlType="submitMarketing">
              Submit Marketing
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => setShowModal(false)}
            
            >
              Batal
            </Button>
          </Form.Item>
      </Form>
    </Modal>


      {/* Modal Cetak Preview */}
      <Modal
        title="Cetak Preview"
        visible={showPrintModal}
        onCancel={() => setShowPrintModal(false)}
        width={1200}
        footer={[
          <Button key="print" type="primary" onClick={handlePrint}>
            Cetak
          </Button>,
          <Button key="cancel" onClick={() => setShowPrintModal(false)}>
            Tutup
          </Button>,
        ]}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ maxWidth: "200px", marginBottom: "10px" }}
          />
          <Title level={4}>Data Debitur</Title>
        </div>
          <Row>
            <Col span={8}>Nama Debitur:</Col>
            <Col span={16}>{selectedData?.namaDebitur}</Col>
          </Row>
          <Row>
            <Col span={8}>Tanggal MAK:</Col>
            <Col span={16}>{selectedData?.tanggalMak}</Col>
          </Row>
          <Row>
            <Col span={8}>Nama Account Officer:</Col>
            <Col span={16}>{selectedData?.namaAccOfficer}</Col>
          </Row>
          <Row>
            <Col span={8}>No.Telp Debitur:</Col>
            <Col span={16}>{selectedData?.noTelpDeb}</Col>
          </Row>
          <Row>
            <Col span={8}>No.Telp Pasangan Debitur:</Col>
            <Col span={16}>{selectedData?.noTelpPasDeb}</Col>
          </Row>
          <Row>
            <Col span={8}>Alamat Sesuai KTP</Col>
            <Col span={16}>{selectedData?.alamatSesuaiKtp}</Col>
          </Row>
          <Row>
            <Col span={8}>No.KTP</Col>
            <Col span={16}>{selectedData?.noKtp}</Col>
          </Row>
          <Row>
            <Col span={8}>No.NPWP</Col>
            <Col span={16}>{selectedData?.noNpwp}</Col>
          </Row>
          <Row>
            <Col span={8}>Status Tempat Tinggal</Col>
            <Col span={16}>{selectedData?.statusTempatTinggal}</Col>
          </Row>
          <Row>
            <Col span={8}>Data Pekerjaan</Col>
            <Col span={16}>{selectedData?.jenisPekerjaan}</Col>
          </Row>
          <Row>
            <Col span={8}>Jabatan</Col>
            <Col span={16}>{selectedData?.jenisJabatan}</Col>
          </Row>
          <Row>
            <Col span={8}>Lama Bekerja</Col>
            <Col span={16}>{selectedData?.lamaBekerja}</Col>
          </Row>
          <Row>
            <Col span={8}>Status Karyawan</Col>
            <Col span={16}>{selectedData?.statusKaryawan}</Col>
          </Row>
          <Row>
            <Col span={8}>Keterkaitan dengan BPR</Col>
            <Col span={16}>{selectedData?.keterkaitandgnBpr}</Col>
          </Row>
          <Row>
            <Col span={8}>Status Pembiayaan</Col>
            <Col span={16}>{selectedData?.statusPembiayaan}</Col>
          </Row>
          <Row>
            <Col span={8}>Jenis Kredit</Col>
            <Col span={16}>{selectedData?.jenisKredit}</Col>
          </Row>
          <Row>
            <Col span={8}>Nominal Pengajuan</Col>
            <Col span={16}>{selectedData?.nominalPengajuan}</Col>
          </Row>
          <Row>
            <Col span={8}>Jenis Jaminan</Col>
            <Col span={16}>{selectedData?.jenisJaminan}</Col>
          </Row>
          <Row>
            <Col span={8}>Jenis Pekerjaan Debtur</Col>
            <Col span={16}>{selectedData?.jenisPekerjaanDebt}</Col>
          </Row>
          <Row>
            <Col span={8}>Jenis Pekerjaan Pasangan</Col>
            <Col span={16}>{selectedData?.jenisPekerjaanPasangan}</Col>
          </Row>
          <Row>
            <Col span={8}>Alamat Domisili</Col>
            <Col span={16}>{selectedData?.alamatDomisili}</Col>
          </Row>
          <Row>
            <Col span={8}>Alamat Jaminan</Col>
            <Col span={16}>{selectedData?.alamatJaminan}</Col>
          </Row>
          <Row>
            <Col span={8}>Nama Perusaahan/Usaha</Col>
            <Col span={16}>{selectedData?.namaPerusahaanUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Alamat Perusaahan/Usaha</Col>
            <Col span={16}>{selectedData?.alamatPerusahaanUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Jenis Usaha</Col>
            <Col span={16}>{selectedData?.jenisUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Bentuk Usaha</Col>
            <Col span={16}>{selectedData?.bentukUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Lama Usaha</Col>
            <Col span={16}>{selectedData?.lamaUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Status Tempat Usaha</Col>
            <Col span={16}>{selectedData?.statusTempatUsaha}</Col>
          </Row>
          <Row>
            <Col span={8}>Tujuan Penggunaan Dana</Col>
            <Col span={16}>{selectedData?.tujuanPenggunaanDana}</Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default CetakMAK;
