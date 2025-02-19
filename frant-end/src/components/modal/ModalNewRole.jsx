import React, { useEffect, useState } from 'react';
import { 
    Box, styled, Modal as MuiModal, Grid, Button, Checkbox, Divider, Accordion, AccordionDetails, TextField, AccordionSummary, 
    Alert,
    CircularProgress
} from "@mui/material";
import { H6, Paragraph } from "@/components/typography"; 
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from 'axios';

const Wrapper = styled(Box)(({ theme }) => ({
    top: "50%",
    left: "50%",
    padding: 24,
    maxWidth: 680,
    width: "100%",
    borderRadius: 16,
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    maxHeight: "80vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
}));

const API_URLS = import.meta.env.VITE_LV_URL;

const ModalNewRole = ({ children, open, handleClose ,hundleCloseS,perGlobal, ...props }) => {


  const [permissions, setPermissions] = useState(perGlobal?.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {}));

  const [newRoleName, setNewRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null); 
  const [alertSeverity, setAlertSeverity] = useState(null); 
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  useEffect (() =>{if (perGlobal)setIsLoading(false)},[perGlobal]);
  const handleChangeNewRoleName = (e) => {
    setNewRoleName(e.target.value);
  };
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 10500); 

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  const getPremtions = async () => {
    try {
      const perArr = Object.keys(permissions)? Object.keys(permissions).filter(key => permissions[key] === true) : {};
      const data = new FormData();
      data.append('name', newRoleName);
      perArr.forEach(permission => data.append('permissions[]', permission));
      const packageIds = [1]; 
      packageIds.forEach(id => data.append('packages_ids[]', id));
      const response = await axios.post(`${API_URLS}/roles`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      });
      // Show success alert
      setAlertMessage("Role created successfully!");
      setAlertSeverity("success");
      hundleCloseS();
      
    } catch (error) {
      // Show error alert
      if(error.response.data.message)
          setAlertMessage(error.response.data.message || "Failed to create role.");
      setAlertSeverity("error");
    }
  };

  const permissionGroups = perGlobal 
  ? perGlobal.reduce((acc, permission) => {
      const category = permission.split('_')[0]; 
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(permission);
      return acc;
    }, {})
  : {};
  return (
    <MuiModal open={open} onClose={handleClose} sx={{ textAlign: "center", overflowY: "auto", my: 2 }}>
      <Wrapper {...props}>
        {children}
        <H6 fontSize={24}>Add New Role</H6>
        <Paragraph color="text.secondary" sx={{ mb: 1 }}>Set Role Permissions</Paragraph>
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ my: 2 }}>
            {alertMessage}
          </Alert>
        )}
           { (isLoading) ?
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box> : ""
        }
        <Grid container spacing={3} py={2}>
          <Grid item xs={12}>
            <TextField fullWidth value={newRoleName} onChange={handleChangeNewRoleName} label="Role Name" />
          </Grid>
        </Grid>
        <Divider />

        {/* Dynamically generating accordions based on permission categories */}
        {Object.keys(permissionGroups)?.map((category, index) => (
          <Accordion key={index} sx={{ my: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {category.toUpperCase()} {/* Accordion title */}
            </AccordionSummary>
            <AccordionDetails>
  <Box component="ul" pl={2}>
    <Grid container spacing={2}>
      {permissionGroups[category].map((perm, idx) => (
        <Grid item xs={6} key={idx}>
      <Box display="grid" gridTemplateColumns="auto 1fr" alignItems="center" pb={2}>
            <Checkbox
              name={perm}
              color="primary"
              onChange={handleCheckboxChange}
              checked={permissions[perm]}
            />
            <span>{perm.split('_').slice(1).join(' ')}</span> {/* Displaying the permission name */}
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
</AccordionDetails>
          </Accordion>
        ))}

        <Grid container>
          <Button sx={{ mx: 1 }}   onClick={getPremtions} >
            Submit
          </Button>
          <Button sx={{ mx: 1 }}   color="secondary" onClick={handleClose}>
            Discard
          </Button>
        </Grid>
      </Wrapper>
    </MuiModal> 
  );
};

export default ModalNewRole;
