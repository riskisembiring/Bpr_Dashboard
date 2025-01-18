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
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.display_name) {
                setDisplayName(data.display_name);
                updateLocation(data.display_name);
                console.log("Location Name:", data.display_name);
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

  // Ekspos fungsi resetLocation ke parent menggunakan ref
  useImperativeHandle(ref, () => ({
    resetLocation,
  }));

  return (
    <Form.Item label="Lokasi" name="location">
      <Button type="primary" onClick={getCurrentLocation}>
        Lihat Lokasi
      </Button>
      <TextArea
        disabled={true}
        value={displayName}
        style={{
          width: "400px",
          height: "100px",
          overflowY: "auto",
          color: "black",
        }}
      />
    </Form.Item>
  );
});

export default Location;
