import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const ToastCostume = ({ open, onClose, message, backgroundColor = '#4caf50', autoHideDuration = 1500 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarContent
        style={{
          backgroundColor: backgroundColor,
          color: '#fff',
          fontWeight: 'bold',
        }}
        message={message}
      />
    </Snackbar>
  );
};

export default ToastCostume;
