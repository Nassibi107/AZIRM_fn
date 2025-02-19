import React, { useEffect, useState } from 'react';
import { Box, styled, Modal as MuiModal, TextField , Grid , Button , MenuItem, Alert , Switch} from "@mui/material";
import { H3 , Paragraph } from "@/components/typography";
import axios from 'axios';
import Cookies from 'js-cookie';
import { FlexBetween } from "@/components/flexbox";

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

const ModalEditReseller = ({ 
    children, 
    open, 
    handleClose , 
    id , 
    full_name , 
    email , 
    dns , 
    note , 
    whatsapp , 
    adult , 
    role , 
    fetshUsers,
    ...props 
}) => {
    const [new_full_name , setFullName] = useState(full_name)
    const [new_email , setEmail] = useState(email)
    const [new_password , setPassword] = useState()
    const [new_dns , setDns] = useState(dns)
    const [new_note , setNote] = useState(note)
    const [new_whatsapp , setWhatsapp] = useState(whatsapp)
    const [new_adult , setAdult] = useState(adult)
    const [new_role , setRole] = useState(role)
    const [roles , setRoles] = useState([])
    const [loading , setLoading] = useState(false)
    const [errmsg , setErrmsg] = useState('')

    const fetshRole = async () => {
        try {
            setLoading(true)
            const response = await axios.get(import.meta.env.VITE_LV_URL + '/roles' , {
                headers : {
                    "Authorization" : `Bearer ${Cookies.get("accessToken")}`
                }
            }) 
          
            if ( response.data ) {
                setRoles( response.data.data )
            }
        } catch (error) {
            console.error('error fetshing roles :' , error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(()=> {
        fetshRole()
    } , [])

    const EditReseller = async () => {
        try {
            setLoading(true);
            const data = new FormData();
    
            if (new_full_name) data.append('full_name', new_full_name);
            if (new_email) data.append('email', new_email);
            if (new_password) data.append('password', new_password);
            if (new_dns) data.append('dns', new_dns);
            if (new_note) data.append('note', new_note);
            if (new_whatsapp) data.append('whatsapp', new_whatsapp);
            // if (new_adult !== undefined) data.append('adult', parseInt(new_adult));
            if (new_role) data.append('role', new_role);
    
            const response = await axios.put(import.meta.env.VITE_LV_URL + '/users/' + id, data , {
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
            console.error("Error edit reseller: ", error);
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
                        <H3 fontSize={18} px={3} py={2} sx = {{ textAlign : "center" }}>Edit Reseller {full_name}</H3>
                        {errmsg && (        
                            <Alert severity="error">{errmsg}</Alert>
                        )}
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth label="Full name" value={new_full_name} onChange={(e)=>{setFullName(e.target.value)}}/>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth label="Email" value={new_email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth type='password' label="Password" value={new_password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth label="Dns" value={new_dns} onChange={(e)=>{setDns(e.target.value)}}/>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth label="Whatsapp" value={new_whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
                    </Grid>
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth label="Whatsapp" value={new_whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
                    </Grid>
                    {/* <Grid item sm={12} xs={12} my={1}>
                        <FlexBetween >
                        <Box>
                            <Paragraph fontWeight={500}>Adult</Paragraph>
                        </Box>
                        <Switch 
                            value={new_adult} 
                            onChange={(e) => setAdult(e.target.checked ? 1 : 0)} 
                            checked={new_adult} 
                        />
                        </FlexBetween>             
                    </Grid> */}
                    <Grid item sm={12} xs={12} my={1}>
                        <TextField fullWidth select label="Role" value={new_role} onChange={(e)=>{setRole(e.target.value)}}>
                          {roles ? roles.map(item=>(
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                          )) : (
                            <MenuItem>---</MenuItem>
                          )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} my={1} >
                        <TextField fullWidth label="Note"  value={new_note} onChange={(e)=>{setNote(e.target.value)}}/>
                    </Grid>
                    <Grid container>
                        <Button fullWidth sx={{my:1}} onClick={EditReseller}>
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

export default ModalEditReseller;
