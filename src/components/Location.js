import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Location = forwardRef(({ updateLocation }, ref) => {
  const [coordinates, setCoordinates] = useState(null);

  // Fungsi untuk mendapatkan lokasi pengguna
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const newCoordinates = { lat: latitude, lng: longitude };
          setCoordinates(newCoordinates);
          updateLocation(`${latitude}, ${longitude}`);
          console.log("Koordinat:", newCoordinates);
        },
        (error) => {
          // Handle error
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Izin lokasi ditolak. Harap aktifkan izin lokasi di browser Anda.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Lokasi tidak tersedia. Coba lagi nanti.");
              break;
            case error.TIMEOUT:
              alert("Permintaan lokasi timeout. Harap coba lagi.");
              break;
            default:
              alert("Terjadi kesalahan. Tidak bisa mengakses lokasi.");
          }
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser Anda.");
    }
  }
  

  // Fungsi untuk mereset lokasi
  const resetLocation = () => {
    setCoordinates(null);
    updateLocation(null);
  };

  // Mengekspos fungsi resetLocation ke parent
  useImperativeHandle(ref, () => ({
    resetLocation,
  }));

  return (
    <div>
      {/* Form untuk lokasi */}
      <Form.Item label="Lokasi" name="location">
        <Button type="primary" onClick={getCurrentLocation}>
          Lihat Koordinat
        </Button>
        <TextArea
          disabled
          value={coordinates ? `${coordinates.lat}, ${coordinates.lng}` : ""}
          style={{
            fontSize: "12px",
            width: "100%", // Ganti dengan responsif
            height: "50px",
            overflowY: "auto",
            color: "black",
          }}
        />
      </Form.Item>

      {/* Peta Leaflet */}
      {coordinates && (
        <MapContainer
          center={coordinates}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
          whenCreated={(map) => map.invalidateSize()} // Memastikan render ulang
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coordinates}>
            <Popup>
              Lokasi Anda: {coordinates.lat}, {coordinates.lng}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
});

export default Location;
