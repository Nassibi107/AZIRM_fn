import React from 'react';
import { Box, styled, Modal as MuiModal, TextField , Grid , Button } from "@mui/material";
import { H6 } from "@/components/typography";

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
  backgroundColor: theme.palette.background.paper
}));

const ModalDns = ({ children, open, handleClose, ...props }) => {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Wrapper {...props}>
        {children}
        <Box>
            <Grid container>
                <Grid item sm={12} xs={12}>
                    <H6 fontSize={14} px={3} py={2}>Manage Trials</H6>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField multiline fullWidth rows={10} label=" Text:" sx={{"& .MuiOutlinedInput-root textarea": { padding: 0}}} />
                </Grid>
                <Grid item sm={6} xs={12} sx={{px : 1 , py : 1}}>
                    <Button variant="outlined" fullWidth>Copy Text</Button>
                </Grid>
                <Grid item sm={6} xs={12}  sx={{px : 1 , py : 1}}>
                    <Button variant="contained" fullWidth>Send To Whatsapp</Button>
                </Grid>
            </Grid>
        </Box>
      </Wrapper>
    </MuiModal>
  );
};

export default ModalDns;
