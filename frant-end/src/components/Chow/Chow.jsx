import React from 'react';
import "./css/FramWork.css";
import "./css/all.tools.css";
import "./css/mater.css";
import { Pages } from '@mui/icons-material';
import { Paragraph } from '@/components/typography';
import { Box } from '@mui/material';

export default function Chow({ name, isChecked, onClick }) {
  return (
    <Box className="backup-control p-20 rad-10">  
      <Box className="servers d-flex align-center txt-c">
        <input type="radio" name="servers" id={`server-${name}`} checked={isChecked} onClick={onClick} />
        <Box className="server mb-1 rad-10 w-full">
          <Pages className="fa-solid fa-server d-block mt-10" />
          <label className="d-block m-2 p-10" htmlFor={`server-${name}`}>
            <Paragraph fontWeight={800}>{name}</Paragraph> 
          </label>
        </Box>
      </Box>    
    </Box>    
  );
}
