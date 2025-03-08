import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { H4 } from "@/components/typography";

const GOOGLE_MAP_KEY = import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '90%',
  height: '500px',
  margin: '10px auto',
  borderRadius: '25px',
};

const center = {
  lat: 45.51788172231601, // Montreal center latitude
  lng: -73.56491603185499, // Montreal center longitude
};

// Fake data of locations with 'feed' values (1 for green, -1 for orange, 0 for red)
const fakeLocations = [
  { lat: 45.5017, lng: -73.5673, feed: 1 }, // Green marker (feed 1) - Montreal City Hall
  { lat: 45.5088, lng: -73.554, feed: 0 },  // Red marker (feed 0) - Montreal Downtown
  { lat: 45.4543, lng: -73.6404, feed: -1 }, // Orange marker (feed -1) - Olympic Stadium
  { lat: 45.5355, lng: -73.6136, feed: 1 },  // Green marker (feed 1) - Parc Jean-Drapeau
  { lat: 45.4920, lng: -73.5862, feed: 0 },  // Red marker (feed 0) - McGill University
  { lat: 45.5155, lng: -73.5672, feed: -1 }, // Orange marker (feed -1) - Old Montreal (Vieux-Montréal)
];

const MyMap = () => {
  const [locations, setLocations] = useState(fakeLocations);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY, // Your Google Maps API Key
  });

  // Determine marker color based on feed value
  const getMarkerColor = (feed) => {
    if (feed === 1) return 'green';
    if (feed === -1) return 'orange';
    return 'red'; // Default to red for feed 0
  };

  // Handle submission of locations (for your backend or other logic)
  const handleSubmit = () => {
    console.log('Submitting locations:', locations);
    setLocations([]); // Clear the locations after submission
  };

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item sm={6} xs={12}>
          <InputLabel>Select a user</InputLabel>
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
          zoom={12} // Set a good zoom level for Montreal
        >
          {/* Render markers for all locations */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getMarkerColor(location.feed),
                fillOpacity: 1,
                strokeColor: getMarkerColor(location.feed),
                strokeWeight: 2,
                scale: 10,
              }}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
          <H4>Showing fake locations around Montreal</H4>
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}

      {/* Button to submit locations */}
      <Box margin={3}>
        <Button variant="outlined" onClick={handleSubmit}>Save Locations</Button>
      </Box>
    </Box>
  );
};

export default MyMap;
