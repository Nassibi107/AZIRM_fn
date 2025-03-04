import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { H4 } from "@/components/typography";

const GOOGLE_MAP_KEY = import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '90%',
  height: '500px',
  margin: '10px auto',
};

const center = {
  lat: 37.7749, // Default center for the map
  lng: -122.4194,
};

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY, // Your Google Maps API Key
  });

  // Handle click event on map
  const handleMapClick = (event) => {
    // Get the clicked location's latitude and longitude
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setLocations((prevLocations) => {
      // Check if the clicked location already exists in the list
      const isLocationExist = prevLocations.some((loc) => {
        // Use a tolerance to account for small floating point differences
        return (
          Math.abs(loc.lat - clickedLocation.lat) < 0.0001 &&
          Math.abs(loc.lng - clickedLocation.lng) < 0.0001
        );
      });

      if (isLocationExist) {
        // If the location exists, remove it
        return prevLocations.filter(
          (loc) =>
            Math.abs(loc.lat - clickedLocation.lat) >= 0.0001 ||
            Math.abs(loc.lng - clickedLocation.lng) >= 0.0001
        );
      } else {
        // Otherwise, add the new location
        return [...prevLocations, clickedLocation];
      }
    });
  };

  // Handle submission of locations
  const handleSubmit = () => {
    // Here you would send the locations to your backend to save them in the database
    console.log('Submitting locations:', locations);
    setLocations([]); // Clear the locations after submission
  };

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={6} md={6}>
          <H4>Click on the map to add locations</H4>
        </Grid>
        <Grid item sm={6} xs={12}>
                            <InputLabel>take you user</InputLabel>
                            <Select
                              fullWidth
                              label="user"
                              name="user"
                             
                              
                            >
                              <MenuItem value="">----</MenuItem>
                              <MenuItem value="user0">user0</MenuItem>
                              <MenuItem value="user1">user1</MenuItem>
                              <MenuItem value="user2">user2</MenuItem>
                              <MenuItem value="user3">user3</MenuItem>
                        
                            </Select>
            </Grid>
      </Grid>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick} // Register the map click event
        >
          {/* Render markers for all locations */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              icon={{
                url: "https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-Pic.png", // Custom marker image URL
                scaledSize: new window.google.maps.Size(30, 30), // Resize the image if needed
              }}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}

      {/* Button to submit locations */}
    <Box margin={3}>
      <Button variant="outlined"  onClick={handleSubmit}>Save Locations</Button>
      </Box>
    </Box>
  );
};

export default MyMap;
