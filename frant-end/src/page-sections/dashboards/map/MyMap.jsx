import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete, Box, Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { H4 } from "@/components/typography";
import { isDark } from "@/utils/constants";
import axios from 'axios';
import { set } from 'nprogress';
const GOOGLE_MAP_KEY = import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;
const users = ["user0", "user1", "user2", "user3", "user4"]; // Example user array
const   ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const   VITE_LEADER = import.meta.env.VITE_LEADER_URL;



const fakeLocations = [
  { id :1 ,amount: 10,lat: 45.5017, lng: -73.5673, feed: 1 }, // Green marker (feed 1) - Montreal City Hall
  { id: 4 ,amount: 10,lat: 45.5088, lng: -73.554, feed: 0 },  // Red marker (feed 0) - Montreal Downtown
  { id: 5 ,amount: 10,lat: 45.4543, lng: -73.6404, feed: -1 }, // Orange marker (feed -1) - Olympic Stadium
  { id: 6 ,amount: 10,lat: 45.5355, lng: -73.6136, feed: 1 },  // Green marker (feed 1) - Parc Jean-Drapeau
  { id: 8,amount: 10,lat: 45.4920, lng: -73.5862, feed: 0 },  // Red marker (feed 0) - McGill University
  { id: 10,amount: 10,lat: 45.5155, lng: -73.5672, feed: -1 }, // Orange marker (feed -1) - Old Montreal (Vieux-Montréal)
];



const customStyleLight = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }] // Soft gray background
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }] // Dark gray text for readability
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }] // White stroke for text contrast
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }] // Hide parcel lines for a clean look
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e1e1e1" }] // Light gray for points of interest
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c8e6c9" }] // Soft green for parks
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }] // White roads for clarity
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#f1f1f1" }] // Slightly off-white for arterial roads
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#fdd835" }] // Yellowish for highways
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e0a800" }] // Slightly darker yellow stroke
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#bdbdbd" }] // Light gray for transit lines
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b3e5fc" }] // Soft blue for water
  }
];

const customStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#212d42" }] // Dark blue-gray for base map
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#a3c6ff" }] // Light blue for text
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1b2838" }] // Dark stroke to enhance readability
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3b4d66" }] // Subtle blue-gray strokes
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }] // Hide land parcel lines for cleaner look
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2a3f5f" }] // Darker blue for points of interest
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#234d20" }] // Dark green for parks
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2c4875" }] // Blue-gray for roads
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#36557a" }] // Slightly lighter arterial roads
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#4a6ea3" }] // Brighter blue for highways
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#243b60" }] // Darker strokes for contrast
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2b3e57" }] // Dark blue for transit lines
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#1b3a68" }] // Deep blue for water
  }
];

const containerStyle = {
  width: '90%',
  height: '650px',
  margin: '10px auto',
  borderRadius: '20px',
  // border :"#003892 solid 3px"
  
};

const center = {
  lat:45.51788172231601, 
  lng:-73.56491603185499,
};

const MyMap = () => {
  const [selectedUser, setSelectedUser] = useState(""); 
  const [users, setUsers] = useState("");
  const [usersInfo, setusersInfo] = useState("");

  const [locations, setLocations] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY, 
  });
  const theme = useTheme();

  const _Addontion = async (name) =>{
    const userID = usersInfo.find(user => user.firstName === name)?.id;
    console.log(usersInfo);
    console.log("name : " + name);
    console.log("userId : "  + userID)
    const requests = locations.map(location => {
      const body = {
        amount: 0,
        type: "INTI",
        lat: location.lat,
        lng: location.lng,
        feed: 100,
        userId: userID
      };
  
      return axios.post(`${VITE_LEADER}/don`, body);
    });
    // console.log(requests);
    try {
      const responses = await Promise.all(requests); // Wait for all requests to complete
      responses.forEach(response => console.log('Request successful:', response.data));
    } catch (error) {
      console.log(err);
    }
  }
  const get_info = async () => {

    try{
      const response = await axios.get(`${ADMIN_ROUTE}/users`);
      setUsers(response.data.data.map((user) => user.firstName));
      setusersInfo(response.data.data);
    
    }catch(err){
      console.log(err);
    }
  }  
  useEffect(() => {
    if (isLoaded) {
      setLocations([...fakeLocations]);
    }
  }, [isLoaded]);

useEffect(() => {get_info()}, []);
  const get_marker_color = (feed) => {
    if (feed === 1) return '/static/loactions/green.png';
    else if (feed === -1) return '/static/loactions/orange.png';
    else if (feed === 0) return '/static/loactions/red.png'; // 
    return '/static/loactions/gray.png'; // 
  }
  // Handle user selection
  const handleUserChange = (event, newValue) => {
    setSelectedUser(newValue);
   
    setLocations([])
  };
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
    console.log('Submitting locations:', locations);
    _Addontion(selectedUser);
    setLocations([]); // Clear the locations after submission
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <H4>{selectedUser ? `Selected User: ${selectedUser}` : 'Select a User'}</H4>
      </Box>

      {/* User Selection Grid */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item sm={6} xs={12}>
          <InputLabel>Select User</InputLabel>
          <Autocomplete
            fullWidth
            value={selectedUser}
            onChange={handleUserChange}
            options={users  || []}
            renderInput={(params) => <TextField {...params} label="Select User" variant="outlined" />}
            isOptionEqualToValue={(option, value) => option === value}
            disableClearable
          />
        </Grid>
      </Grid>

      {/* Google Map Section */}
      <Box sx={{ marginTop: '30px' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{ styles: isDark(theme)  ? customStyle : customStyleLight }} 

          zoom={12.5}
          onClick={handleMapClick} 
        >
        {isLoaded && window.google && locations.map((location, index) => (
  <Marker
    key={index}
    position={{ lat: location.lat, lng: location.lng }}

    label={location.amount}
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

      </Box>

      {/* Button to submit locations */}
      <Box sx={{ margin: 'auto 10px' }}>
        <Button variant="outlined" onClick={ handleSubmit}>Save Locations</Button>
      </Box>
    </Box>
  );
};


export default MyMap;
