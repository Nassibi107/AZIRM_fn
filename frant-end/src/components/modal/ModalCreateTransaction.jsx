import React, { useEffect, useState } from 'react';
import { Box, styled, Modal as MuiModal, TextField , Grid , Button , MenuItem, Alert } from "@mui/material";
import { H6 } from "@/components/typography";
import axios from 'axios';
import Cookies from 'js-cookie';

// STYLED COMPONENT
const Wrapper = styled(Box)(({ theme }) => ({
    top: "50%",
    left: "50%",
    padding: 10,
    maxWidth: 500,
    width: "100%",
    borderRadius: 16,
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper
}));

const ModalCreateTransaction = ({ children, open, handleClose , ...props }) => {
    const [from , setFrom] = useState(1)
    const [to , setTo] = useState(1)
    const [amount , setAmount] = useState(0)
    const [oldSold , setFromNewSold] = useState(80.4)
    const [newsold , setToNewSold] = useState(oldSold - amount)
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    const [errmsg , setErrmsg] = useState('')

    const fetshData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_LV_URL + '/users' , {} , {
          headers : {
            "Authorization" : `Bearer ${Cookies.get("accessToken")}`
          }
        })
  
        if ( response.data ) {
          setData(response.data.data)
        }
      } catch ( error ) {
        console.error('error fetsh users : ' , error)
      }
    }

    useEffect(()=>{
      fetshData()
    } , [])

    const createReseller = async () => {
      try {
        setLoading(true)
        const data = new FormData();
        data.append('from_user_id' , from)
        data.append('to_user_id' , to)
        data.append('amount' , amount)

        const response = await axios.post(import.meta.env.VITE_LV_URL + '/transactions' ,  data , {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Authorization" : `Bearer ${Cookies.get("accessToken")}`
          }
        })
  
        if ( response.data ) {
          handleClose()
        }
      } catch (error) {
        setErrmsg(error.response.data.message)
        // console.error("Error create reseller : " , error)
      } finally {
        setLoading(false)
      }
    }
    return (
    <MuiModal open={open} onClose={handleClose}>
        <Wrapper {...props}>
            {children}
            <Box>
                <Grid container>
                    <Grid item sm={12} xs={12} my={2}>
                        <H6 fontSize={14} px={3} py={2} sx = {{ textAlign : "center" }}>Create Transaction</H6>
                        {errmsg && (        
                          <Alert severity="error">{errmsg}</Alert>
                        )}
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                      <TextField fullWidth select label="From" value={from} onChange={(e)=>{setFrom(e.target.value)}}>
                        {data ? data.map(item=>(
                          <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                        )) : (
                          <MenuItem>---</MenuItem>
                        )}
                      </TextField>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth select label="To" value={to} onChange={(e)=>{setTo(e.target.value)}}>
                          {data ? data.map(item=>(
                            <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                          )) : (
                            <MenuItem>---</MenuItem>
                          )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} my={1} >
                        <TextField fullWidth label="Amount :"  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <TextField fullWidth label="From Old Sold :"  value={oldSold} readOnly/>
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <TextField fullWidth label="To New Sold :"  value={oldSold - amount} readOnly/>
                    </Grid>
                    <Grid container>
                        <Button fullWidth sx={{my:1}} onClick={createReseller}>
                          {loading ? 'loading...' : 'Save'}
                        </Button>
                        <Button fullWidth color='secondary' my={1} onClick={handleClose}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    </MuiModal>
  );
};

export default ModalCreateTransaction;
