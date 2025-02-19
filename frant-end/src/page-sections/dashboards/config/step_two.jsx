
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

import light from "./light.png";
import dark from "./dark.png";
import { useSelector } from 'react-redux';
import { CofSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';
import { useDispatch } from 'react-redux';
import { getSetupSimpleMode } from '@/___GlobalState__/Sil/CofSlice';


const StepTwo = ({setActiveComp}) => {
    const [activeTheme, setActiveTheme] = useState(null);
    const cof = useSelector(CofSelectors);
    const dispach = useDispatch()
    console.log("s" + "  " +  cof);
    dispach(getSetupSimpleMode());
    const handleThemeClick = (theme) => {
        setActiveTheme(theme);
    };

    return (
        <Grid container sx={{ backgroundColor: '#292A35', borderRadius: 3, overflow: 'hidden' }} md={9}>
            <Grid item md={12} sm={12} xs={12} mr={5} sx={{ fontSize: 25, padding: 3 }}>
                <p style={{ fontWeight: 300, fontSize: 15, color: 'gray' }}>Step 2/3</p>
                <p style={{ fontWeight: 600 }}>Theme</p>
                <p style={{ fontWeight: 600, fontSize: 15, color: 'gray' }}>Customize your UI theme</p>
            </Grid>

            <Grid item md={12} mr={5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, padding: 5 }}>
                <Grid item md={3} xs={6} sx={{ display: 'flex', justifyContent: 'center' ,flexDirection:'column'}}>
                    <div 
                        className={`theme-container ${activeTheme === 'light' ? 'active' : ''}`} 
                        onClick={() => handleThemeClick('light')}
                    >
                        <img src={light} alt="" className='ccc' />
                        {activeTheme === 'light' && <div className='status'></div>}
                    </div>
                    <p style={{fontWeight: 600, color:'#9F9FA4', marginLeft:10 }}>Light</p>
                </Grid>
                <Grid item md={3} xs={6} sx={{ display: 'flex', justifyContent: 'center' ,flexDirection:'column'}}>
                    <div 
                        className={`theme-container ${activeTheme === 'dark' ? 'active' : ''}`} 
                        onClick={() => handleThemeClick('dark')}
                    >
                        <img src={dark} alt="" className='ccc' />
                        {activeTheme === 'dark' && <div className='status'></div>}
                    </div>
                    <p style={{fontWeight: 600, color:'#9F9FA4', marginLeft:10 }}>Drak</p>
                </Grid>
            </Grid>

            <Grid item md={12} mr={5} sx={{ fontSize: 25, padding: 3, width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={() => setActiveComp(0)}>back</Button>
                <Button variant="contained" onClick={() => setActiveComp(2)}>Next</Button>
            </Grid>
        </Grid>
    );
};

export default StepTwo;