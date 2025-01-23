import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Form, Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const Location = forwardRef(({ updateLocation }, ref) => {
  const [displayName, setDisplayName] = useState(null);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.lat) {
                setDisplayName(data.lat + ' ' + data.lon);
                updateLocation(data.lat + ' ' + data.lon);
              } else {
                console.error("No results found.");
              }
            })
            .catch((error) => {
              console.error("Error fetching geolocation data:", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Fungsi untuk reset lokasi
  const resetLocation = () => {
    setDisplayName(null);
    updateLocation(null); // Mengirimkan null ke parent jika lokasi di-reset
  };

  // Tambahkan fungsi getLocation
  const getLocation = () => {
    return displayName; // Mengembalikan lokasi saat ini
  };

  // Ekspos fungsi getLocation dan resetLocation ke parent menggunakan ref
  useImperativeHandle(ref, () => ({
    resetLocation,
    getLocation, // Menambahkan getLocation
  }));

  return (
    <Form.Item label="Lokasi" name="location">
      <Button type="primary" onClick={getCurrentLocation}>
        Lihat Koordinat
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
    </Form.Item>
  );
});

export default Location;
