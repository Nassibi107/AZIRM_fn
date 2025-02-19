import React, { useState } from 'react';
import { Box, styled, Modal as MuiModal , Grid , Button, Alert } from "@mui/material";
import { H3 } from "@/components/typography";
import axios from 'axios';
import Cookies from 'js-cookie';

// STYLED COMPONENT
const Wrapper = styled(Box)(({ theme }) => ({
    top: "50%",
    left: "50%",
    padding: 24,
    maxWidth: 400,
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

const ModalGeneratePinReseller = ({ 
    children, 
    open, 
    handleClose , 
    id , 
    fetshUsers,
    ...props 
}) => {
    const [loading , setLoading] = useState(false)
    const [errmsg , setErrmsg] = useState('')

    const GeneratePinReseller = async () => {
        try {
            setLoading(true);
    
            const response = await axios.get(import.meta.env.VITE_LV_URL + '/users/' + id + '/regenerate-pin-code', {} , {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`
                }
            });
    
            if (response.data) {
                handleClose();
                fetshUsers();
            }

        } catch (error) {
            setErrmsg(error.response.data.message);
            console.error("Error generate pin reseller: ", error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <MuiModal open={open} onClose={handleClose}>
        <Wrapper {...props}>
            {children}
            <Box>
                <Grid container>
                    <Grid item sm={12} xs={12} my={2}>
                        <H3 fontSize={18} px={3} py={2} sx = {{ textAlign : "center" }}>Generate Pin</H3>
                        {errmsg && (        
                            <Alert severity="error">{errmsg}</Alert>
                        )}
                    </Grid>
                    <Grid container>
                        <Button fullWidth sx={{my:1}} onClick={GeneratePinReseller} color='success'>
                            {loading ? 'loading...' : 'Generate'}
                        </Button>
                        <Button fullWidth color='secondary' my={1} onClick={handleClose}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    </MuiModal>
  );
};

export default ModalGeneratePinReseller;