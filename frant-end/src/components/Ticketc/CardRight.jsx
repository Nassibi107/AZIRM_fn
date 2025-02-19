import React, { useState } from 'react';
import { Badge, Box, Button, Card, CardContent, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function CardRight() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ 
      borderRight: ".17em solid #111827",
     borderRadius: "0"
    , padding: '0px' }}>
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Button variant="text" sx={{ color: "#7e68eb", fontSize:"12px" , fontWeight : "bold" }}  
             onClick={handleClickOpen}>Show More</Button>
          </Grid>
        </Grid>
      </CardContent>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <TextField 
            value={"placeholder"} 
            InputProps={{ readOnly: true }} 
            sx={{cursor : "alias" , marginBottom:"14px"}}
            fullWidth 
          />
          <TextField 
             value={"placeholder"} 
             InputProps={{ readOnly: true }} 
             sx={{cursor : "alias" , marginBottom:"14px"}}
             fullWidth  />
    
          <TextField 
             value={"placeholderss"} 
             InputProps={{ readOnly: true }} 
             sx={{cursor : "alias" , marginBottom:"14px"}}
             fullWidth  />
    
          <TextField 
             value={"placeholder"} 
             InputProps={{ readOnly: true }} 
             sx={{cursor : "alias" , marginBottom:"14px"}}
             fullWidth  />
    
          <TextField 
             value={"placeholder"} 
             InputProps={{ readOnly: true }} 
             sx={{cursor : "alias" , marginBottom:"14px"}}
             fullWidth  />
    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
