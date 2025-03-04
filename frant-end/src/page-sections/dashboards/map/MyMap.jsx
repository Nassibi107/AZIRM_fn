import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAP_KEY =import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // Set to your desired default location
  lng: -122.4194,
};

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:GOOGLE_MAP_KEY , // Replace with your API key
  });

  const handleMapClick = (event) => {
    setLocations((prevLocations) => [
      ...prevLocations,
      { lat: event.latLng.lat(), lng: event.latLng.lng() },
    ]);
  };

  const handleSubmit = () => {
    // Send locations to backend to store in the database
    fetch('/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locations }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Locations saved:', data);
      })
      .catch((error) => {
        console.error('Error saving locations:', error);
      });
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}

      <button onClick={handleSubmit}>Save Locations</button>
    </div>
  );
};

export default MyMap;
