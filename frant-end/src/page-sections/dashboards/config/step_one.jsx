
import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import {
    Button,
    Box,
    Paper,
    Card,
    Grid,
    styled,
    CardContent,
    TextField,

} from '@mui/material';

import './config.css';
import { BorderClearRounded } from '@mui/icons-material';

import bgt from "./profile.jpg";
import { useSelector } from 'react-redux';
import { CofSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';



const StepOne = ({setActiveComp}) => {

    const [imageSrc, setImageSrc] = useState(null);
    
    const cof = useSelector(CofSelectors);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Grid container justifyContent="center" sx={{backgroundColor:'#292A35',borderRadius: 3, overflow: 'hidden'}} md={9}>
            <Grid item md={4} sm={6} xs={12} sx={{ fontSize: 25, padding: 3 }}>
                <p style={{ fontWeight: 300, fontSize: 15, color: 'gray' }}>Step 1/3</p>
                <p style={{ fontWeight: 600}}>Profile</p>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                        fullWidth
                        required
                        id="outlined-required-1"
                        label="Full-name"
                        defaultValue=""
                        variant='outlined'
                        sx={{ mb: 2 , mt:2}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        fullWidth
                        required
                        id="outlined-required-2"
                        label="Display Name"
                        defaultValue=""
                        variant='outlined'
                        sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        fullWidth
                        required
                        id="outlined-required-3"
                        label="Email"
                        defaultValue=""
                        variant='outlined'
                        sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={7} sm={6} xs={12} sx={{ fontSize: 25, padding: 3 }}>
                <Box sx={{ display: 'flex', width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column' }}>
                    <Box
                        mb={1}
                        sx={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img src={imageSrc || bgt} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <Button variant="outlined" onClick={() => document.getElementById('file-input').click()}>
                        Update
                    </Button>
                </Box>
            </Grid>
            <Grid item md={12} mr={5} sx={{ fontSize: 25, padding: 3, width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant="contained" disabled>Back</Button>
                <Button variant="contained" onClick={() => setActiveComp(1)}>Next</Button>
            </Grid>
        </Grid>
    );
}

export default StepOne;