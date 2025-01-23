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
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
            width: "400px",
            height: "50px",
            overflowY: "auto",
            color: "black",
          }}
        />
      </Form.Item>

      {/* Peta Leaflet */}
      {coordinates && (
        <MapContainer
          center={coordinates} // Set center peta dengan koordinat terbaru
          zoom={15}
          style={{ height: "400px", width: "100%" }}
          whenCreated={(map) => map.invalidateSize()} // Untuk merender ulang peta setelah di-load
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
