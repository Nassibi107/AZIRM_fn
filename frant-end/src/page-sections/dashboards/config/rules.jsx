
import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import {
    Button,
    Box,
    Paper,
    Card,
    Grid,
    Checkbox,
    styled,
    CardContent,
    TextField,

} from '@mui/material';

import './config.css';
import { useNavigate } from 'react-router-dom';


const Rules = ({setActiveComp}) => {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
    <Grid container sx={{ backgroundColor: '#292A35', borderRadius: 3, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }} md={9}>
        <Grid item md={12} sm={12} xs={12} sx={{ fontSize: 25, padding: 3 }}>
            <p style={{ fontWeight: 600 }}>Rules</p>
        </Grid>

        <Grid item md={10} xs={11} sx={{flexWrap: 'wrap', gap: 3, padding: 5, background: '#2F3249' ,borderRadius:2, maxHeight:'300px', overflow:'auto'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, qui numquam culpa reprehenderit expedita laudantium pariatur placeat? Eaque ea beatae doloremque dolor nam explicabo doloribus, eveniet aspernatur pariatur repellat possimus?
        </Grid>

        <Grid item md={10} xs={10} sx={{ fontSize: 25, padding: 3, width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item md={6} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={checked} onChange={handleCheckboxChange} sx={{ marginRight: 2 }} />
            <p style={{ fontWeight: 600, fontSize: 15, color: 'gray', marginRight: 2 }}>Accept policies</p>
            </Grid>
            
            <Button md={6} xs={12} variant="contained" sx={{ marginLeft: 2 }} disabled={!checked} onClick={() => navigate('/')}>Accept</Button>
            
      </Grid>

    </Grid>
    );
};

export default Rules;
