import React, { useState } from "react";
import { Form, Input, Button, List, DatePicker } from "antd";

const Step4 = ({ form }) => {
  const [namaRekap, setnamaRekap] = useState([]);
  const [namaRekapInput, setnamaRekapInput] = useState("");

  const [jabatanRekap, setjabatanRekap] = useState([]);
  const [jabatanRekapInput, setjabatanRekapInput] = useState("");

  const [jenisFasilitasRekap, setjenisFasilitasRekap] = useState([]);
  const [jenisFasilitasRekapInput, setjenisFasilitasRekapInput] = useState("");

  const [namaBankRekap, setnamaBankRekap] = useState([]);
  const [namaBankRekapInput, setnamaBankRekapInput] = useState("");

  const [tglMulaiRekap, settglMulaiRekap] = useState([]);
  const [tglMulaiRekapInput, settglMulaiRekapInput] = useState("");

  const [tglTempoRekap, settglTempoRekap] = useState([]);
  const [tglTempoRekapInput, settglTempoRekapInput] = useState("");

  const [tenorRekap, settenorRekap] = useState([]);
  const [tenorRekapInput, settenorRekapInput] = useState("");

  const [plafonRekap, setplafonRekap] = useState([]);
  const [plafonRekapInput, setplafonRekapInput] = useState("");

  const [osRekap, setosRekap] = useState([]);
  const [osRekapInput, setosRekapInput] = useState("");

  const [rateRekap, setrateRekap] = useState([]);
  const [rateRekapInput, setrateRekapInput] = useState("");

  const [angsuranRekap, setangsuranRekap] = useState([]);
  const [angsuranRekapInput, setangsuranRekapInput] = useState("");

  const [collRekap, setcollRekap] = useState([]);
  const [collRekapInput, setcollRekapInput] = useState("");

  const [agunanRekap, setagunanRekap] = useState([]);
  const [agunanRekapInput, setagunanRekapInput] = useState("");

  const [ketRekap, setketRekap] = useState([]);
  const [ketRekapInput, setketRekapInput] = useState("");

  const [catatanSlik, setcatatanSlik] = useState([]);
  const [catatanSlikInput, setcatatanSlikInput] = useState("");


  const handleAddnamaRekap = () => {
    if (namaRekapInput.trim()) {
      const newnamaRekap = [...namaRekap, namaRekapInput];
      setnamaRekap(newnamaRekap);

      form.setFieldsValue({
        namaRekap: newnamaRekap,
      });
      setnamaRekapInput("");
    }
  };

  const handleRemovenamaRekap = (index) => {
    const newnamaRekap = namaRekap.filter((_, i) => i !== index);
    setnamaRekap(newnamaRekap);

    form.setFieldsValue({
      namaRekap: newnamaRekap,
    });
  };

  const handlenamaRekapChange = (e) => {
    setnamaRekapInput(e.target.value);
  };

  const handleAddjabatanRekap = () => {
    if (jabatanRekapInput.trim()) {
      const newjabatanRekap = [...jabatanRekap, jabatanRekapInput];
      setjabatanRekap(newjabatanRekap);

      form.setFieldsValue({
        jabatanRekap: newjabatanRekap,
      });

      setjabatanRekapInput("");
    }
  };

  const handleRemovejabatanRekap = (index) => {
    const newjabatanRekap = jabatanRekap.filter((_, i) => i !== index);
    setjabatanRekap(newjabatanRekap);

    form.setFieldsValue({
      jabatanRekap: newjabatanRekap,
    });
  };

  const handlejabatanRekapChange = (e) => {
    setjabatanRekapInput(e.target.value);
  };

  const handleAddjenisFasilitasRekap = () => {
    if (jenisFasilitasRekapInput.trim()) {
      const newjenisFasilitasRekap = [
        ...jenisFasilitasRekap,
        jenisFasilitasRekapInput,
      ];
      setjenisFasilitasRekap(newjenisFasilitasRekap);

      form.setFieldsValue({
        jenisFasilitasRekap: newjenisFasilitasRekap,
      });
      setjenisFasilitasRekapInput("");
    }
  };

  const handleRemovejenisFasilitasRekap = (index) => {
    const newjenisFasilitasRekap = jenisFasilitasRekap.filter(
      (_, i) => i !== index
    );
    setjenisFasilitasRekap(newjenisFasilitasRekap);

    form.setFieldsValue({
      jenisFasilitasRekap: newjenisFasilitasRekap,
    });
  };

  const handlejenisFasilitasRekapChange = (e) => {
    setjenisFasilitasRekapInput(e.target.value);
  };

  const handleAddnamaBankRekap = () => {
    if (namaBankRekapInput.trim()) {
      const newnamaBankRekap = [...namaBankRekap, namaBankRekapInput];
      setnamaBankRekap(newnamaBankRekap);

      form.setFieldsValue({
        namaBankRekap: newnamaBankRekap,
      });
      setnamaBankRekapInput("");
    }
  };

  const handleRemovenamaBankRekap = (index) => {
    const newnamaBankRekap = namaBankRekap.filter((_, i) => i !== index);
    setnamaBankRekap(newnamaBankRekap);

    form.setFieldsValue({
      namaBankRekap: newnamaBankRekap,
    });
  };

  const handlenamaBankRekapChange = (e) => {
    setnamaBankRekapInput(e.target.value);
  };

  const handleAddtglMulaiRekap = () => {
    if (tglMulaiRekapInput && typeof tglMulaiRekapInput === "object") {
      const formattedDate = tglMulaiRekapInput.format("DD-MM-YYYY"); // Pastikan formatnya sesuai
      if (formattedDate.trim()) {
        const newtglMulaiRekap = [...tglMulaiRekap, formattedDate];
        settglMulaiRekap(newtglMulaiRekap);

        form.setFieldsValue({
          tglMulaiRekap: newtglMulaiRekap,
        });
        settglMulaiRekapInput(null); // Reset ke null untuk `DatePicker`
      }
    }
  };

  const handleRemovetglMulaiRekap = (index) => {
    const newtglMulaiRekap = tglMulaiRekap.filter((_, i) => i !== index);
    settglMulaiRekap(newtglMulaiRekap);

    form.setFieldsValue({
      tglMulaiRekap: newtglMulaiRekap,
    });
  };

  const handletglMulaiRekapChange = (date, dateString) => {
    settglMulaiRekapInput(date); // Simpan objek `moment` ke state
  };

  const handleAddtglTempoRekap = () => {
    if (tglTempoRekapInput && typeof tglTempoRekapInput === "object") {
      const formattedDate = tglTempoRekapInput.format("DD-MM-YYYY"); // Pastikan formatnya sesuai
      if (formattedDate.trim()) {
        const newtglTempoRekap = [...tglTempoRekap, formattedDate];
        settglTempoRekap(newtglTempoRekap);

        form.setFieldsValue({
          tglTempoRekap: newtglTempoRekap,
        });
        settglTempoRekapInput(null); // Reset ke null untuk `DatePicker`
      }
    }
  };

  const handleRemovetglTempoRekap = (index) => {
    const newtglTempoRekap = tglTempoRekap.filter((_, i) => i !== index);
    settglTempoRekap(newtglTempoRekap);

    form.setFieldsValue({
      tglTempoRekap: newtglTempoRekap,
    });
  };

  const handletglTempoRekapChange = (date, dateString) => {
    settglTempoRekapInput(date); // Simpan objek `moment` ke state
  };

  const handleAddtenorRekap = () => {
    if (tenorRekapInput.trim()) {
      const newtenorRekap = [...tenorRekap, tenorRekapInput];
      settenorRekap(newtenorRekap);

      form.setFieldsValue({
        tenorRekap: newtenorRekap,
      });
      settenorRekapInput("");
    }
  };

  const handleRemovetenorRekap = (index) => {
    const newtenorRekap = tenorRekap.filter((_, i) => i !== index);
    settenorRekap(newtenorRekap);

    form.setFieldsValue({
      tenorRekap: newtenorRekap,
    });
  };

  const handletenorRekapChange = (e) => {
    settenorRekapInput(e.target.value);
  };

  const handleAddplafonRekap = () => {
    if (plafonRekapInput.trim()) {
      const newplafonRekap = [...plafonRekap, plafonRekapInput];
      setplafonRekap(newplafonRekap);

      form.setFieldsValue({
        plafonRekap: newplafonRekap,
      });
      setplafonRekapInput("");
    }
  };

  const handleRemoveplafonRekap = (index) => {
    const newplafonRekap = plafonRekap.filter((_, i) => i !== index);
    setplafonRekap(newplafonRekap);

    form.setFieldsValue({
      plafonRekap: newplafonRekap,
    });
  };

  const handleplafonRekapChange = (e) => {
    setplafonRekapInput(e.target.value);
  };

  const handleAddosRekap = () => {
    if (osRekapInput.trim()) {
      const newosRekap = [...osRekap, osRekapInput];
      setosRekap(newosRekap);

      form.setFieldsValue({
        osRekap: newosRekap,
      });
      setosRekapInput("");
    }
  };

  const handleRemoveosRekap = (index) => {
    const newosRekap = osRekap.filter((_, i) => i !== index);
    setosRekap(newosRekap);

    form.setFieldsValue({
      osRekap: newosRekap,
    });
  };

  const handleosRekapChange = (e) => {
    setosRekapInput(e.target.value);
  };

  const handleAddrateRekap = () => {
    if (rateRekapInput.trim()) {
      const newrateRekap = [...rateRekap, rateRekapInput];
      setrateRekap(newrateRekap);

      form.setFieldsValue({
        rateRekap: newrateRekap,
      });
      setrateRekapInput("");
    }
  };

  const handleRemoverateRekap = (index) => {
    const newrateRekap = rateRekap.filter((_, i) => i !== index);
    setrateRekap(newrateRekap);

    form.setFieldsValue({
      rateRekap: newrateRekap,
    });
  };

  const handlerateRekapChange = (e) => {
    setrateRekapInput(e.target.value);
  };

  const handleAddangsuranRekap = () => {
    if (angsuranRekapInput.trim()) {
      const newangsuranRekap = [...angsuranRekap, angsuranRekapInput];
      setangsuranRekap(newangsuranRekap);

      form.setFieldsValue({
        angsuranRekap: newangsuranRekap,
      });
      setangsuranRekapInput("");
    }
  };

  const handleRemoveangsuranRekap = (index) => {
    const newangsuranRekap = angsuranRekap.filter((_, i) => i !== index);
    setangsuranRekap(newangsuranRekap);

    form.setFieldsValue({
      angsuranRekap: newangsuranRekap,
    });
  };

  const handleangsuranRekapChange = (e) => {
    setangsuranRekapInput(e.target.value);
  };

  const handleAddcollRekap = () => {
    if (collRekapInput.trim()) {
      const newcollRekap = [...collRekap, collRekapInput];
      setcollRekap(newcollRekap);

      form.setFieldsValue({
        collRekap: newcollRekap,
      });
      setcollRekapInput("");
    }
  };

  const handleRemovecollRekap = (index) => {
    const newcollRekap = collRekap.filter((_, i) => i !== index);
    setcollRekap(newcollRekap);

    form.setFieldsValue({
      collRekap: newcollRekap,
    });
  };

  const handlecollRekapChange = (e) => {
    setcollRekapInput(e.target.value);
  };

  const handleAddagunanRekap = () => {
    if (agunanRekapInput.trim()) {
      const newagunanRekap = [...agunanRekap, agunanRekapInput];
      setagunanRekap(newagunanRekap);

      form.setFieldsValue({
        agunanRekap: newagunanRekap,
      });
      setagunanRekapInput("");
    }
  };

  const handleRemoveagunanRekap = (index) => {
    const newagunanRekap = agunanRekap.filter((_, i) => i !== index);
    setagunanRekap(newagunanRekap);

    form.setFieldsValue({
      agunanRekap: newagunanRekap,
    });
  };

  const handleagunanRekapChange = (e) => {
    setagunanRekapInput(e.target.value);
  };

  const handleAddketRekap = () => {
    if (ketRekapInput.trim()) {
      const newketRekap = [...ketRekap, ketRekapInput];
      setketRekap(newketRekap);

      form.setFieldsValue({
        ketRekap: newketRekap,
      });
      setketRekapInput("");
    }
  };

  const handleRemoveketRekap = (index) => {
    const newketRekap = ketRekap.filter((_, i) => i !== index);
    setketRekap(newketRekap);

    form.setFieldsValue({
      ketRekap: newketRekap,
    });
  };

  const handleketRekapChange = (e) => {
    setketRekapInput(e.target.value);
  };

  const handleAddcatatanSlik = () => {
    if (catatanSlikInput.trim()) {
      const newcatatanSlik = [...catatanSlik, catatanSlikInput];
      setcatatanSlik(newcatatanSlik);

      form.setFieldsValue({
        catatanSlik: newcatatanSlik,
      });
      setcatatanSlikInput("");
    }
  };

  const handleRemovecatatanSlik = (index) => {
    const newcatatanSlik = catatanSlik.filter((_, i) => i !== index);
    setcatatanSlik(newcatatanSlik);

    form.setFieldsValue({
      catatanSlik: newcatatanSlik,
    });
  };

  const handlecatatanSlikChange = (e) => {
    setcatatanSlikInput(e.target.value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        namaRekap: [],
        jabatanRekap: [],
      }}
    >
      <h2>Aspek Keuangan & Sumber Pengembalian Kredit</h2>
      <h3>1. Rekapitulasi SLIK</h3>
      {/* Input Tujuan Penggunaan */}
      <Form.Item label="Nama">
        <Input
          value={namaRekapInput}
          onChange={handlenamaRekapChange}
          placeholder="Masukkan Nama"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddnamaRekap}
        style={{ marginBottom: "16px" }}
        disabled={namaRekap.length >= 3}
      >
        Tambah Nama
      </Button>

      {/* Daftar Tujuan Pengguna */}
      <List
        header="Daftar Nama (Max 3)"
        bordered
        dataSource={namaRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovenamaRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
        style={{ marginBottom: "24px" }}
      />
      {/* Input Profil Debitur & Hasil Cek Lingkungan */}
      <Form.Item label="Jabatan">
        <Input
          value={jabatanRekapInput}
          onChange={handlejabatanRekapChange}
          placeholder="Masukkan Jabatan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddjabatanRekap}
        style={{ marginBottom: "16px" }}
        disabled={jabatanRekap.length >= 3}
      >
        Tambah Profil Debitur
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Jabatan (Max 3)"
        bordered
        dataSource={jabatanRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovejabatanRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Jenis Fasilitas">
        <Input
          value={jenisFasilitasRekapInput}
          onChange={handlejenisFasilitasRekapChange}
          placeholder="Masukkan Jenis Fasilitas"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddjenisFasilitasRekap}
        style={{ marginBottom: "16px" }}
        disabled={jenisFasilitasRekap.length >= 3}
      >
        Tambah Jenis Fasilitas
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Jabatan (Max 3)"
        bordered
        dataSource={jenisFasilitasRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovejenisFasilitasRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Nama Bank / LJK">
        <Input
          value={namaBankRekapInput}
          onChange={handlenamaBankRekapChange}
          placeholder="Masukkan Nama Bank / LJK"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddnamaBankRekap}
        style={{ marginBottom: "16px" }}
        disabled={namaBankRekap.length >= 3}
      >
        Tambah Nama Bank / LJK
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Nama Bank / LJK (Max 3)"
        bordered
        dataSource={namaBankRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovenamaBankRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Tgl. Mulai">
        <DatePicker
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          value={tglMulaiRekapInput}
          onChange={handletglMulaiRekapChange}
          placeholder="Masukkan Tgl. Mulai"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddtglMulaiRekap}
        style={{ marginBottom: "16px" }}
        disabled={tglMulaiRekap.length >= 3}
      >
        Tambah Tgl. Mulai
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Tgl. Mulai (Max 3)"
        bordered
        dataSource={tglMulaiRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovetglMulaiRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Tgl. Jt. Tempo">
        <DatePicker
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          value={tglTempoRekapInput}
          onChange={handletglTempoRekapChange}
          placeholder="Masukkan Tgl. Jt. Tempo"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddtglTempoRekap}
        style={{ marginBottom: "16px" }}
        disabled={tglTempoRekap.length >= 3}
      >
        Tambah Tgl. Jt. Tempo
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Tgl. Jt. Tempo (Max 3)"
        bordered
        dataSource={tglTempoRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovetglTempoRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Tenor">
        <Input
          value={tenorRekapInput}
          onChange={handletenorRekapChange}
          placeholder="Masukkan Tenor"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddtenorRekap}
        style={{ marginBottom: "16px" }}
        disabled={tenorRekap.length >= 3}
      >
        Tambah Tenor
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Tenor (Max 3)"
        bordered
        dataSource={tenorRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovetenorRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Plafon">
        <Input
          value={plafonRekapInput}
          onChange={handleplafonRekapChange}
          placeholder="Masukkan Tenor"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddplafonRekap}
        style={{ marginBottom: "16px" }}
        disabled={plafonRekap.length >= 3}
      >
        Tambah Plafon
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Plafon (Max 3)"
        bordered
        dataSource={plafonRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveplafonRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="O/S">
        <Input
          value={osRekapInput}
          onChange={handleosRekapChange}
          placeholder="Masukkan O/S"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddosRekap}
        style={{ marginBottom: "16px" }}
        disabled={osRekap.length >= 3}
      >
        Tambah O/S
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar O/S (Max 3)"
        bordered
        dataSource={osRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveosRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
       <Form.Item label="Rate">
        <Input
          value={rateRekapInput}
          onChange={handlerateRekapChange}
          placeholder="Masukkan Rate"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddrateRekap}
        style={{ marginBottom: "16px" }}
        disabled={rateRekap.length >= 3}
      >
        Tambah Rate
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Rate (Max 3)"
        bordered
        dataSource={rateRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoverateRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Angsuran">
        <Input
          value={angsuranRekapInput}
          onChange={handleangsuranRekapChange}
          placeholder="Masukkan Rate"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddangsuranRekap}
        style={{ marginBottom: "16px" }}
        disabled={angsuranRekap.length >= 3}
      >
        Tambah Angsuran
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Angsuran (Max 3)"
        bordered
        dataSource={angsuranRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveangsuranRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Coll">
        <Input
          value={collRekapInput}
          onChange={handlecollRekapChange}
          placeholder="Masukkan Coll"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddcollRekap}
        style={{ marginBottom: "16px" }}
        disabled={collRekap.length >= 3}
      >
        Tambah Coll
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Coll (Max 3)"
        bordered
        dataSource={collRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovecollRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
            <Form.Item label="Agunan">
        <Input
          value={agunanRekapInput}
          onChange={handleagunanRekapChange}
          placeholder="Masukkan Agunan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddagunanRekap}
        style={{ marginBottom: "16px" }}
        disabled={agunanRekap.length >= 3}
      >
        Tambah Agunan
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Agunan (Max 3)"
        bordered
        dataSource={agunanRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveagunanRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <Form.Item label="Keterangan">
        <Input
          value={ketRekapInput}
          onChange={handleketRekapChange}
          placeholder="Masukkan Keterangan"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddketRekap}
        style={{ marginBottom: "16px" }}
        disabled={ketRekap.length >= 3}
      >
        Tambah Keterangan
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Keterangan (Max 3)"
        bordered
        dataSource={ketRekap}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveketRekap(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
    <Form.Item
        label="Total"
        name="totalRekap"
        // rules={[{ required: true, message: "Harap masukkan Total!" }]}
    >
        <Input placeholder="Masukkan Total"/>
    </Form.Item>
    <Form.Item label="Catatan Hasil SLIK">
        <Input
          value={catatanSlikInput}
          onChange={handlecatatanSlikChange}
          placeholder="Masukkan Catatan Hasil SLIK"
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={handleAddcatatanSlik}
        style={{ marginBottom: "16px" }}
        disabled={catatanSlik.length >= 3}
      >
        Tambah Catatan Hasil SLIK
      </Button>

      {/* Daftar Profil Debitur */}
      <List
        header="Daftar Catatan Hasil SLIK (Max 3)"
        bordered
        dataSource={catatanSlik}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemovecatatanSlik(index)}
              >
                Hapus
              </Button>,
            ]}
          >
            {index + 1}. {item}
          </List.Item>
        )}
      />
      <br></br>

      {/* Field Tersembunyi untuk Menyimpan Nilai */}
      <Form.Item name="namaRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="jabatanRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="jenisFasilitasRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="namaBankRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="tglMulaiRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="tglTempoRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="tenorRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="plafonRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="osRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="rateRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="angsuranRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="collRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="agunanRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="ketRekap" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="catatanSlik" hidden>
        <Input type="hidden" />
      </Form.Item>
    </Form>
  );
};

export default Step4;
