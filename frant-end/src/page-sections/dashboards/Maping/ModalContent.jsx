// ModalContent.js
import React, { useEffect, useState } from 'react';
import { Autocomplete,Dialog, InputLabel,DialogActions, DialogContent, DialogTitle, Button, Card ,Grid,TextField, Divider } from '@mui/material';
import { FlexBetween } from '@/components/flexbox';
import axios from 'axios';
const   ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const   VITE_LEADER = import.meta.env.VITE_LEADER_URL;
const ModalContent = ({ open, onClose , title , map}) => {
    const [selectedUser, setSelectedUser] = useState(""); 
    const [users, setUsers] = useState("");
    const [usersInfo, setusersInfo] = useState("");
    const handleUserChange = (event, newValue) => {
      setSelectedUser(newValue);
     
      setLocations([])
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
    useEffect(() => {get_info()}, []);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Continuer le processus</DialogTitle>
      <DialogContent>
       <Card sx={{ p: 2 }}>
         <Divider sx={{ my: 3 }} />
       <FlexBetween mb={2}>

       <img src="/static/loactions/blue.png" alt="QR" style={{ width: "50px", height: "50px" }} />
       <h4 style={{ marginTop: "10px"  }}> 130 la rue de la barre </h4>
       </FlexBetween>
        <Divider sx={{ my: 3 }} />
         
        <Grid container spacing={2} alignItems="center" justifyContent="center">
{/*         
        {
          map?.map((item, index) => ( <TextField value={item} /> ))

        } */}
        <Grid item xs={12} md={1} lg={2}> <TextField variant="standard" value={"102"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"302"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"304"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"305"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"306"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"401"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"778"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"112"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"302"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"304"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"305"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"306"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"401"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"778"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"112"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"302"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"304"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"305"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"306"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"401"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"778"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"112"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"302"} /> </Grid>
        <Grid item xs={12} md={1} lg={2}> <TextField  variant="standard" value={"304"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"305"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"306"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"401"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"778"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"112"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>
        <Grid item xs={12} md={3} lg={2}> <TextField  variant="standard" value={"113"} /> </Grid>

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
        <Button onClick={onClose} color="success">
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalContent;


