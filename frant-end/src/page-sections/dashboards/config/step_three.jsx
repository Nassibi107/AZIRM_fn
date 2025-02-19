
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

import Simple from "./simple.png";
import complexe from "./complex.png";


const StepThree = ({setActiveComp}) => {
    const [activeMode, setActiveMode] = useState(null);

    const handleThemeClick = (theme) => {
        setActiveMode(theme);
    };

    return (
        <Grid container sx={{ backgroundColor: '#292A35', borderRadius: 3, overflow: 'hidden' }} md={9}>
            <Grid item md={12} sm={12} xs={12} mr={5} sx={{ fontSize: 25, padding: 3 }}>
                <p style={{ fontWeight: 300, fontSize: 15, color: 'gray' }}>Step 3/3</p>
                <p style={{ fontWeight: 600 }}>Mode</p>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'gray' }}>Choose your mode now</p>
            </Grid>

            <Grid item md={12} mr={5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, padding: 5 }}>
                <Grid item md={3} xs={6} sx={{ display: 'flex', justifyContent: 'center' ,flexDirection:'column'}}>
                    <div 
                        className={`theme-container ${activeMode === 'Simple' ? 'active' : ''}`} 
                        onClick={() => handleThemeClick('Simple')}
                    >
                        <img src={Simple} alt="" className='ccc' />
                        {activeMode === 'Simple' && <div className='status'></div>}
                    </div>
                    <p style={{fontWeight: 600, color:'#9F9FA4', marginLeft:10 }}>Simple</p>
                </Grid>
                <Grid item md={3} xs={6} sx={{ display: 'flex', justifyContent: 'center' ,flexDirection:'column'}}>
                    <div 
                        className={`theme-container ${activeMode === 'complexe' ? 'active' : ''}`} 
                        onClick={() => handleThemeClick('complexe')}
                    >
                        <img src={complexe} alt="" className='ccc' />
                        {activeMode === 'complexe' && <div className='status'></div>}
                    </div>
                    <p style={{fontWeight: 600, color:'#9F9FA4', marginLeft:10 }}>Complexe</p>
                </Grid>
            </Grid>

            <Grid item md={12} mr={5} sx={{ fontSize: 25, padding: 3, width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={() => setActiveComp(1)}>back</Button>
                <Button variant="contained" onClick={() => setActiveComp(3)}>Finish</Button>
            </Grid>
        </Grid>
    );
};

export default StepThree;