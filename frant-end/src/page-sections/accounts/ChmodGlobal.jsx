import { Button, Card, Divider, Stack, Switch, Box, TextField, Snackbar, SnackbarContent, Slide} from "@mui/material"; // CUSTOM COMPONENTS

import { H6, Small } from "@/components/typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ModeSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';
import { getModeComplex, getModeSimple } from "@/___GlobalState__/Sil/ModeSlice";
import { useState } from "react";


const ChangeMode = () => {


  const Mode = useSelector(ModeSelectors);
  const dispatch = useDispatch();

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleModeSimpleClick = () => {
    dispatch(getModeSimple());
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    setSnackbarMessage('Switched to Simple Mode');
    setSnackbarOpen(true);
  };

  const handleModeComplexClick = () => {
    dispatch(getModeComplex());
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    setSnackbarMessage('Switched to Complex Mode');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return <Card>
      <Box padding={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <H6 fontSize={14}>change the mode </H6>
          {
            Mode  ?
                  <Box><Button onClick={handleModeSimpleClick} variant='outlined'>Mode simple</Button></Box>
                  :
                  <Box><Button onClick={handleModeComplexClick} variant='outlined'>Mode complex</Button></Box>
        }

        </Stack>
      </Box>

      <Divider />
      <Box padding={3}>
      {
          !Mode ?
          <Small  color="text.secondary">
        In Simple Mode, our website offers a streamlined and user-friendly interface designed for ease of use and quick access to essential features. This mode is ideal for users who prefer a minimalistic approach, focusing on core functionalities without the distraction of advanced options. It provides a clean and straightforward navigation experience, allowing users to perform their tasks efficiently with fewer steps and less complexity. Whether you are new to the platform or just need to complete basic tasks quickly,
         Simple Mode is tailored to ensure a smooth and intuitive user experience.
        </Small>
       : <Small color="text.secondary">
        Complex Mode caters to power users and those who require access to the full spectrum of features and advanced functionalities our website has to offer. This mode unlocks additional options and detailed settings, enabling users to customize their experience and take advantage of the platform's full capabilities. It is designed for those who need to perform more intricate tasks, manage extensive data, or utilize specialized tools. While it provides a richer and more comprehensive interface, it may require a deeper understanding of the platform to navigate effectively. Complex Mode is perfect for users who
        seek maximum control and flexibility in their interactions with the website.
            </Small>

        }
     </Box>

     <Slide direction="down" in={snackbarOpen} mountOnEnter unmountOnExit>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#1976d2',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '4px'
            }}
            message={snackbarMessage}
          />
        </Snackbar>
      </Slide>
    </Card>;
};

export default ChangeMode;
