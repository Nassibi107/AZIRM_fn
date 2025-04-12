// ModalContent.js
import React, { useEffect, useState } from 'react';
import { Autocomplete,Dialog, InputLabel,DialogActions, DialogContent, DialogTitle, Button, Card ,Grid,TextField, Divider, Alert } from '@mui/material';
import { FlexBetween } from '@/components/flexbox';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
const   ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const   VITE_LEADER = import.meta.env.VITE_LEADER_URL;
const ModalContent = ({ open, onClose , title , map ,port}) => {
    const [selectedUser, setSelectedUser] = useState(""); 
    const [users, setUsers] = useState("");
    const [usersInfo, setusersInfo] = useState("");
    const [locations, setLocations] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
    const [items, setItems] = useState([]); 
    const handleUserChange = (event, newValue) => {
      setSelectedUser(newValue);
   
  
    };
    const get_info = async () => {
  
      try{
        const response = await axios.get(`${ADMIN_ROUTE}/users`);
        setUsers(response.data.data.map((user) => `${user.firstName} ${user.lastName}`));
        setusersInfo(response.data.data);
        
      }catch(err){
        console.log(err);
      }
    }  
  
    const _Addontion = async (name) => {
      setIsLoading(true);
      console.log(usersInfo);
      console.log(name);
      const letname = name.split(" ")[1];
      const fstname = name.split(" ")[0];
      const userID = usersInfo.find(user => user.lastName === letname && user.firstName == fstname)?.id;
    console.log(userID);
      // Create a single array of details from locations
      const details = locations.map((location) => ({
        amount: 0,
        type: "",  // Static value
        feed: 100,  // Static value
        num_p: location,  // Dynamically get 'description' from the location
        description: "",  // Static value
      }));
      const body = {
        amount: 0,
        type: "INTI",
        lat: location.lat,
        lng: location.lng,
        feed: 100,
        userId: userID,
        details: details,
      };
  
      setAlertMessage(`mapping User  ${selectedUser} successfully !`);
      setAlertSeverity("success");
      setIsLoading(false);
      try {
      console.log(body);
      setIsLoading(false);
      const responses = await axios.post(`${VITE_LEADER}/don`, body);
      console.log(responses.data) // Wait for all requests to complete
  
    } catch (error) {
      console.log(error);
      setAlertMessage("Failed to map user.");
      setAlertSeverity("error");
      setIsLoading(false);
    }
    
    };
    
  
    
    const getPorts = () => {
      const adjustedPorts = port.map(p => p - 1);
      const ids = map
      .filter((_, index) => adjustedPorts.includes(index))
      .map(item => item.Text);
      setLocations(ids);
    
    }
    useEffect(() => {
      getPorts();
    }, [port, map]);

    useEffect(() => {get_info()}, []);
    const onSave = () => {
      console.log("Selected User:", selectedUser);
      console.log("Locations:", locations);
      _Addontion(selectedUser);
     
    }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Continuer le processus</DialogTitle>
      <DialogContent>
       <Card sx={{ p: 2 }}>
         <Divider sx={{ my: 3 }} />
         
                               {alertMessage && (
                                 <Alert severity={alertSeverity} sx={{ my: 2 }}>
                                   {alertMessage}
                                 </Alert>
                               )}
       <FlexBetween mb={2}>

       <img src="/static/loactions/blue.png" alt="QR" style={{ width: "50px", height: "50px" }} />
       <h4 style={{ marginTop: "10px"  }}> 130 la rue de la barre </h4>
       </FlexBetween>
        <Divider sx={{ my: 3 }} />
         
        <Grid container spacing={2} alignItems="center" justifyContent="center">
        
        {
          locations?.map((item, index) => ( <TextField value={item}  /> ))
        }
    
       </Grid>
 
       <Divider sx={{ my: 3 }} />
       <Grid container justifyContent="center" spacing={2}>
                <Grid item sm={6} xs={12}>
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
       </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary"><LoadingButton loading={isLoading} type="submit">Save</LoadingButton></Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalContent;


