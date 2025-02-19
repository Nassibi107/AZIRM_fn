
import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import {
    Box,
    Card,
    Grid,
    CardContent,

} from '@mui/material';

import MobileStepper from '@mui/material/MobileStepper';
import './config.css';

import StepOne from "./step_one"
import StepTwo from "./step_two"
import StepThree from "./step_three"
import Rules from "./rules"

import Load from "./HorizontalNonLinearStepper";


const Config = () => {
    
    const [ActiveComp,setActiveComp] = useState(0);

    return (

    <div className="container">
        {
            ActiveComp < 3 &&
            <>
                <MobileStepper
                variant="progress"
                steps={4}
                position="static"
                activeStep={ActiveComp}
                sx={{ width: '70%', flexGrow: 1 , background:'transparent' , position:'absolute', left:'15%'}}
                />
            </>
        }
        <Card sx={{height: '100%', width:'100%',borderRadius: 0, backgroundColor:'#2F3249'}}>
            {/* <Load/> */}
            <CardContent sx={{height:'100%',overflow:'auto'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center',mt:'10%'}}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item md={9} sm={12} xs={12} sx={{backgroundColor:'#292A35', fontWeight:'600', padding: 3 ,mb: 2,borderRadius: 3, fontSize:25}} >
                            Welcome! First things first
                        </Grid>
                        { 
                            ActiveComp === 0
                            && 
                            <>
                                <StepOne  setActiveComp={setActiveComp} />
                            </>
                        }
                        { 
                            ActiveComp === 1
                            && 
                            <>
                                <StepTwo setActiveComp={setActiveComp} />
                            </>
                        }
                        { 
                            ActiveComp === 2
                            && 
                            <>
                                <StepThree  setActiveComp={setActiveComp} />
                            </>
                        }
                        { 
                            ActiveComp === 3
                            && 
                            <>
                                <Rules  setActiveComp={setActiveComp} />
                            </>
                        }

                    </Grid>
                </Box>
            </CardContent>
        </Card>
    </div>
    );
}

export default Config;