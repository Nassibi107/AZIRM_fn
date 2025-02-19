
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Profile', 'Theme', 'Settings', 'Review'];

import StepOne from "./step_one";
import StepTwo from "./step_two";
import StepThree from "./step_three";
import Rules from "./rules";
import React, { useState } from 'react';

export default function Pacoo({ activeStep, handleBack, handleNext}) {


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                </Button>
        </Box>
    );
}
