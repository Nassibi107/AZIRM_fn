import React, { useEffect, useState } from 'react';
import { 
    Box, styled, Modal as MuiModal, 
    Grid, Button, Checkbox, 
    Divider, Accordion, AccordionDetails, 
    AccordionSummary, 
    CircularProgress,
    Alert
} from "@mui/material";
import { H6, Paragraph } from "@/components/typography"; 
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from 'axios';

const API_URLS = import.meta.env.VITE_LV_URL;

// STYLED COMPONENT
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
}));

// ModalPermission Component
const ModalPermission = ({ children, open, handleClose, hundleClose, perGlobal, roleName, idRole, ...props }) => {
  const [isLoading, setIsLoading] = useState(true); // Default to true for initial loading
  const [arrSelected, setArrSelected] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [permissions, setPermissions] = useState(perGlobal.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {}));

  // Fetch permissions from API
  useEffect(() => {
    const fetchMyPermissions = async () => {
      try {
        if (!idRole) return;
        setIsLoading(true); // Start loading
        const response = await axios.get(`${API_URLS}/roles/${idRole}/permissions`);
        const permissionsList = response.data.data.map(item => item.name);
        setArrSelected(permissionsList);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchMyPermissions();
  }, [idRole]);

  // Set permissions based on arrSelected (async operation)
  const GetMyPermission = async () => {
    try {
      // Ensure this step also triggers loading
      perGlobal.forEach((name) => {
        setPermissions((prev) => ({
          ...prev,
          [name]: false,
        }));
      });

      arrSelected.forEach((name) => {
        setPermissions((prev) => ({
          ...prev,
          [name]: true,
        }));
      });
    } finally {
      // Finish loading once this function is done
      setIsLoading(false); 
    }
  };

  // Run GetMyPermission once arrSelected is fetched
  useEffect(() => {
    if (arrSelected.length > 0) {
      GetMyPermission();
    }
  }, [arrSelected]);

  const permissionGroups = perGlobal.reduce((acc, permission) => {
    const category = permission.split('_')[0];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {});
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 10500); 

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const ft_getPremtions = async () => {
    try {
      const perArr = Object.keys(permissions).filter(key => permissions[key] === true);
  
      const data = {
        name: roleName,
        permissions: perArr // Send permissions as an array
      };
  
      const response = await axios.put(`${API_URLS}/roles/${idRole}`, data, {
        headers: {
          'Content-Type': 'application/json' // Ensure the correct content type
        }
      });
  
      setAlertMessage("Role updated successfully!");
      setAlertSeverity("success");
      hundleClose();
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Failed to update role.");
      setAlertSeverity("error");
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <MuiModal open={open} onClose={handleClose} sx={{ textAlign: "center", overflowY: "auto", my: 2 }}>
      <Wrapper {...props}>
        <H6 fontSize={24}>Edit Role {roleName}</H6>
        <Paragraph color="text.secondary" sx={{ mb: 1 }}>
          Set Role Permissions
        </Paragraph>
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ my: 2 }}>
            {alertMessage}
          </Alert>
        )}
        {children}
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Divider />
            {Object.keys(permissionGroups).map((category, index) => (
              <Accordion key={index} sx={{ my: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {category.toUpperCase()}
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={1}>
  {permissionGroups[category].map((perm, idx) => (
    <Grid item xs={6} key={idx}>
      <Box display="grid" gridTemplateColumns="auto 1fr" alignItems="center" pb={2}>
        <Checkbox
          name={perm}
          color="primary"
          onChange={handleCheckboxChange}
          checked={permissions[perm]}
        />
        <span>{perm.split('_').slice(1).join(' ').padEnd(50)}</span>
      </Box>
    </Grid>
  ))}
</Grid>
                </AccordionDetails>
              </Accordion>
            ))}
            <Grid container>
              <Button sx={{ mx: 1 }} onClick={ft_getPremtions}>
                Submit
              </Button>
              <Button sx={{ mx: 1 }} color="secondary" onClick={handleClose}>
                Discard
              </Button>
            </Grid>
          </>
        )}
      </Wrapper>
    </MuiModal>
  );
};

export default ModalPermission;
