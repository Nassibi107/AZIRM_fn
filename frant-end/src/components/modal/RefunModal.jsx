import { TextField,Grid, Button, Box, Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardContent, Alert, MenuItem ,Select, Divider } from "@mui/material";
import { useState } from "react";
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

const RefunModal = ({item, setIsRefunds}) => {
  const reasons = {
    "1": "Reason1",
    "2": "Reason2",
    "3": "Reason3",
    "4": "Reason4",
    "5": "Reason5",
    "6": "Reason6",
    "7": "Reason7",
    "8": "Reason8",
    "9": "Reason9",
  };
  const [refundReason, setRefundReason] = useState("1");
  const [refundReasonVal, setRefundReasonVal] = useState(reasons["1"]);

  async function Refund_Sub(dataRefund) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LV_URL}/m3us/${item.id}/refund`, qs.stringify(dataRefund), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get("accessToken")}`
            }
        });
        console.log("Response data:", response.data);
        handleCancel();

    } catch (error) {
        if (error.response && error.response.status === 422) {

            console.log("A 422 error occurred, but it's being handled gracefully.");
        } else {
            
            console.error('An error occurred:', error);
        }
    }
}
  const handleRefundReasonChange = (event) => {
    const selectedKey = event.target.value;
    setRefundReason(selectedKey);
    setRefundReasonVal(reasons[selectedKey]);
  };

  const handleCancel = () => {
    setIsRefunds(false);
  };

  const handleConfirm = () => {
    console.log(refundReasonVal);
    const dataRef = {"reason" : refundReasonVal};
    Refund_Sub(dataRef);
  };
  
  return (
    <Card >
      <CardContent>
        <h1 style={{ margin: "15px 5px" }}>Refund : </h1>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
              <TextField
                label="Identifier"
                value={item.id}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Created At"
                value={item.created_at}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Consumed Days"
                value={"Not in the API"}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Consumed Credit"
                value={"Not in the API"}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Expiration Date"
                value={item.expired_at}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Original Credit"
                value={"Not in the API"}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                label="Refund Amount"
                value={"Not in the API"}
                fullWidth
              />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="body1">
            <strong>Refund Reason:</strong>
          </Typography>
          <Select
            value={refundReason} // The value is the key (like "1", "2")
            onChange={handleRefundReasonChange}
            fullWidth
            variant="outlined"
          >
            {Object.entries(reasons).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </Box>

        
      </CardContent>
    </Card>
  );
}

export default RefunModal;
