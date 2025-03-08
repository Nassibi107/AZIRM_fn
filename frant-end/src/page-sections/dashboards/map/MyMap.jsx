import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { H4 } from "@/components/typography";

const GOOGLE_MAP_KEY = import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;

const fakeLocations = [
  { lat: 45.5017, lng: -73.5673, feed: 1 }, // Green marker (feed 1) - Montreal City Hall
  { lat: 45.5088, lng: -73.554, feed: 0 },  // Red marker (feed 0) - Montreal Downtown
  { lat: 45.4543, lng: -73.6404, feed: -1 }, // Orange marker (feed -1) - Olympic Stadium
  { lat: 45.5355, lng: -73.6136, feed: 1 },  // Green marker (feed 1) - Parc Jean-Drapeau
  { lat: 45.4920, lng: -73.5862, feed: 0 },  // Red marker (feed 0) - McGill University
  { lat: 45.5155, lng: -73.5672, feed: -1 }, // Orange marker (feed -1) - Old Montreal (Vieux-Montréal)
];


const containerStyle = {
  width: '90%',
  height: '500px',
  margin: '10px auto',
  borderRadius: '25px',
  // border :"#003892 solid 3px"
  
};

const center = {
 // 45.51788172231601, -73.56491603185499
  lat:45.51788172231601, 
  lng:-73.56491603185499,
};

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY, // Your Google Maps API Key
  });
 

  useEffect(() => {
    if (isLoaded) {
      setLocations([...fakeLocations]);
    }
  }, [isLoaded]);


  const get_marker_color = (feed) => {
    if (feed === 1) return '/static/loactions/green.png';
    else if (feed === -1) return '/static/loactions/orange.png';
    else if (feed === 0) return '/static/loactions/red.png'; // Default to red for feed 0
    return '/static/loactions/sky.png'; // Default to red for feed 0
  }
  
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
          zoom={13.5}
          onClick={handleMapClick} // Register the map click event
        >
        {isLoaded && window.google && locations.map((location, index) => (
  <Marker
    key={index}
    position={{ lat: location.lat, lng: location.lng }}
    icon={{
      url: get_marker_color(location.feed),
      scaledSize: new window.google.maps.Size(33, 33),
     
    }}
  />
))}
          <H4>Click on the map to add or remove locations</H4>
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
