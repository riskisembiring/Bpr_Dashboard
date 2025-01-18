// DebiturTable.js
import React, { useState } from 'react';
import { Table, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ExportToExcel from './ExportToExcel'; // Impor komponen ExportToExcel

const DebiturTable = () => {
  const [data, setData] = useState([
    {
      key: '1',
      namaDebitur: 'John Doe',
      aktifitas: 'Pembayaran Cicilan',
      hasil: 'Lunas',
      keterangan: 'Pembayaran cicilan per bulan.',
      foto: 'https://via.placeholder.com/50', // Gantilah dengan URL gambar yang sesuai
      location: 'Jakarta',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleNew = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsModalVisible(true);
    setCurrentRecord(record);
  };

  const handleSave = (values) => {
    if (isEditing && currentRecord) {
      const updatedData = data.map((item) =>
        item.key === currentRecord.key ? { ...currentRecord, ...values } : item
      );
      setData(updatedData);
    } else {
      const newRecord = {
        key: `${data.length + 1}`,
        ...values,
      };
      setData([...data, newRecord]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Nama Debitur',
      dataIndex: 'namaDebitur',
      key: 'namaDebitur',
    },
    {
      title: 'Aktifitas',
      dataIndex: 'aktifitas',
      key: 'aktifitas',
    },
    {
      title: 'Hasil',
      dataIndex: 'hasil',
      key: 'hasil',
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (text) => <img src={text} alt="foto" style={{ width: '50px' }} />,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)} type="primary">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleNew} type="primary" style={{ marginBottom: '20px' }}>
        New
      </Button>
      {/* Gunakan komponen ExportToExcel di sini */}
      <ExportToExcel data={data} />
      <Table columns={columns} dataSource={data} rowKey="key" />
      <Modal
        title={isEditing ? 'Edit Data' : 'New Data'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentRecord || {}}
          onFinish={handleSave}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Nama Debitur"
            name="namaDebitur"
            rules={[{ required: true, message: 'Please input Nama Debitur!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Aktifitas"
            name="aktifitas"
            rules={[{ required: true, message: 'Please input Aktifitas!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hasil"
            name="hasil"
            rules={[{ required: true, message: 'Please input Hasil!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Keterangan"
            name="keterangan"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Foto"
            name="foto"
          >
            <Upload
              action="/upload"
              listType="picture"
              beforeUpload={() => false}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Location></Location>

          {/* <Form.Item wrapperCol={{ span: 16, offset: 6 }}> */}
            <Button type="primary" htmlType="submit" style={{ position: 'absolute'}}>
              {isEditing ? 'Save Changes' : 'Create New'}
            </Button>
          {/* </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default DebiturTable;
