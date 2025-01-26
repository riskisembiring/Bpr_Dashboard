import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Form, Button, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for the map marker
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Location = forwardRef(({ updateLocation }, ref) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk loading

  function getCurrentLocation() {
    setLoading(true); // Set loading ke true saat mengambil lokasi

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.lat) {
                setLatitude(lat);
                setLongitude(lon);
                setDisplayName(data.lat + ' ' + data.lon);
                updateLocation(data.lat + ' ' + data.lon);
              } else {
                console.error("No results found.");
              }
            })
            .catch((error) => {
              console.error("Error fetching geolocation data:", error);
            })
            .finally(() => setLoading(false)); // Set loading ke false setelah data diambil
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false); // Set loading ke false jika terjadi error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false); // Set loading ke false jika geolocation tidak didukung
    }
  }

  const resetLocation = () => {
    setLatitude(null);
    setLongitude(null);
    setDisplayName(null);
    updateLocation(null);
  };

  useImperativeHandle(ref, () => ({
    resetLocation,
    getLocation: () => `${latitude}, ${longitude}`,
  }));

  return (
    <Form.Item label="Lokasi" name="location">
      <Button
        type="primary"
        onClick={getCurrentLocation}
        style={{ marginBottom: "10px" }}
        disabled={loading} // Nonaktifkan tombol saat loading
      >
        {loading ? (
          <Spin size="small" /> // Menampilkan spinner di dalam tombol
        ) : (
          "Lihat Koordinat"
        )}
      </Button>
      <TextArea
        disabled={true}
        value={displayName}
        style={{
          fontSize: "12px",
          width: "400px",
          height: "50px",
          overflowY: "auto",
          color: "black",
        }}
      />
      
      {latitude && longitude && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          className="leaflet-container"
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} icon={customIcon}></Marker>
        </MapContainer>
      )}
    </Form.Item>
  );
});

export default Location;
